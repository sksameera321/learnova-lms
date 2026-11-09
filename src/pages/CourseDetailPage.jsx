import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Clock, 
  BookOpen, 
  Star, 
  CheckCircle2, 
  Play, 
  ArrowRight, 
  Award, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
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
        <h2>Masterclass Not Found</h2>
        <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>The requested masterclass does not exist or has been archived.</p>
        <Link to="/courses" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
          Back to Library
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
    <div className="animate-fade-in" style={{ paddingBottom: '6rem' }}>
      
      {/* HERO SECTION */}
      <section style={{
        position: 'relative',
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '4rem 0'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) 380px',
            gap: '3.5rem',
            alignItems: 'start'
          }} className="course-hero-grid">
            
            {/* Left Column: Metadata & Overview */}
            <div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', marginBottom: '1.25rem' }}>
                <span className="badge badge-brand">{course.category}</span>
                <span className="badge" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                  {course.difficulty}
                </span>
                {course.badge && <span className="badge badge-brand">{course.badge}</span>}
              </div>

              <h1 style={{
                fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                lineHeight: 1.15,
                marginBottom: '1.25rem',
                color: 'var(--text-primary)'
              }}>
                {course.title}
              </h1>

              <p style={{
                fontSize: '1.1rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.65,
                marginBottom: '2rem'
              }}>
                {course.tagline}
              </p>

              {/* Stats Bar */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.5rem',
                alignItems: 'center',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                marginBottom: '2rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--accent-bronze)', fontWeight: 700 }}>
                  <Star size={15} fill="#c5a059" stroke="none" />
                  <span>{course.rating}</span>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({course.reviewsCount} reviews)</span>
                </div>
                <span>•</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Clock size={15} />
                  <span>{course.duration}</span>
                </div>
                <span>•</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <BookOpen size={15} />
                  <span>{course.lessonsCount} Lessons</span>
                </div>
                <span>•</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <UserCheck size={15} />
                  <span>{course.enrolledCount.toLocaleString()} Scholars</span>
                </div>
              </div>

              {/* Instructor Profile Capsule */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '14px 18px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border-subtle)',
                maxWidth: '480px'
              }}>
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--accent-bronze)' }}
                />
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {course.instructor.name}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {course.instructor.role} • {course.instructor.organization}
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Sticky Action & Preview Card */}
            <div style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)'
            }}>
              
              {/* Image Preview */}
              <div style={{ position: 'relative', height: '220px' }}>
                <img
                  src={course.banner}
                  alt={course.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(11, 11, 14, 0.9) 0%, rgba(11, 11, 14, 0.3) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    background: 'var(--grad-bronze)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'var(--shadow-bronze)'
                  }}>
                    <Play size={22} fill="#0b0b0e" style={{ marginLeft: '3px' }} />
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div style={{ padding: '2rem' }}>
                
                {enrolled ? (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>
                      <span style={{ color: progress.isCompleted ? 'var(--accent-emerald)' : 'var(--accent-bronze)' }}>
                        {progress.isCompleted ? 'Masterclass Completed' : `${progress.percentage}% Completed`}
                      </span>
                      <span style={{ color: 'var(--text-muted)' }}>{progress.completedCount}/{progress.totalCount} Lessons</span>
                    </div>

                    <div className="progress-bar-bg" style={{ height: '6px', marginBottom: '1.5rem' }}>
                      <div
                        className="progress-bar-fill"
                        style={{
                          width: `${progress.percentage}%`,
                          background: progress.isCompleted ? 'var(--accent-emerald)' : 'var(--grad-bronze)'
                        }}
                      />
                    </div>

                    <Link
                      to={`/learn/${course.id}/${nextLessonId}`}
                      className="btn btn-primary"
                      style={{ width: '100%', marginBottom: '10px' }}
                    >
                      <Play size={16} fill="#0b0b0e" />
                      <span>{progress.isCompleted ? 'Review Lessons' : 'Resume Masterclass'}</span>
                    </Link>

                    <Link
                      to={`/quiz/${course.id}`}
                      className="btn btn-secondary"
                      style={{ width: '100%' }}
                    >
                      <Award size={16} style={{ color: 'var(--accent-bronze)' }} />
                      <span>Certification Assessment</span>
                    </Link>
                  </div>
                ) : (
                  <div>
                    <div style={{ marginBottom: '1.5rem' }}>
                      <div style={{ fontSize: '1.6rem', fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--text-primary)' }}>
                        Full Masterclass Access
                      </div>
                      <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.5 }}>
                        Includes all {course.lessonsCount} video lessons, downloadable engineering blueprints & verifiable credential
                      </div>
                    </div>

                    <button
                      onClick={handleEnroll}
                      className="btn btn-primary btn-lg"
                      style={{ width: '100%', marginBottom: '1rem' }}
                    >
                      <span>Enroll in Masterclass</span>
                      <ArrowRight size={16} />
                    </button>

                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                      <ShieldCheck size={14} style={{ color: 'var(--accent-bronze)' }} />
                      <span>Official Diploma granted upon milestone completion</span>
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
            gridTemplateColumns: 'minmax(0, 1fr) 380px',
            gap: '3.5rem',
            alignItems: 'start'
          }} className="course-body-grid">
            
            {/* Left Main Content */}
            <div>
              
              {/* Course Overview */}
              <div style={{ marginBottom: '3.5rem' }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1rem' }}>
                  Curriculum Overview
                </h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: '1rem' }}>
                  {course.description}
                </p>
              </div>

              {/* What You Will Master */}
              <div style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '2.25rem',
                marginBottom: '3.5rem'
              }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Award size={20} style={{ color: 'var(--accent-bronze)' }} />
                  What You Will Master
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                  {course.learningObjectives.map((obj, i) => (
                    <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <CheckCircle2 size={16} style={{ color: 'var(--accent-bronze)', flexShrink: 0, marginTop: '3px' }} />
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                        {obj}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Curriculum Accordion */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
                  <div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 600 }}>Syllabus of Lessons</h2>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {course.modules.length} Modules • {course.lessonsCount} Video Lessons
                    </div>
                  </div>
                  <button
                    onClick={() => setExpandedModules(expandedModules.length > 0 ? [] : course.modules.map(m => m.id))}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--accent-bronze)',
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
                            padding: '1.25rem 1.5rem',
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: 'var(--text-primary)',
                            cursor: 'pointer',
                            textAlign: 'left'
                          }}
                        >
                          <div>
                            <div style={{ fontSize: '1.1rem', fontFamily: 'var(--font-display)', fontWeight: 600 }}>{module.title}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                              {module.lessons.length} Lessons
                            </div>
                          </div>
                          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
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
                                      <CheckCircle2 size={16} style={{ color: 'var(--accent-emerald)' }} />
                                    ) : (
                                      <Play size={14} style={{ color: 'var(--accent-bronze)' }} />
                                    )}
                                    <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                                      {lesson.title}
                                    </span>
                                  </div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                    {lesson.preview && <span className="badge badge-brand" style={{ fontSize: '0.65rem' }}>Preview</span>}
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

            {/* Right Column: Instructor & Skills */}
            <div>
              
              {/* Skills Acquired */}
              <div className="card" style={{ marginBottom: '2rem', padding: '1.75rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '1rem' }}>
                  Skills Covered
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
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Prerequisites Card */}
              <div className="card" style={{ marginBottom: '2rem', padding: '1.75rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '1rem' }}>
                  Prerequisites
                </h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {course.prerequisites.map((req, i) => (
                    <li key={i} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--accent-bronze)', fontWeight: 800 }}>•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructor Bio */}
              <div className="card" style={{ padding: '1.75rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '1.25rem' }}>
                  Meet Your Instructor
                </h3>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '1rem' }}>
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--accent-bronze)' }}
                  />
                  <div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {course.instructor.name}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--accent-bronze)' }}>
                      {course.instructor.role}
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
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
