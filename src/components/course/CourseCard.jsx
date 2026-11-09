import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, BookOpen, Star, ArrowRight, CheckCircle2, PlayCircle } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

export function CourseCard({ course }) {
  const { isEnrolled, getCourseProgress, getLastLesson } = useLearning();
  const navigate = useNavigate();

  const enrolled = isEnrolled(course.id);
  const progress = getCourseProgress(course.id);
  const nextLessonId = getLastLesson(course.id);

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'badge-beginner';
      case 'Intermediate':
        return 'badge-intermediate';
      case 'Advanced':
        return 'badge-advanced';
      default:
        return 'badge-brand';
    }
  };

  const handleCardClick = () => {
    navigate(`/courses/${course.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="card card-interactive"
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
        height: '100%',
        borderRadius: 'var(--radius-lg)'
      }}
    >
      {/* Thumbnail Banner with Overlays */}
      <div style={{ position: 'relative', width: '100%', height: '190px', overflow: 'hidden' }}>
        <img
          src={course.thumbnail}
          alt={course.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform var(--trans-smooth)'
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(7, 9, 14, 0.85) 0%, rgba(7, 9, 14, 0.2) 60%, transparent 100%)'
        }} />

        {/* Top Badges */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          right: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span className={`badge ${getDifficultyBadge(course.difficulty)}`}>
            {course.difficulty}
          </span>
          {course.badge && (
            <span className="badge badge-brand" style={{ background: 'rgba(7, 9, 14, 0.8)', borderColor: 'var(--accent-cyan)' }}>
              {course.badge}
            </span>
          )}
        </div>

        {/* Rating Overlay */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          right: '12px',
          background: 'rgba(7, 9, 14, 0.85)',
          backdropFilter: 'blur(8px)',
          padding: '3px 8px',
          borderRadius: 'var(--radius-full)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '0.775rem',
          fontWeight: 700,
          color: '#facc15'
        }}>
          <Star size={13} fill="#facc15" />
          <span>{course.rating}</span>
          <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>({course.reviewsCount})</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        
        {/* Category Pill */}
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-indigo)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>
          {course.category}
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: '1.05rem',
          fontWeight: 700,
          lineHeight: 1.35,
          color: 'var(--text-primary)',
          marginBottom: '0.5rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {course.title}
        </h3>

        {/* Tagline */}
        <p style={{
          fontSize: '0.825rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.5,
          marginBottom: '1rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {course.tagline}
        </p>

        {/* Meta Stats Row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          fontSize: '0.775rem',
          color: 'var(--text-muted)',
          marginBottom: '1rem',
          paddingBottom: '0.85rem',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Clock size={14} />
            <span>{course.duration}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <BookOpen size={14} />
            <span>{course.lessonsCount} Lessons</span>
          </div>
        </div>

        {/* Instructor Avatar & Name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
          <img
            src={course.instructor.avatar}
            alt={course.instructor.name}
            style={{ width: '26px', height: '26px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{course.instructor.name}</span>
            <span style={{ margin: '0 4px', color: 'var(--text-muted)' }}>•</span>
            <span style={{ color: 'var(--text-muted)' }}>{course.instructor.organization.split('/')[0]}</span>
          </div>
        </div>

        {/* Enrollment / Progress Footnote */}
        <div style={{ marginTop: 'auto' }}>
          {enrolled ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600, marginBottom: '6px' }}>
                <span style={{ color: progress.isCompleted ? 'var(--accent-emerald)' : 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {progress.isCompleted ? <CheckCircle2 size={13} /> : <PlayCircle size={13} />}
                  {progress.isCompleted ? 'Course Completed' : `${progress.percentage}% Mastered`}
                </span>
                <span style={{ color: 'var(--text-muted)' }}>{progress.completedCount}/{progress.totalCount} Lessons</span>
              </div>
              <div className="progress-bar-bg" style={{ height: '6px', marginBottom: '10px' }}>
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
                onClick={(e) => e.stopPropagation()}
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.55rem', fontSize: '0.85rem' }}
              >
                {progress.isCompleted ? 'Review Lessons' : 'Continue Learning'}
                <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <Link
              to={`/courses/${course.id}`}
              onClick={(e) => e.stopPropagation()}
              className="btn btn-secondary"
              style={{ width: '100%', padding: '0.55rem', fontSize: '0.85rem' }}
            >
              Explore Curriculum
              <ArrowRight size={14} />
            </Link>
          )}
        </div>

      </div>
    </div>
  );
}
