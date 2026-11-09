import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { COURSES } from '../data/coursesData';
import confetti from 'canvas-confetti';

const LearningContext = createContext();

const STORAGE_KEY = 'learnova_learning_state_v1';

const INITIAL_STATE = {
  enrolled: ['gen-ai-agents', 'react19-fullstack'],
  completedLessons: {
    'gen-ai-agents': ['lesson-1-1'],
    'react19-fullstack': ['lesson-r-1-1']
  },
  lastAccessed: {
    'gen-ai-agents': 'lesson-1-2',
    'react19-fullstack': 'lesson-r-1-2'
  },
  notes: {
    'gen-ai-agents_lesson-1-1': 'The ReAct cycle consists of: Thought (internal model reflection) -> Action (formatted JSON tool dispatch) -> Observation (tool return parsed back into context).\nKey advantage: Enables dynamic multi-hop inquiry without hallucinating API states.'
  },
  quizScores: {
    'gen-ai-agents': { score: 100, passed: true, completedAt: '2026-11-08' }
  },
  certificates: []
};

export function LearningProvider({ children }) {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse learning state from localStorage', e);
    }
    return INITIAL_STATE;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save learning state', e);
    }
  }, [state]);

  const enroll = useCallback((courseId) => {
    setState(prev => {
      if (prev.enrolled.includes(courseId)) return prev;
      const course = COURSES.find(c => c.id === courseId);
      const firstLessonId = course?.modules?.[0]?.lessons?.[0]?.id || '';
      return {
        ...prev,
        enrolled: [...prev.enrolled, courseId],
        lastAccessed: {
          ...prev.lastAccessed,
          [courseId]: firstLessonId
        }
      };
    });
  }, []);

  const unenroll = useCallback((courseId) => {
    setState(prev => ({
      ...prev,
      enrolled: prev.enrolled.filter(id => id !== courseId)
    }));
  }, []);

  const isEnrolled = useCallback((courseId) => {
    return state.enrolled.includes(courseId);
  }, [state.enrolled]);

  const toggleLessonCompletion = useCallback((courseId, lessonId) => {
    setState(prev => {
      const currentCompleted = prev.completedLessons[courseId] || [];
      const alreadyCompleted = currentCompleted.includes(lessonId);
      const updated = alreadyCompleted
        ? currentCompleted.filter(id => id !== lessonId)
        : [...currentCompleted, lessonId];

      // Check if this action completes the course
      const course = COURSES.find(c => c.id === courseId);
      const totalLessons = course ? course.modules.flatMap(m => m.lessons).length : 0;
      const isNowFinished = totalLessons > 0 && updated.length >= totalLessons;

      let certificates = prev.certificates || [];
      if (isNowFinished && !certificates.includes(courseId)) {
        certificates = [...certificates, courseId];
        try {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore if canvas-confetti fails
        }
      }

      return {
        ...prev,
        completedLessons: {
          ...prev.completedLessons,
          [courseId]: updated
        },
        certificates
      };
    });
  }, []);

  const isLessonCompleted = useCallback((courseId, lessonId) => {
    const list = state.completedLessons[courseId] || [];
    return list.includes(lessonId);
  }, [state.completedLessons]);

  const setLastLesson = useCallback((courseId, lessonId) => {
    setState(prev => ({
      ...prev,
      lastAccessed: {
        ...prev.lastAccessed,
        [courseId]: lessonId
      }
    }));
  }, []);

  const getLastLesson = useCallback((courseId) => {
    if (state.lastAccessed[courseId]) return state.lastAccessed[courseId];
    const course = COURSES.find(c => c.id === courseId);
    return course?.modules?.[0]?.lessons?.[0]?.id || null;
  }, [state.lastAccessed]);

  const saveNote = useCallback((courseId, lessonId, noteText) => {
    const key = `${courseId}_${lessonId}`;
    setState(prev => ({
      ...prev,
      notes: {
        ...prev.notes,
        [key]: noteText
      }
    }));
  }, []);

  const getNote = useCallback((courseId, lessonId) => {
    const key = `${courseId}_${lessonId}`;
    return state.notes[key] || '';
  }, [state.notes]);

  const recordQuizScore = useCallback((courseId, score, passed) => {
    setState(prev => {
      const updatedQuizScores = {
        ...prev.quizScores,
        [courseId]: {
          score,
          passed,
          completedAt: new Date().toISOString().split('T')[0]
        }
      };

      let certificates = prev.certificates || [];
      if (passed && !certificates.includes(courseId)) {
        certificates = [...certificates, courseId];
      }

      return {
        ...prev,
        quizScores: updatedQuizScores,
        certificates
      };
    });

    if (passed) {
      try {
        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.55 }
        });
      } catch {
        // canvas-confetti fallback
      }
    }
  }, []);

  const getQuizScore = useCallback((courseId) => {
    return state.quizScores[courseId] || null;
  }, [state.quizScores]);

  const getCourseProgress = useCallback((courseId) => {
    const course = COURSES.find(c => c.id === courseId);
    if (!course) return { completedCount: 0, totalCount: 0, percentage: 0, isCompleted: false };
    const allLessons = course.modules.flatMap(m => m.lessons);
    const totalCount = allLessons.length;
    const completedList = state.completedLessons[courseId] || [];
    const completedCount = completedList.length;
    const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    const isCompleted = completedCount >= totalCount && totalCount > 0;
    return { completedCount, totalCount, percentage, isCompleted };
  }, [state.completedLessons]);

  const getOverallTelemetry = useCallback(() => {
    const totalEnrolled = state.enrolled.length;
    let completedCoursesCount = 0;
    let totalLessonsCompleted = 0;

    state.enrolled.forEach(cId => {
      const { isCompleted, completedCount } = getCourseProgress(cId);
      if (isCompleted) completedCoursesCount++;
      totalLessonsCompleted += completedCount;
    });

    const quizValues = Object.values(state.quizScores);
    const averageQuizScore = quizValues.length > 0
      ? Math.round(quizValues.reduce((acc, q) => acc + q.score, 0) / quizValues.length)
      : 0;

    const earnedCertificates = state.certificates || [];

    return {
      totalEnrolled,
      completedCoursesCount,
      totalLessonsCompleted,
      averageQuizScore,
      earnedCertificates: earnedCertificates.length
    };
  }, [state.enrolled, state.certificates, state.quizScores, getCourseProgress]);

  return (
    <LearningContext.Provider value={{
      enrolled: state.enrolled,
      completedLessons: state.completedLessons,
      certificates: state.certificates,
      enroll,
      unenroll,
      isEnrolled,
      toggleLessonCompletion,
      isLessonCompleted,
      setLastLesson,
      getLastLesson,
      saveNote,
      getNote,
      recordQuizScore,
      getQuizScore,
      getCourseProgress,
      getOverallTelemetry
    }}>
      {children}
    </LearningContext.Provider>
  );
}

export function useLearning() {
  return useContext(LearningContext);
}
