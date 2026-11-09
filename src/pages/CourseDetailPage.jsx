import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Clock, 
  BookOpen, 
  Star, 
  CheckCircle2, 
  PlayCircle, 
  ArrowRight, 
  Award, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  FileText,
  UserCheck
} from 'lucide-react';
import { COURSES } from '../data/coursesData';
import { useLearning } from '../context/LearningContext';
import { useToast } from '../context/ToastContext';

export function CourseDetailPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { isEnrolled, enroll, getCourseProgress, getLastLesson, isLessonCompleted } = useLearning();
  const { addToast } = useToast();

  const course = COURSES.find(c => c.id === courseId);
  const [expandedModules, setExpandedModules] = useState(['m1', 'm2', 'm3', 'm4', 'm5', 'm6']);

  if (!course) {
    return (
      <div className="section" style={{ textAlign: 'center', padding: '6rem 1rem' }}>
        <h2>Course Not Found</h2>
        <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>The requested engineering track does not exist or has moved.</p>
        <Link to="/courses" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
          Back to Catalogue
        </Link>
      </div>
    );
  }

  const enrolled = isEnrolled(course.id);
  const progress = getCourseProgress(course.id);
  const nextLessonId = getLastLesson(course.id) || course.modules[0]?.lessons[0]?.id;

  const handleEnroll = () => {
    enroll(course.id);
    addToast(`Successfully enrolled in "${course.title}"!`, 'success');
  };

  const toggleModule = (modId) => {
    setExpandedModules(prev =>
      prev.includes(modId) ? prev.filter(id => id !== modId) : [...prev, modId]
    );
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '5rem' }}>
      
      {/* HERO BANNER SECTION */}
      <section style={{
        position: 'relative',
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '3.5rem 0'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) 360px',
            gap: '3rem',
            alignItems: 'start'
          }} className="course-hero-grid">
            
            {/* Left Column: Metadata & Overview */}
            <div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', marginBottom: '1rem' }}>
                <span className="badge badge-brand">{course.category}</span>
                <span className={`badge ${
                  course.difficulty === 'Beginner' ? 'badge-beginner' :
                  course.difficulty === 'Intermediate' ? 'badge-intermediate' : 'badge-advanced'
                }`}>
                  {course.difficulty}
                </span>
                {course.badge && <span className="badge badge-brand">{course.badge}</span>}
              </div>

              <h1 style={{
                fontSize: 'clamp(2rem, 3.8vw, 3rem)',
                fontWeight: 800,
                lineHeight: 1.18,
                marginBottom: '1rem',
                color: 'var(--text-primary)'
              }}>
                {course.title}
              </h1>

              <p style={{
                fontSize: '1.1rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginBottom: '1.75rem'
              }}>
                {course.tagline}
              </p>

              {/* Stats Bar */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.5rem',
                alignItems: 'center',
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                marginBottom: '2rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#facc15', fontWeight: 700 }}>
                  <Star size={16} fill="#facc15" />
                  <span>{course.rating}</span>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>({course.reviewsCount} reviews)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Clock size={16} />
                  <span>{course.duration}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <BookOpen size={16} />
                  <span>{course.lessonsCount} Lessons</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <UserCheck size={16} />
                  <span>{course.enrolledCount.toLocaleString()} Students</span>
                </div>
              </div>

              {/* Instructor Capsule */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border-subtle)',
                maxWidth: '460px'
              }}>
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {course.instructor.name}
                  </div>
                  <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                    {course.instructor.role} • {course.instructor.organization}
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Sticky Action & Preview Card */}
            <div style={{
              backgroundColor: 'var(--bg-card)',
              backdropFilter: 'blur(20px)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)'
            }}>
              
              {/* Image Preview */}
              <div style={{ position: 'relative', height: '200px' }}>
                <img
                  src={course.banner}
                  alt={course.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(7, 9, 14, 0.45)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'var(--grad-brand)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 25px rgba(99, 102, 241, 0.6)'
                  }}>
                    <PlayCircle size={30} color="#ffffff" />
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div style={{ padding: '1.75rem' }}>
                
                {enrolled ? (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>
                      <span style={{ color: progress.isCompleted ? 'var(--accent-emerald)' : 'var(--accent-cyan)' }}>
                        {progress.isCompleted ? 'Course Fully Completed!' : `${progress.percentage}% Completed`}
                      </span>
                      <span>{progress.completedCount}/{progress.totalCount} Lessons</span>
                    </div>

                    <div className="progress-bar-bg" style={{ height: '8px', marginBottom: '1.5rem' }}>
                      <div
                        className="progress-bar-fill"
                        style={{
                          width: `${progress.percentage}%`,
                          background: progress.isCompleted ? 'var(--accent-emerald)' : 'var(--grad-brand)'
                        }}
                      />
                    </div>

                    <Link
                      to={`/learn/${course.id}/${nextLessonId}`}
                      className="btn btn-primary"
                      style={{ width: '100%', marginBottom: '10px' }}
                    >
                      <PlayCircle size={18} />
                      <span>{progress.isCompleted ? 'Review Course Material' : 'Resume Learning'}</span>
                    </Link>

                    <Link
                      to={`/quiz/${course.id}`}
                      className="btn btn-secondary"
                      style={{ width: '100%' }}
                    >
                      <Award size={18} style={{ color: 'var(--accent-amber)' }} />
                      <span>Take Certification Quiz</span>
                    </Link>
                  </div>
                ) : (
                  <div>
                    <div style={{ marginBottom: '1.25rem' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                        Free Academic Access
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Full access to all {course.lessonsCount} video lessons, downloadable resources & diploma
                      </div>
                    </div>

                    <button
                      onClick={handleEnroll}
                      className="btn btn-primary btn-lg"
                      style={{ width: '100%', marginBottom: '1rem' }}
                    >
                      <span>Enroll in Course Now</span>
                      <ArrowRight size={18} />
                    </button>

                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                      <ShieldCheck size={14} style={{ color: 'var(--accent-emerald)' }} />
                      <span>Verifiable Certificate included upon completion</span>
                    </div>
                  </div>
                )}

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* CURRICULUM & OBJECTIVES BODY */}
      <section className="section">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) 360px',
            gap: '3rem',
            alignItems: 'start'
          }} className="course-body-grid">
            
            {/* Left Main Content */}
            <div>
              
              {/* Course Overview */}
              <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>
                  Course Architecture & Deep Overview
                </h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.975rem' }}>
                  {course.description}
                </p>
              </div>

              {/* What You Will Master (Learning Objectives) */}
              <div style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                marginBottom: '3rem'
              }}>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Award size={20} style={{ color: 'var(--accent-cyan)' }} />
                  What You Will Master
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                  {course.learningObjectives.map((obj, i) => (
                    <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <CheckCircle2 size={18} style={{ color: 'var(--accent-emerald)', flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        {obj}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Curriculum Accordion */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Course Curriculum</h2>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      {course.modules.length} Modules • {course.lessonsCount} Interactive Lessons
                    </div>
                  </div>
                  <button
                    onClick={() => setExpandedModules(expandedModules.length > 0 ? [] : course.modules.map(m => m.id))}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--accent-cyan)',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      cursor: 'pointer'
                    }}
                  >
                    {expandedModules.length > 0 ? 'Collapse All' : 'Expand All'}
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {course.modules.map(module => {
                    const isExpanded = expandedModules.includes(module.id);
                    return (
                      <div
                        key={module.id}
                        style={{
                          backgroundColor: 'var(--bg-secondary)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-md)',
                          overflow: 'hidden'
                        }}
                      >
                        {/* Module Header Bar */}
                        <button
                          onClick={() => toggleModule(module.id)}
                          style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '1.2rem 1.5rem',
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: 'var(--text-primary)',
                            cursor: 'pointer',
                            textAlign: 'left'
                          }}
                        >
                          <div>
                            <div style={{ fontSize: '1rem', fontWeight: 700 }}>{module.title}</div>
                            <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                              {module.lessons.length} Lessons
                            </div>
                          </div>
                          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>

                        {/* Module Lessons List */}
                        {isExpanded && (
                          <div style={{ borderTop: '1px solid var(--border-subtle)' }}>
                            {module.lessons.map(lesson => {
                              const completed = isLessonCompleted(course.id, lesson.id);
                              return (
                                <Link
                                  key={lesson.id}
                                  to={enrolled ? `/learn/${course.id}/${lesson.id}` : '#'}
                                  onClick={(e) => {
                                    if (!enrolled) {
                                      e.preventDefault();
                                      handleEnroll();
                                      navigate(`/learn/${course.id}/${lesson.id}`);
                                    }
                                  }}
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '1rem 1.5rem',
                                    borderBottom: '1px solid var(--border-subtle)',
                                    color: 'var(--text-secondary)',
                                    transition: 'background var(--trans-fast)',
                                    textDecoration: 'none'
                                  }}
                                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)')}
                                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                                >
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    {completed ? (
                                      <CheckCircle2 size={18} style={{ color: 'var(--accent-emerald)' }} />
                                    ) : (
                                      <PlayCircle size={18} style={{ color: 'var(--text-muted)' }} />
                                    )}
                                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                                      {lesson.title}
                                    </span>
                                  </div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                    {lesson.preview && <span className="badge badge-brand" style={{ fontSize: '0.65rem' }}>Free Preview</span>}
                                    <span>{lesson.duration}</span>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Column: Instructor & Skills Tags */}
            <div>
              
              {/* Skills Covered Pill Cloud */}
              <div className="card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>
                  Skills You Will Acquire
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {course.skillsCovered.map((skill, i) => (
                    <span
                      key={i}
                      style={{
                        padding: '4px 10px',
                        background: 'var(--bg-tertiary)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.775rem',
                        fontWeight: 600,
                        color: 'var(--accent-cyan)'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Prerequisites Card */}
              <div className="card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>
                  Prerequisites
                </h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {course.prerequisites.map((req, i) => (
                    <li key={i} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--accent-indigo)', fontWeight: 800 }}>•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructor Full Bio */}
              <div className="card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>
                  Your Lead Instructor
                </h3>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '1rem' }}>
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {course.instructor.name}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)' }}>
                      {course.instructor.role}
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {course.instructor.bio}
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .course-hero-grid, .course-body-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

    </div>
  );
}
