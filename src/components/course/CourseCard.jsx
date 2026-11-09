import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, BookOpen, Star, ArrowRight, CheckCircle2, Play } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

export function CourseCard({ course }) {
  const { isEnrolled, getCourseProgress, getLastLesson } = useLearning();
  const navigate = useNavigate();

  const enrolled = isEnrolled(course.id);
  const progress = getCourseProgress(course.id);
  const nextLessonId = getLastLesson(course.id);

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
        borderRadius: 'var(--radius-lg)',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        overflow: 'hidden'
      }}
    >
      {/* 16:9 Cinematic Thumbnail Container */}
      <div style={{ position: 'relative', width: '100%', height: '210px', overflow: 'hidden' }}>
        <img
          src={course.thumbnail}
          alt={course.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform var(--trans-smooth)'
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />
        
        {/* Subtle MasterClass Filmic Gradient */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(11, 11, 14, 0.95) 0%, rgba(11, 11, 14, 0.3) 50%, rgba(11, 11, 14, 0.1) 100%)'
        }} />

        {/* Top Badges */}
        <div style={{
          position: 'absolute',
          top: '14px',
          left: '14px',
          right: '14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span className="badge badge-brand" style={{ background: 'rgba(11, 11, 14, 0.85)', backdropFilter: 'blur(8px)' }}>
            {course.category}
          </span>
          <span style={{
            fontSize: '0.75rem',
            color: 'var(--accent-bronze)',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            background: 'rgba(11, 11, 14, 0.85)',
            padding: '3px 8px',
            borderRadius: 'var(--radius-sm)'
          }}>
            <Star size={12} fill="#c5a059" /> {course.rating}
          </span>
        </div>

        {/* Instructor Overlaid at Bottom of Image */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '14px',
          right: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <img
            src={course.instructor.avatar}
            alt={course.instructor.name}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '1.5px solid var(--accent-bronze)'
            }}
          />
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.2 }}>
              {course.instructor.name}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.7)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {course.instructor.role}
            </div>
          </div>
        </div>
      </div>

      {/* Card Content Body */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        
        {/* Editorial Serif Title */}
        <h3 style={{
          fontSize: '1.3rem',
          fontWeight: 600,
          lineHeight: 1.25,
          color: 'var(--text-primary)',
          marginBottom: '0.6rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {course.title}
        </h3>

        {/* Tagline */}
        <p style={{
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.55,
          marginBottom: '1.25rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {course.tagline}
        </p>

        {/* Understated Meta Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          fontSize: '0.775rem',
          color: 'var(--text-muted)',
          marginBottom: '1.25rem',
          paddingBottom: '0.85rem',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Clock size={13} />
            <span>{course.duration}</span>
          </div>
          <span>•</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <BookOpen size={13} />
            <span>{course.lessonsCount} Lessons</span>
          </div>
          <span>•</span>
          <span>{course.difficulty}</span>
        </div>

        {/* Enrollment or Progress Action */}
        <div style={{ marginTop: 'auto' }}>
          {enrolled ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600, marginBottom: '6px' }}>
                <span style={{ color: progress.isCompleted ? 'var(--accent-emerald)' : 'var(--accent-bronze)' }}>
                  {progress.isCompleted ? 'Masterclass Completed' : `${progress.percentage}% Completed`}
                </span>
                <span style={{ color: 'var(--text-muted)' }}>{progress.completedCount}/{progress.totalCount} Lessons</span>
              </div>

              <div className="progress-bar-bg" style={{ height: '4px', marginBottom: '10px' }}>
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
                onClick={(e) => e.stopPropagation()}
                className="btn btn-primary btn-sm"
                style={{ width: '100%' }}
              >
                <Play size={14} fill="#0b0b0e" />
                <span>{progress.isCompleted ? 'Review Lessons' : 'Resume Masterclass'}</span>
              </Link>
            </div>
          ) : (
            <Link
              to={`/courses/${course.id}`}
              onClick={(e) => e.stopPropagation()}
              className="btn btn-secondary btn-sm"
              style={{ width: '100%' }}
            >
              <span>Explore Masterclass</span>
              <ArrowRight size={14} />
            </Link>
          )}
        </div>

      </div>
    </div>
  );
}
