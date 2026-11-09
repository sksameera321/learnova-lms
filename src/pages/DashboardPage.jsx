import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Flame, 
  Zap, 
  BookOpen, 
  CheckCircle2, 
  Award, 
  Play, 
  Clock, 
  ArrowRight, 
  TrendingUp, 
  Target,
  Printer
} from 'lucide-react';
import { COURSES } from '../data/coursesData';
import { useAuth } from '../context/AuthContext';
import { useLearning } from '../context/LearningContext';
import { CertificateModal } from '../components/common/CertificateModal';

export function DashboardPage() {
  const { user } = useAuth();
  const { 
    enrolled, 
    getCourseProgress, 
    getLastLesson, 
    getOverallTelemetry, 
    certificates,
    getQuizScore
  } = useLearning();

  const [selectedCertCourse, setSelectedCertCourse] = useState(null);

  const telemetry = getOverallTelemetry();
  const enrolledCoursesList = COURSES.filter(c => enrolled.includes(c.id));

  // Determine Primary "Continue Learning" course
  const activeCourse = enrolledCoursesList.find(c => {
    const { isCompleted } = getCourseProgress(c.id);
    return !isCompleted;
  }) || enrolledCoursesList[0];

  const activeProgress = activeCourse ? getCourseProgress(activeCourse.id) : null;
  const activeNextLessonId = activeCourse ? (getLastLesson(activeCourse.id) || activeCourse.modules[0]?.lessons[0]?.id) : null;
  const activeLessonObject = activeCourse ? activeCourse.modules.flatMap(m => m.lessons).find(l => l.id === activeNextLessonId) : null;

  return (
    <div className="section animate-fade-in" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
      <div className="container">
        
        {/* WELCOME BANNER & STUDENT CREDENTIALS */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '2rem',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem',
          marginBottom: '3rem'
        }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
              alt={user?.name || 'Student'}
              style={{
                width: '68px',
                height: '68px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid var(--accent-bronze)'
              }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '3px' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 600 }}>
                  Welcome back, {user?.name || 'Sameera'}.
                </h1>
                <span className="badge badge-brand">
                  {user?.level || 'Master Scholar'}
                </span>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                {user?.institution || 'SVECW Bhimavaram'} • {user?.role || 'Systems Scholar'}
              </p>
            </div>
          </div>

          {/* Quick Metrics Badges */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 16px',
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)'
            }}>
              <Flame size={20} style={{ color: 'var(--accent-bronze)' }} fill="#c5a059" />
              <div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {user?.streak || 14} Days
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Daily Streak</div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 16px',
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)'
            }}>
              <Zap size={20} style={{ color: 'var(--accent-bronze)' }} />
              <div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {user?.xp || 3450} XP
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Skill Points</div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 16px',
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)'
            }}>
              <Award size={20} style={{ color: 'var(--accent-emerald)' }} />
              <div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {telemetry.earnedCertificates} Earned
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Credentials</div>
              </div>
            </div>
          </div>

        </div>

        {/* PRIMARY "CONTINUE LEARNING" HERO CARD */}
        {activeCourse && (
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-accent)',
            borderRadius: 'var(--radius-lg)',
            padding: '2.5rem',
            marginBottom: '3.5rem',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
              <span className="badge badge-brand">
                CONTINUE MASTERCLASS
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {activeProgress.completedCount} of {activeProgress.totalCount} lessons completed
              </span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) auto',
              gap: '2rem',
              alignItems: 'center'
            }} className="continue-grid">
              <div>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                  {activeCourse.title}
                </h2>
                <p style={{ fontSize: '0.925rem', color: 'var(--accent-bronze)', fontWeight: 600, marginBottom: '1.5rem' }}>
                  Next Lesson: {activeLessonObject?.title || 'Next Module'}
                </p>

                <div className="progress-bar-bg" style={{ height: '6px', maxWidth: '480px' }}>
                  <div className="progress-bar-fill" style={{ width: `${activeProgress.percentage}%` }} />
                </div>
              </div>

              <Link
                to={`/learn/${activeCourse.id}/${activeNextLessonId}`}
                className="btn btn-primary btn-lg"
              >
                <Play size={16} fill="#0b0b0e" />
                <span>Resume Lesson</span>
              </Link>
            </div>
          </div>
        )}

        {/* LEARNING TELEMETRY ANALYTICS */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          marginBottom: '4rem'
        }}>
          <div className="card" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Enrolled Curricula
              </span>
              <BookOpen size={17} style={{ color: 'var(--accent-bronze)' }} />
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              {telemetry.totalEnrolled}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Active engineering masterclasses
            </div>
          </div>

          <div className="card" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Completed Lessons
              </span>
              <CheckCircle2 size={17} style={{ color: 'var(--accent-emerald)' }} />
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 600, color: 'var(--accent-emerald)' }}>
              {telemetry.totalLessonsCompleted}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Milestones mastered & verified
            </div>
          </div>

          <div className="card" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Assessment Average
              </span>
              <TrendingUp size={17} style={{ color: 'var(--accent-bronze)' }} />
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 600, color: 'var(--accent-bronze)' }}>
              {telemetry.averageQuizScore > 0 ? `${telemetry.averageQuizScore}%` : 'N/A'}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Across certification assessments
            </div>
          </div>

          <div className="card" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Weekly Target
              </span>
              <Target size={17} style={{ color: 'var(--accent-amber)' }} />
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 600, color: 'var(--accent-amber)' }}>
              6.5 / 8 hrs
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              81% of weekly learning goal
            </div>
          </div>
        </div>

        {/* ENROLLED COURSES SECTION */}
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 600 }}>Enrolled Masterclasses</h2>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Track your active completion status and syllabus milestones
              </div>
            </div>
            <Link to="/courses" className="btn btn-secondary btn-sm">
              Explore More <ArrowRight size={14} />
            </Link>
          </div>

          {enrolledCoursesList.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '2rem'
            }}>
              {enrolledCoursesList.map(course => {
                const progress = getCourseProgress(course.id);
                const nextId = getLastLesson(course.id) || course.modules[0]?.lessons[0]?.id;
                const quizScore = getQuizScore(course.id);

                return (
                  <div
                    key={course.id}
                    className="card"
                    style={{ display: 'flex', flexDirection: 'column', padding: '1.75rem' }}
                  >
                    <div style={{ display: 'flex', gap: '14px', marginBottom: '1.25rem' }}>
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        style={{ width: '84px', height: '84px', borderRadius: 'var(--radius-md)', objectFit: 'cover', flexShrink: 0 }}
                      />
                      <div style={{ overflow: 'hidden' }}>
                        <span className="badge badge-brand" style={{ fontSize: '0.65rem', marginBottom: '4px' }}>
                          {course.category}
                        </span>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 600, lineHeight: 1.3, color: 'var(--text-primary)' }}>
                          {course.title}
                        </h3>
                      </div>
                    </div>

                    <div style={{ marginBottom: '1.25rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
                        <span style={{ color: progress.isCompleted ? 'var(--accent-emerald)' : 'var(--accent-bronze)' }}>
                          {progress.percentage}% Complete
                        </span>
                        <span style={{ color: 'var(--text-muted)' }}>
                          {progress.completedCount}/{progress.totalCount} Lessons
                        </span>
                      </div>
                      <div className="progress-bar-bg" style={{ height: '5px' }}>
                        <div
                          className="progress-bar-fill"
                          style={{
                            width: `${progress.percentage}%`,
                            background: progress.isCompleted ? 'var(--accent-emerald)' : 'var(--grad-bronze)'
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ marginTop: 'auto', display: 'flex', gap: '8px' }}>
                      <Link
                        to={`/learn/${course.id}/${nextId}`}
                        className="btn btn-primary btn-sm"
                        style={{ flex: 1 }}
                      >
                        <Play size={14} fill="#0b0b0e" />
                        <span>Classroom</span>
                      </Link>

                      <Link
                        to={`/quiz/${course.id}`}
                        className="btn btn-secondary btn-sm"
                        style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Award size={14} style={{ color: quizScore?.passed ? 'var(--accent-emerald)' : 'var(--accent-bronze)' }} />
                        <span>{quizScore?.passed ? `Exam (${quizScore.score}%)` : 'Exam'}</span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px dashed var(--border-medium)',
              borderRadius: 'var(--radius-lg)',
              padding: '3.5rem 2rem',
              textAlign: 'center'
            }}>
              <BookOpen size={40} style={{ color: 'var(--text-muted)', marginBottom: '0.75rem' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                No active masterclasses enrolled
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
                Browse our library to begin learning from industry masters.
              </p>
              <Link to="/courses" className="btn btn-primary">
                Explore Library
              </Link>
            </div>
          )}
        </div>

        {/* VERIFIABLE CREDENTIALS SHOWCASE */}
        <div>
          <div style={{ marginBottom: '1.75rem' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 600 }}>Verifiable Diplomas</h2>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Official certifications of engineering mastery unlocked through course completion and assessments
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem'
          }}>
            {COURSES.slice(0, 2).map((c) => {
              const quizScore = getQuizScore(c.id);
              const isUnlocked = certificates.includes(c.id) || (quizScore && quizScore.passed);

              return (
                <div
                  key={c.id}
                  className="card"
                  style={{
                    padding: '2rem',
                    border: isUnlocked ? '1px solid var(--border-accent)' : '1px solid var(--border-subtle)',
                    background: isUnlocked ? 'radial-gradient(circle at 100% 0%, rgba(197, 160, 89, 0.08) 0%, var(--bg-card) 60%)' : 'var(--bg-card)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '8px',
                      background: isUnlocked ? 'var(--grad-bronze)' : 'var(--bg-tertiary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isUnlocked ? '#0b0b0e' : 'var(--text-muted)'
                    }}>
                      <Award size={22} />
                    </div>
                    <span className={`badge ${isUnlocked ? 'badge-beginner' : 'badge-brand'}`}>
                      {isUnlocked ? 'Verified Credential' : 'In Progress'}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                    {c.title}
                  </h3>

                  <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                    Instructor: {c.instructor.name} • {c.instructor.organization}
                  </p>

                  {isUnlocked ? (
                    <button
                      onClick={() => setSelectedCertCourse(c)}
                      className="btn btn-primary btn-sm"
                      style={{ width: '100%' }}
                    >
                      <Printer size={15} /> View Official Diploma
                    </button>
                  ) : (
                    <Link
                      to={`/quiz/${c.id}`}
                      className="btn btn-secondary btn-sm"
                      style={{ width: '100%' }}
                    >
                      Pass Assessment to Unlock
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {selectedCertCourse && (
        <CertificateModal
          course={selectedCertCourse}
          onClose={() => setSelectedCertCourse(null)}
        />
      )}

      <style>{`
        @media (max-width: 768px) {
          .continue-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
