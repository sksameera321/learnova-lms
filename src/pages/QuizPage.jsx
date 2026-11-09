import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  Check, 
  BookOpen
} from 'lucide-react';
import { COURSES } from '../data/coursesData';
import { useLearning } from '../context/LearningContext';
import { useToast } from '../context/ToastContext';
import { CertificateModal } from '../components/common/CertificateModal';

export function QuizPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { recordQuizScore, getQuizScore } = useLearning();
  const { addToast } = useToast();

  const course = COURSES.find(c => c.id === courseId);
  const quiz = course?.quiz;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  if (!course || !quiz) {
    return (
      <div className="section" style={{ textAlign: 'center', padding: '6rem 1rem' }}>
        <h2>Assessment Not Found</h2>
        <Link to="/courses" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
          Back to Library
        </Link>
      </div>
    );
  }

  const questions = quiz.questions;
  const currentQ = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const handleSelectOption = (optionIndex) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optionIndex
    }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correctCount++;
      }
    });
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const passed = percentage >= quiz.passingScore;
    return { correctCount, percentage, passed };
  };

  const handleSubmitQuiz = () => {
    const answeredCount = Object.keys(selectedAnswers).length;
    if (answeredCount < totalQuestions) {
      addToast(`Please answer all questions before submitting (${answeredCount}/${totalQuestions} answered).`, 'warning');
      return;
    }

    const { percentage, passed } = calculateScore();
    setSubmitted(true);
    recordQuizScore(course.id, percentage, passed);

    if (passed) {
      addToast(`Exam Passed with ${percentage}%! Credential unlocked! (+150 XP)`, 'success');
    } else {
      addToast(`Exam score: ${percentage}%. Review the feedback and retake.`, 'warning');
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setCurrentQuestionIndex(0);
  };

  const result = submitted ? calculateScore() : null;

  return (
    <div className="section animate-fade-in" style={{ paddingTop: '4rem', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '820px' }}>
        
        {/* Breadcrumb Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <Link to={`/courses/${course.id}`} style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '0.6rem' }}>
            <ChevronLeft size={16} /> Back to {course.title}
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-brand">CERTIFICATION ASSESSMENT</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Passing Grade: {quiz.passingScore}%</span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 600, marginTop: '0.5rem' }}>
            {quiz.title}
          </h1>
        </div>

        {!submitted ? (
          /* ACTIVE ASSESSMENT */
          <div className="card" style={{ padding: '2.5rem 2rem' }}>
            
            {/* Progress Bar & Question Tracker */}
            <div style={{ marginBottom: '2.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>
                <span style={{ color: 'var(--accent-bronze)' }}>
                  Question {currentQuestionIndex + 1} of {totalQuestions}
                </span>
                <span style={{ color: 'var(--text-muted)' }}>
                  {Object.keys(selectedAnswers).length} of {totalQuestions} answered
                </span>
              </div>
              <div className="progress-bar-bg" style={{ height: '6px' }}>
                <div
                  className="progress-bar-fill"
                  style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Text */}
            <h2 style={{ fontSize: '1.35rem', fontWeight: 600, lineHeight: 1.45, marginBottom: '2rem', color: 'var(--text-primary)' }}>
              {currentQ.question}
            </h2>

            {/* Options List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '2.5rem' }}>
              {currentQ.options.map((option, optIdx) => {
                const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '16px 20px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: isSelected ? 'rgba(197, 160, 89, 0.12)' : 'var(--bg-secondary)',
                      border: isSelected ? '1px solid var(--accent-bronze)' : '1px solid var(--border-subtle)',
                      color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.925rem',
                      lineHeight: 1.5,
                      transition: 'all var(--trans-fast)'
                    }}
                  >
                    <div style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      border: isSelected ? '2px solid var(--accent-bronze)' : '2px solid var(--border-medium)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {isSelected && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-bronze)' }} />}
                    </div>
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Step Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                className="btn btn-secondary"
                style={{ opacity: currentQuestionIndex === 0 ? 0.4 : 1, cursor: currentQuestionIndex === 0 ? 'not-allowed' : 'pointer' }}
              >
                <ChevronLeft size={16} /> Previous
              </button>

              {isLastQuestion ? (
                <button
                  onClick={handleSubmitQuiz}
                  className="btn btn-primary btn-lg"
                >
                  <Check size={16} /> Submit Assessment
                </button>
              ) : (
                <button
                  onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                  className="btn btn-primary"
                >
                  Next Question <ChevronRight size={16} />
                </button>
              )}
            </div>

          </div>
        ) : (
          /* COMPLETION SUMMARY */
          <div className="animate-fade-in">
            
            <div className="card" style={{
              textAlign: 'center',
              padding: '3rem 2rem',
              marginBottom: '2.5rem',
              borderColor: result.passed ? 'var(--accent-emerald)' : 'var(--accent-rose)'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: result.passed ? 'rgba(47, 168, 122, 0.15)' : 'rgba(217, 83, 79, 0.15)',
                border: `1.5px solid ${result.passed ? 'var(--accent-emerald)' : 'var(--accent-rose)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
                color: result.passed ? 'var(--accent-emerald)' : 'var(--accent-rose)'
              }}>
                {result.passed ? <Award size={32} /> : <XCircle size={32} />}
              </div>

              <h2 style={{ fontSize: '2.2rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                {result.passed ? 'Mastery Verified' : 'Needs Review'}
              </h2>

              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '3.2rem',
                fontWeight: 600,
                color: result.passed ? 'var(--accent-emerald)' : 'var(--accent-rose)',
                marginBottom: '0.75rem'
              }}>
                {result.percentage}%
              </div>

              <p style={{ color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto 1.75rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
                {result.passed
                  ? `Commendable performance! You answered ${result.correctCount} of ${totalQuestions} questions correctly, fulfilling the ${quiz.passingScore}% mastery threshold.`
                  : `You answered ${result.correctCount} of ${totalQuestions} questions correctly. A minimum score of ${quiz.passingScore}% is required to unlock your credential.`
                }
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
                {result.passed && (
                  <button
                    onClick={() => setShowCertificate(true)}
                    className="btn btn-primary btn-lg"
                  >
                    <Award size={16} /> View Official Diploma
                  </button>
                )}
                <button onClick={handleRetake} className="btn btn-secondary btn-lg">
                  <RotateCcw size={15} /> Retake Assessment
                </button>
                <Link to="/dashboard" className="btn btn-outline btn-lg">
                  Return to Dashboard
                </Link>
              </div>
            </div>

            {/* Answer Breakdown */}
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '1.5rem' }}>
                Pedagogical Assessment Breakdown
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {questions.map((q, idx) => {
                  const studentAnswer = selectedAnswers[idx];
                  const isCorrect = studentAnswer === q.correctAnswer;
                  return (
                    <div
                      key={q.id}
                      className="card"
                      style={{
                        padding: '1.75rem',
                        borderLeft: `3px solid ${isCorrect ? 'var(--accent-emerald)' : 'var(--accent-rose)'}`
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                        <span className={`badge ${isCorrect ? 'badge-beginner' : 'badge-advanced'}`}>
                          {isCorrect ? 'Correct' : 'Incorrect'}
                        </span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Question {idx + 1}</span>
                      </div>

                      <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                        {q.question}
                      </h4>

                      <div style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Your Response: </span>
                        <strong style={{ color: isCorrect ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>
                          {q.options[studentAnswer]}
                        </strong>
                      </div>

                      {!isCorrect && (
                        <div style={{ fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                          <span style={{ color: 'var(--text-muted)' }}>Correct Answer: </span>
                          <strong style={{ color: 'var(--accent-emerald)' }}>
                            {q.options[q.correctAnswer]}
                          </strong>
                        </div>
                      )}

                      <div style={{
                        marginTop: '0.85rem',
                        padding: '12px 16px',
                        backgroundColor: 'var(--bg-secondary)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.85rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.6
                      }}>
                        <strong style={{ color: 'var(--accent-bronze)' }}>Architectural Note: </strong>
                        {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

      </div>

      {showCertificate && (
        <CertificateModal
          course={course}
          onClose={() => setShowCertificate(false)}
        />
      )}

    </div>
  );
}
