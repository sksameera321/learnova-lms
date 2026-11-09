import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Building, 
  Flame, 
  Zap, 
  Award, 
  LogOut, 
  BookOpen, 
  Save, 
  ShieldCheck,
  Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLearning } from '../context/LearningContext';
import { useToast } from '../context/ToastContext';
import { COURSES } from '../data/coursesData';

export function ProfilePage() {
  const { user, updateProfile, logout, isAuthenticated } = useAuth();
  const { enrolled, getCourseProgress, certificates } = useLearning();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || '');
  const [institution, setInstitution] = useState(user?.institution || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [isSaved, setIsSaved] = useState(false);

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({ name, institution, bio });
    setIsSaved(true);
    addToast('Profile updated successfully!', 'success');
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleLogout = () => {
    logout();
    addToast('Signed out of student session.', 'info');
    navigate('/login');
  };

  const enrolledList = COURSES.filter(c => enrolled.includes(c.id));

  return (
    <div className="section animate-fade-in" style={{ paddingTop: '3.5rem', paddingBottom: '5rem' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        
        {/* Profile Card */}
        <div className="card" style={{ padding: '2.5rem', marginBottom: '2.5rem' }}>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', marginBottom: '2rem' }}>
            <img
              src={user.avatar}
              alt={user.name}
              style={{
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid var(--accent-indigo)',
                boxShadow: 'var(--shadow-glow)'
              }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>{user.name}</h1>
                <span className="badge badge-brand">{user.level}</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
                {user.email} • Member since {user.joined}
              </p>
            </div>

            <button onClick={handleLogout} className="btn btn-secondary btn-sm" style={{ color: 'var(--accent-rose)' }}>
              <LogOut size={15} /> Sign Out
            </button>
          </div>

          {/* Gamification Pills */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '1rem',
            padding: '1.25rem',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Flame size={24} style={{ color: 'var(--accent-amber)' }} fill="#f59e0b" />
              <div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{user.streak} Days</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Daily Streak</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Zap size={24} style={{ color: 'var(--accent-cyan)' }} />
              <div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{user.xp} XP</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Skill Points</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Award size={24} style={{ color: 'var(--accent-emerald)' }} />
              <div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{certificates.length}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Certifications</div>
              </div>
            </div>
          </div>

          {/* Edit Form */}
          <form onSubmit={handleSave}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="profile-form-grid">
              
              <div className="input-group">
                <label className="input-label">Student Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input"
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">Academic Institution</label>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="input"
                />
              </div>

            </div>

            <div className="input-group">
              <label className="input-label">Professional Bio / Focus Area</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="input"
                rows={3}
                style={{ resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button type="submit" className="btn btn-primary">
                {isSaved ? <Check size={16} /> : <Save size={16} />}
                <span>{isSaved ? 'Saved Changes' : 'Save Profile Changes'}</span>
              </button>
            </div>

          </form>

        </div>

        {/* Enrolled Courses Summary */}
        <div className="card" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={20} style={{ color: 'var(--accent-cyan)' }} />
            Active Course Enrolments ({enrolledList.length})
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {enrolledList.map(course => {
              const progress = getCourseProgress(course.id);
              return (
                <div
                  key={course.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    flexWrap: 'wrap',
                    gap: '10px'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {course.title}
                    </div>
                    <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                      {course.category} • {progress.percentage}% Completed
                    </div>
                  </div>

                  <Link to={`/courses/${course.id}`} className="btn btn-secondary btn-sm">
                    Open Track
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 640px) {
          .profile-form-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
