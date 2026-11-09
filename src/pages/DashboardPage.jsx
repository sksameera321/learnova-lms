import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Flame, 
  Zap, 
  BookOpen, 
  CheckCircle2, 
  Award, 
  PlayCircle, 
  Clock, 
  ArrowRight, 
  TrendingUp, 
  Target,
  Sparkles,
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
    <div className="section animate-fade-in" style={{ paddingTop: '3.5rem', paddingBottom: '5rem' }}>
      <div className="container">
        
        {/* WELCOME BANNER & STUDENT BADGE */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1.5rem',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem',
          marginBottom: '2.5rem'
        }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
              alt={user?.name || 'Student'}
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid var(--accent-indigo)'
              }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
                  Welcome back, {user?.name || 'Sameera'}!
                </h1>
                <span className="badge badge-brand" style={{ fontSize: '0.7rem' }}>
                  {user?.level || 'Apprentice Architect'}
                </span>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                {user?.institution || 'SVECW Bhimavaram'} • {user?.role || 'Systems Scholar'}
              </p>
            </div>
          </div>

          {/* Quick Metrics Badges */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 14px',
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)'
            }}>
              <Flame size={20} style={{ color: 'var(--accent-amber)' }} fill="#f59e0b" />
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {user?.streak || 14} Days
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Study Streak</div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 14px',
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)'
            }}>
              <Zap size={20} style={{ color: 'var(--accent-cyan)' }} />
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {user?.xp || 3450} XP
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Total Points</div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 14px',
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)'
            }}>
              <Award size={20} style={{ color: 'var(--accent-emerald)' }} />
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {telemetry.earnedCertificates} Earned
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Credentials</div>
              </div>
            </div>
          </div>

        </div>

        {/* PRIMARY "CONTINUE LEARNING" HERO CARD */}
        {activeCourse && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(56, 189, 248, 0.08) 100%)',
            border: '1px solid var(--border-accent)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            marginBottom: '3rem',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
              <span className="badge badge-brand">
                <Sparkles size={12} /> CONTINUE LEARNING
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {activeProgress.completedCount} of {activeProgress.totalCount} lessons completed
              </span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) auto',
              gap: '1.5rem',
              alignItems: 'center'
            }} className="continue-grid">
              <div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                  {activeCourse.title}
                </h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--accent-cyan)', fontWeight: 600, marginBottom: '1.25rem' }}>
                  Next Lesson: {activeLessonObject?.title || 'Next Module'}
                </p>

                <div className="progress-bar-bg" style={{ height: '8px', maxWidth: '480px' }}>
                  <div className="progress-bar-fill" style={{ width: `${activeProgress.percentage}%` }} />
                </div>
              </div>

              <Link
                to={`/learn/${activeCourse.id}/${activeNextLessonId}`}
                className="btn btn-primary btn-lg"
              >
                <PlayCircle size={18} />
                <span>Resume Lesson</span>
              </Link>
            </div>
          </div>
        )}

        {/* LEARNING TELEMETRY ANALYTICS (4 METRICS) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          marginBottom: '3.5rem'
        }}>
          <div className="card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Enrolled Tracks
              </span>
              <BookOpen size={18} style={{ color: 'var(--accent-cyan)' }} />
            </div>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {telemetry.totalEnrolled}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Active engineering curricula
            </div>
          </div>

          <div className="card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Completed Lessons
              </span>
              <CheckCircle2 size={18} style={{ color: 'var(--accent-emerald)' }} />
            </div>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
              {telemetry.totalLessonsCompleted}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Milestones mastered & verified
            </div>
          </div>

          <div className="card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Quiz Average
              </span>
              <TrendingUp size={18} style={{ color: 'var(--accent-indigo)' }} />
            </div>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--accent-indigo)' }}>
              {telemetry.averageQuizScore > 0 ? `${telemetry.averageQuizScore}%` : 'N/A'}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Across certification assessments
            </div>
          </div>

          <div className="card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Weekly Target
              </span>
              <Target size={18} style={{ color: 'var(--accent-amber)' }} />
            </div>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--accent-amber)' }}>
              6.5 / 8 hrs
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              81% of weekly goal achieved
            </div>
          </div>
        </div>

        {/* ENROLLED COURSES SECTION */}
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>My Enrolled Courses</h2>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Track your real-time completion status across all active disciplines
              </div>
            </div>
            <Link to="/courses" className="btn btn-secondary btn-sm">
              Discover More Tracks <ArrowRight size={14} />
            </Link>
          </div>

          {enrolledCoursesList.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '1.5rem'
            }}>
              {enrolledCoursesList.map(course => {
                const progress = getCourseProgress(course.id);
                const nextId = getLastLesson(course.id) || course.modules[0]?.lessons[0]?.id;
                const quizScore = getQuizScore(course.id);

                return (
                  <div
                    key={course.id}
                    className="card"
                    style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem' }}
                  >
                    <div style={{ display: 'flex', gap: '14px', marginBottom: '1.25rem' }}>
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-md)', objectFit: 'cover', flexShrink: 0 }}
                      />
                      <div style={{ overflow: 'hidden' }}>
                        <span className="badge badge-brand" style={{ fontSize: '0.65rem', marginBottom: '4px' }}>
                          {course.category}
                        </span>
                        <h3 style={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.3, color: 'var(--text-primary)' }}>
                          {course.title}
                        </h3>
                      </div>
                    </div>

                    {/* Progress Bar & Details */}
                    <div style={{ marginBottom: '1.25rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
                        <span style={{ color: progress.isCompleted ? 'var(--accent-emerald)' : 'var(--text-primary)' }}>
                          {progress.percentage}% Complete
                        </span>
                        <span style={{ color: 'var(--text-muted)' }}>
                          {progress.completedCount}/{progress.totalCount} Lessons
                        </span>
                      </div>
                      <div className="progress-bar-bg" style={{ height: '6px' }}>
                        <div
                          className="progress-bar-fill"
                          style={{
                            width: `${progress.percentage}%`,
                            background: progress.isCompleted ? 'var(--accent-emerald)' : 'var(--grad-brand)'
                          }}
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <div style={{ marginTop: 'auto', display: 'flex', gap: '8px' }}>
                      <Link
                        to={`/learn/${course.id}/${nextId}`}
                        className="btn btn-primary btn-sm"
                        style={{ flex: 1 }}
                      >
                        <PlayCircle size={15} />
                        <span>Classroom</span>
                      </Link>

                      <Link
                        to={`/quiz/${course.id}`}
                        className="btn btn-secondary btn-sm"
                        style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Award size={15} style={{ color: quizScore?.passed ? 'var(--accent-emerald)' : 'var(--accent-amber)' }} />
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
              padding: '3rem 2rem',
              textAlign: 'center'
            }}>
              <BookOpen size={40} style={{ color: 'var(--text-muted)', marginBottom: '0.75rem' }} />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                No active courses enrolled yet
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
                Browse our curriculum to begin mastering autonomous systems, distributed databases, or quantum computing.
              </p>
              <Link to="/courses" className="btn btn-primary">
                Explore Curriculum
              </Link>
            </div>
          )}
        </div>

        {/* VERIFIABLE CERTIFICATES UNLOCKED */}
        <div>
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Verified Credentials & Diplomas</h2>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Official certifications of engineering mastery unlocked through course completion and assessments
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}>
            {/* Always showcase at least one previewable credential (or earned ones) */}
            {COURSES.slice(0, 2).map((c) => {
              const quizScore = getQuizScore(c.id);
              const isUnlocked = certificates.includes(c.id) || (quizScore && quizScore.passed);

              return (
                <div
                  key={c.id}
                  className="card"
                  style={{
                    padding: '1.75rem',
                    border: isUnlocked ? '1px solid rgba(250, 204, 21, 0.4)' : '1px solid var(--border-subtle)',
                    background: isUnlocked ? 'radial-gradient(circle at 100% 0%, rgba(234, 179, 8, 0.08) 0%, var(--bg-card) 60%)' : 'var(--bg-card)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: isUnlocked ? 'linear-gradient(135deg, #eab308, #ca8a04)' : 'var(--bg-tertiary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isUnlocked ? '#000000' : 'var(--text-muted)'
                    }}>
                      <Award size={22} />
                    </div>
                    <span className={`badge ${isUnlocked ? 'badge-beginner' : 'badge-brand'}`}>
                      {isUnlocked ? 'Verified Credential' : 'In Progress'}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                    {c.title}
                  </h3>

                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                    Instructor: {c.instructor.name} • {c.instructor.organization}
                  </p>

                  {isUnlocked ? (
                    <button
                      onClick={() => setSelectedCertCourse(c)}
                      className="btn btn-primary btn-sm"
                      style={{ width: '100%', background: 'linear-gradient(135deg, #eab308, #ca8a04)' }}
                    >
                      <Printer size={15} /> View Official Diploma
                    </button>
                  ) : (
                    <Link
                      to={`/quiz/${c.id}`}
                      className="btn btn-secondary btn-sm"
                      style={{ width: '100%' }}
                    >
                      Pass Quiz to Unlock
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Official Certificate Modal */}
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
