import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  Download, 
  Copy, 
  Check, 
  BookOpen, 
  Award, 
  Menu, 
  X,
  Code2
} from 'lucide-react';
import { COURSES } from '../data/coursesData';
import { useLearning } from '../context/LearningContext';
import { useToast } from '../context/ToastContext';

export function LessonPlayerPage() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { 
    isLessonCompleted, 
    toggleLessonCompletion, 
    setLastLesson, 
    saveNote, 
    getNote,
    getCourseProgress
  } = useLearning();
  const { addToast } = useToast();

  const course = COURSES.find(c => c.id === courseId);
  const videoRef = useRef(null);

  const allLessons = course ? course.modules.flatMap(m => m.lessons) : [];
  const currentLessonIndex = allLessons.findIndex(l => l.id === lessonId);
  const currentLesson = allLessons[currentLessonIndex] || allLessons[0];
  const currentModule = course?.modules.find(m => m.lessons.some(l => l.id === currentLesson?.id));

  // Player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('notes');
  const [personalNotes, setPersonalNotes] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    if (course && currentLesson) {
      setLastLesson(course.id, currentLesson.id);
      setPersonalNotes(getNote(course.id, currentLesson.id));
    }
  }, [course, currentLesson, setLastLesson, getNote]);

  if (!course || !currentLesson) {
    return (
      <div className="section" style={{ textAlign: 'center', padding: '6rem 1rem' }}>
        <h2>Lesson Not Found</h2>
        <Link to="/courses" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
          Back to Library
        </Link>
      </div>
    );
  }

  const prevLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null;
  const isCompleted = isLessonCompleted(course.id, currentLesson.id);
  const progress = getCourseProgress(course.id);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSpeedChange = (speed) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      setPlaybackSpeed(speed);
    }
  };

  const handleToggleComplete = () => {
    toggleLessonCompletion(course.id, currentLesson.id);
    if (!isCompleted) {
      addToast(`Completed "${currentLesson.title}"! (+50 XP)`, 'success');
    } else {
      addToast(`Marked "${currentLesson.title}" as incomplete.`, 'info');
    }
  };

  const handleNotesChange = (e) => {
    const val = e.target.value;
    setPersonalNotes(val);
    saveNote(course.id, currentLesson.id, val);
  };

  const handleCopyCode = () => {
    if (currentLesson.codeSnippet) {
      navigator.clipboard.writeText(currentLesson.codeSnippet);
      setCopiedCode(true);
      addToast('Code copied to clipboard!', 'info');
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: 'calc(100vh - 76px)',
      backgroundColor: 'var(--bg-primary)'
    }}>
      
      {/* Top Classroom Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 24px',
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-subtle)',
        fontSize: '0.85rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', overflow: 'hidden' }}>
          <Link
            to={`/courses/${course.id}`}
            className="btn btn-secondary btn-sm"
            style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <ChevronLeft size={15} /> Overview
          </Link>
          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            <span style={{ color: 'var(--text-muted)' }}>{course.title}</span>
            <span style={{ margin: '0 8px', color: 'var(--text-muted)' }}>/</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{currentLesson.title}</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={handleToggleComplete}
            className={`btn btn-sm ${isCompleted ? 'btn-secondary' : 'btn-primary'}`}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <CheckCircle2 size={15} style={{ color: isCompleted ? 'var(--accent-emerald)' : '#0b0b0e' }} />
            <span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
          </button>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="btn-icon"
            title="Toggle Curriculum Sidebar"
          >
            {sidebarOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      {/* Main Theatre & Notes Layout */}
      <div style={{ display: 'flex', flex: 1, position: 'relative', overflow: 'hidden' }} className="classroom-layout">
        
        {/* Left: Theatre & Notes Content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '2rem',
          maxWidth: sidebarOpen ? 'calc(100vw - 360px)' : '100%',
          transition: 'max-width var(--trans-normal)'
        }} className="video-main-column">

          {/* 16:9 MasterClass Cinematic Theatre Frame */}
          <div style={{
            position: 'relative',
            width: '100%',
            backgroundColor: '#000000',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)',
            aspectRatio: '16 / 9',
            marginBottom: '2rem',
            border: '1px solid var(--border-subtle)'
          }}>
            <video
              ref={videoRef}
              src={currentLesson.videoUrl}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => {
                setIsPlaying(false);
                if (!isCompleted) handleToggleComplete();
              }}
            />

            {/* Custom Overlay Controls */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              color: '#ffffff'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <button
                  onClick={togglePlay}
                  style={{ background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer', display: 'flex' }}
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} fill="#ffffff" />}
                </button>
                <button
                  onClick={toggleMute}
                  style={{ background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer', display: 'flex' }}
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-mono)' }}>
                  {currentLesson.duration}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {[1, 1.25, 1.5, 2].map(speed => (
                  <button
                    key={speed}
                    onClick={() => handleSpeedChange(speed)}
                    style={{
                      background: playbackSpeed === speed ? 'var(--accent-bronze)' : 'rgba(255,255,255,0.12)',
                      border: 'none',
                      color: playbackSpeed === speed ? '#0b0b0e' : '#ffffff',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Lesson Header & Steppers */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '2rem',
            paddingBottom: '1.5rem',
            borderBottom: '1px solid var(--border-subtle)'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-bronze)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                {currentModule?.title}
              </div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                {currentLesson.title}
              </h1>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              {prevLesson && (
                <Link to={`/learn/${course.id}/${prevLesson.id}`} className="btn btn-secondary btn-sm">
                  <ChevronLeft size={15} /> Previous Lesson
                </Link>
              )}
              {nextLesson ? (
                <Link to={`/learn/${course.id}/${nextLesson.id}`} className="btn btn-primary btn-sm">
                  Next Lesson <ChevronRight size={15} />
                </Link>
              ) : (
                <Link to={`/quiz/${course.id}`} className="btn btn-primary btn-sm">
                  Take Course Assessment <Award size={15} />
                </Link>
              )}
            </div>
          </div>

          {/* Dual Tabs: Lesson Notes vs Personal Scratchpad */}
          <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '14px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
            <button
              onClick={() => setActiveTab('notes')}
              style={{
                background: 'transparent',
                border: 'none',
                padding: '6px 14px',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                color: activeTab === 'notes' ? 'var(--accent-bronze)' : 'var(--text-muted)',
                borderBottom: activeTab === 'notes' ? '2px solid var(--accent-bronze)' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <FileText size={15} /> Lesson Overview & Blueprint
            </button>
            <button
              onClick={() => setActiveTab('scratchpad')}
              style={{
                background: 'transparent',
                border: 'none',
                padding: '6px 14px',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                color: activeTab === 'scratchpad' ? 'var(--accent-bronze)' : 'var(--text-muted)',
                borderBottom: activeTab === 'scratchpad' ? '2px solid var(--accent-bronze)' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Code2 size={15} /> Personal Study Scratchpad
            </button>
          </div>

          {/* Tab 1: Lesson Overview */}
          {activeTab === 'notes' && (
            <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '0.85rem' }}>
                Key Technical Concepts
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: '0.95rem', marginBottom: '1.75rem' }}>
                {currentLesson.description}
              </p>

              {currentLesson.codeSnippet && (
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#0a0a0c',
                    border: '1px solid var(--border-medium)',
                    borderBottom: 'none',
                    padding: '8px 14px',
                    borderTopLeftRadius: 'var(--radius-md)',
                    borderTopRightRadius: 'var(--radius-md)',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    <span>ARCHITECTURE BLUEPRINT</span>
                    <button
                      onClick={handleCopyCode}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: copiedCode ? 'var(--accent-emerald)' : 'var(--accent-bronze)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.75rem'
                      }}
                    >
                      {copiedCode ? <Check size={13} /> : <Copy size={13} />}
                      {copiedCode ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <pre style={{
                    backgroundColor: '#0a0a0c',
                    border: '1px solid var(--border-medium)',
                    borderBottomLeftRadius: 'var(--radius-md)',
                    borderBottomRightRadius: 'var(--radius-md)',
                    padding: '1.25rem',
                    overflowX: 'auto',
                    fontSize: '0.85rem',
                    color: '#e5e3dc',
                    lineHeight: 1.55
                  }}>
                    <code>{currentLesson.codeSnippet}</code>
                  </pre>
                </div>
              )}

              {currentLesson.resources && currentLesson.resources.length > 0 && (
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                    Reference Materials
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {currentLesson.resources.map((res, i) => (
                      <a
                        key={i}
                        href={res.url}
                        onClick={(e) => {
                          e.preventDefault();
                          addToast(`Downloaded ${res.title}`, 'info');
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '8px 14px',
                          backgroundColor: 'var(--bg-secondary)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-md)',
                          fontSize: '0.8rem',
                          color: 'var(--text-primary)',
                          textDecoration: 'none'
                        }}
                      >
                        <Download size={14} style={{ color: 'var(--accent-bronze)' }} />
                        <span style={{ fontWeight: 600 }}>{res.title}</span>
                        <span style={{ color: 'var(--text-muted)' }}>({res.size})</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Personal Scratchpad */}
          {activeTab === 'scratchpad' && (
            <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                  Personal Study Log
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-bronze)', fontWeight: 600 }}>
                  Auto-saved to LocalStorage
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                Record architectural observations or questions. These notes persist strictly for your profile.
              </p>
              <textarea
                value={personalNotes}
                onChange={handleNotesChange}
                placeholder="Record your observations for this lesson..."
                className="input"
                rows={10}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  lineHeight: 1.65,
                  resize: 'vertical'
                }}
              />
            </div>
          )}

        </div>

        {/* Right: Collapsible Curriculum Sidebar */}
        {sidebarOpen && (
          <aside style={{
            width: '360px',
            backgroundColor: 'var(--bg-secondary)',
            borderLeft: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto'
          }} className="curriculum-sidebar">
            
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                <span>Masterclass Progress</span>
                <span style={{ color: 'var(--accent-bronze)' }}>{progress.percentage}%</span>
              </div>
              <div className="progress-bar-bg" style={{ height: '5px', marginBottom: '8px' }}>
                <div className="progress-bar-fill" style={{ width: `${progress.percentage}%` }} />
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {progress.completedCount} of {progress.totalCount} Lessons Complete
              </div>
            </div>

            <div style={{ flex: 1, padding: '12px' }}>
              {course.modules.map((module) => (
                <div key={module.id} style={{ marginBottom: '14px' }}>
                  <div style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: 'var(--text-muted)',
                    padding: '6px 10px'
                  }}>
                    {module.title}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    {module.lessons.map(lesson => {
                      const active = lesson.id === currentLesson.id;
                      const done = isLessonCompleted(course.id, lesson.id);
                      return (
                        <Link
                          key={lesson.id}
                          to={`/learn/${course.id}/${lesson.id}`}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '10px 12px',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: active ? 'var(--bg-card-hover)' : 'transparent',
                            border: active ? '1px solid var(--border-accent)' : '1px solid transparent',
                            color: active ? '#ffffff' : 'var(--text-secondary)',
                            textDecoration: 'none',
                            fontSize: '0.825rem',
                            fontWeight: active ? 600 : 400,
                            transition: 'all var(--trans-fast)'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                            {done ? (
                              <CheckCircle2 size={15} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} />
                            ) : (
                              <Play size={13} style={{ color: active ? 'var(--accent-bronze)' : 'var(--text-muted)', flexShrink: 0 }} />
                            )}
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {lesson.title}
                            </span>
                          </div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '6px' }}>
                            {lesson.duration}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ padding: '1.25rem', borderTop: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-tertiary)' }}>
              <Link
                to={`/quiz/${course.id}`}
                className="btn btn-primary btn-sm"
                style={{ width: '100%' }}
              >
                <Award size={15} />
                <span>Certification Exam</span>
              </Link>
            </div>

          </aside>
        )}

      </div>

      <style>{`
        @media (max-width: 900px) {
          .video-main-column {
            max-width: 100% !important;
          }
          .curriculum-sidebar {
            position: fixed;
            top: 76px;
            right: 0;
            bottom: 0;
            width: 320px;
            z-index: 90;
            box-shadow: var(--shadow-lg);
          }
        }
      `}</style>

    </div>
  );
}
