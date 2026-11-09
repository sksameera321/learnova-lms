import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Maximize2, 
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

  // Find all lessons flattened
  const allLessons = course ? course.modules.flatMap(m => m.lessons) : [];
  const currentLessonIndex = allLessons.findIndex(l => l.id === lessonId);
  const currentLesson = allLessons[currentLessonIndex] || allLessons[0];
  const currentModule = course?.modules.find(m => m.lessons.some(l => l.id === currentLesson?.id));

  // Player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('notes'); // 'notes' or 'scratchpad'
  const [personalNotes, setPersonalNotes] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  // Sync last accessed lesson
  useEffect(() => {
    if (course && currentLesson) {
      setLastLesson(course.id, currentLesson.id);
      // Load student's saved scratchpad notes for this lesson
      setPersonalNotes(getNote(course.id, currentLesson.id));
    }
  }, [course, currentLesson, setLastLesson, getNote]);

  if (!course || !currentLesson) {
    return (
      <div className="section" style={{ textAlign: 'center', padding: '6rem 1rem' }}>
        <h2>Lesson Not Found</h2>
        <Link to="/courses" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
          Back to Catalogue
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
      minHeight: 'calc(100vh - 72px)',
      backgroundColor: 'var(--bg-primary)'
    }}>
      
      {/* Top Classroom Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 20px',
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-subtle)',
        fontSize: '0.85rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflow: 'hidden' }}>
          <Link
            to={`/courses/${course.id}`}
            className="btn btn-secondary btn-sm"
            style={{ padding: '6px 10px', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <ChevronLeft size={16} /> Course Overview
          </Link>
          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            <span style={{ color: 'var(--text-muted)' }}>{course.title}</span>
            <span style={{ margin: '0 8px', color: 'var(--text-muted)' }}>/</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{currentLesson.title}</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Completion Status Toggle */}
          <button
            onClick={handleToggleComplete}
            className={`btn btn-sm ${isCompleted ? 'btn-secondary' : 'btn-primary'}`}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <CheckCircle2 size={16} style={{ color: isCompleted ? 'var(--accent-emerald)' : '#ffffff' }} />
            <span>{isCompleted ? 'Completed' : 'Mark as Complete'}</span>
          </button>

          {/* Sidebar Toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="btn-icon"
            title="Toggle Curriculum Sidebar"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Main Classroom Workstation */}
      <div style={{ display: 'flex', flex: 1, position: 'relative', overflow: 'hidden' }} className="classroom-layout">
        
        {/* Left: Theatre & Notes Content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.5rem',
          maxWidth: sidebarOpen ? 'calc(100vw - 360px)' : '100%',
          transition: 'max-width var(--trans-normal)'
        }} className="video-main-column">

          {/* Video Player Container */}
          <div style={{
            position: 'relative',
            width: '100%',
            backgroundColor: '#000000',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)',
            aspectRatio: '16 / 9',
            marginBottom: '1.5rem'
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

            {/* Custom Overlay Controls Bar */}
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
                  {isPlaying ? <Pause size={22} /> : <Play size={22} fill="#ffffff" />}
                </button>
                <button
                  onClick={toggleMute}
                  style={{ background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer', display: 'flex' }}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-mono)' }}>
                  {currentLesson.duration}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {/* Speed Selector */}
                {[1, 1.25, 1.5, 2].map(speed => (
                  <button
                    key={speed}
                    onClick={() => handleSpeedChange(speed)}
                    style={{
                      background: playbackSpeed === speed ? 'var(--accent-indigo)' : 'rgba(255,255,255,0.15)',
                      border: 'none',
                      color: '#ffffff',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Lesson Header & Next/Previous Navigation */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1.5rem',
            paddingBottom: '1.25rem',
            borderBottom: '1px solid var(--border-subtle)'
          }}>
            <div>
              <span className="badge badge-brand" style={{ marginBottom: '0.4rem' }}>
                {currentModule?.title.split(':')[0] || 'Lesson'}
              </span>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {currentLesson.title}
              </h1>
            </div>

            {/* Stepper Buttons */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {prevLesson && (
                <Link to={`/learn/${course.id}/${prevLesson.id}`} className="btn btn-secondary btn-sm">
                  <ChevronLeft size={16} /> Previous
                </Link>
              )}
              {nextLesson ? (
                <Link to={`/learn/${course.id}/${nextLesson.id}`} className="btn btn-primary btn-sm">
                  Next Lesson <ChevronRight size={16} />
                </Link>
              ) : (
                <Link to={`/quiz/${course.id}`} className="btn btn-primary btn-sm" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                  Take Course Quiz <Award size={16} />
                </Link>
              )}
            </div>
          </div>

          {/* Interactive Dual Tabs: Lesson Notes vs Personal Scratchpad */}
          <div style={{ marginBottom: '1.25rem', display: 'flex', gap: '10px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
            <button
              onClick={() => setActiveTab('notes')}
              style={{
                background: 'transparent',
                border: 'none',
                padding: '6px 14px',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: 'pointer',
                color: activeTab === 'notes' ? 'var(--accent-cyan)' : 'var(--text-muted)',
                borderBottom: activeTab === 'notes' ? '2px solid var(--accent-cyan)' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <FileText size={16} /> Lesson Overview & Code
            </button>
            <button
              onClick={() => setActiveTab('scratchpad')}
              style={{
                background: 'transparent',
                border: 'none',
                padding: '6px 14px',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: 'pointer',
                color: activeTab === 'scratchpad' ? 'var(--accent-cyan)' : 'var(--text-muted)',
                borderBottom: activeTab === 'scratchpad' ? '2px solid var(--accent-cyan)' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Code2 size={16} /> My Saved Scratchpad Notes
            </button>
          </div>

          {/* Tab 1: Lesson Overview */}
          {activeTab === 'notes' && (
            <div className="card" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                Key Technical Concepts
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.925rem', marginBottom: '1.5rem' }}>
                {currentLesson.description}
              </p>

              {/* Code Snippet Box with Copy Action */}
              {currentLesson.codeSnippet && (
                <div style={{ marginBottom: '1.75rem' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#07090e',
                    border: '1px solid var(--border-medium)',
                    borderBottom: 'none',
                    padding: '8px 14px',
                    borderTopLeftRadius: 'var(--radius-md)',
                    borderTopRightRadius: 'var(--radius-md)',
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    <span>IMPLEMENTATION SNIPPET</span>
                    <button
                      onClick={handleCopyCode}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: copiedCode ? 'var(--accent-emerald)' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.75rem'
                      }}
                    >
                      {copiedCode ? <Check size={14} /> : <Copy size={14} />}
                      {copiedCode ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <pre style={{
                    backgroundColor: '#07090e',
                    border: '1px solid var(--border-medium)',
                    borderBottomLeftRadius: 'var(--radius-md)',
                    borderBottomRightRadius: 'var(--radius-md)',
                    padding: '1rem',
                    overflowX: 'auto',
                    fontSize: '0.85rem',
                    color: '#38bdf8',
                    lineHeight: 1.5
                  }}>
                    <code>{currentLesson.codeSnippet}</code>
                  </pre>
                </div>
              )}

              {/* Downloadable Resources */}
              {currentLesson.resources && currentLesson.resources.length > 0 && (
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                    Downloadable Materials
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
                        <Download size={14} style={{ color: 'var(--accent-cyan)' }} />
                        <span style={{ fontWeight: 600 }}>{res.title}</span>
                        <span style={{ color: 'var(--text-muted)' }}>({res.size})</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Personal Student Scratchpad */}
          {activeTab === 'scratchpad' && (
            <div className="card" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
                  Personal Student Notes
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                  Auto-saved to LocalStorage
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Jot down your observations, code snippets, or architectural thoughts. These notes persist strictly for your profile across refreshes.
              </p>
              <textarea
                value={personalNotes}
                onChange={handleNotesChange}
                placeholder="Type your notes here for this lesson..."
                className="input"
                rows={10}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
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
            
            {/* Sidebar Header Progress */}
            <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                <span>Course Progress</span>
                <span style={{ color: 'var(--accent-cyan)' }}>{progress.percentage}%</span>
              </div>
              <div className="progress-bar-bg" style={{ height: '6px', marginBottom: '8px' }}>
                <div className="progress-bar-fill" style={{ width: `${progress.percentage}%` }} />
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {progress.completedCount} of {progress.totalCount} Lessons Complete
              </div>
            </div>

            {/* Curriculum Accordion in Sidebar */}
            <div style={{ flex: 1, padding: '10px' }}>
              {course.modules.map((module) => (
                <div key={module.id} style={{ marginBottom: '12px' }}>
                  <div style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
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
                            border: active ? '1px solid var(--accent-indigo)' : '1px solid transparent',
                            color: active ? '#ffffff' : 'var(--text-secondary)',
                            textDecoration: 'none',
                            fontSize: '0.825rem',
                            fontWeight: active ? 700 : 500,
                            transition: 'all var(--trans-fast)'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                            {done ? (
                              <CheckCircle2 size={16} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} />
                            ) : (
                              <Play size={14} style={{ color: active ? 'var(--accent-cyan)' : 'var(--text-muted)', flexShrink: 0 }} />
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

            {/* Quiz Banner in Sidebar */}
            <div style={{ padding: '1.25rem', borderTop: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-tertiary)' }}>
              <Link
                to={`/quiz/${course.id}`}
                className="btn btn-primary btn-sm"
                style={{ width: '100%', background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
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
            top: 72px;
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
