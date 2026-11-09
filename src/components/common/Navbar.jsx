import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  Compass, 
  LayoutDashboard, 
  Search, 
  Sun, 
  Moon, 
  Flame, 
  LogOut, 
  User as UserIcon, 
  Menu, 
  X,
  ChevronDown
} from 'lucide-react';

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [navSearch, setNavSearch] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (navSearch.trim()) {
      navigate(`/courses?q=${encodeURIComponent(navSearch.trim())}`);
      setNavSearch('');
      setMobileMenuOpen(false);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'var(--bg-glass)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border-subtle)',
      transition: 'all var(--trans-normal)'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '76px' }}>
        
        {/* Brand Logo (MasterClass Editorial Crest) */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-bronze)'
          }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, fontStyle: 'italic', lineHeight: 1 }}>
              L
            </span>
          </div>
          <div>
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.25rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              color: 'var(--text-primary)'
            }}>
              LEARNOVA
            </span>
            <span style={{
              display: 'block',
              fontSize: '0.625rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              color: 'var(--accent-bronze)',
              textTransform: 'uppercase',
              lineHeight: 1,
              marginTop: '2px'
            }}>
              The Master Series
            </span>
          </div>
        </Link>

        {/* Desktop Quick Search */}
        <form onSubmit={handleSearchSubmit} style={{
          display: 'none',
          position: 'relative',
          width: '300px',
          alignItems: 'center'
        }} className="desktop-search">
          <Search size={15} style={{ position: 'absolute', left: '14px', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search masterclasses..."
            value={navSearch}
            onChange={(e) => setNavSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 14px 8px 36px',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-full)',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              outline: 'none',
              boxShadow: 'var(--skeuo-debossed)'
            }}
          />
        </form>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'none', alignItems: 'center', gap: '28px' }} className="desktop-nav">
          <Link
            to="/courses"
            style={{
              fontSize: '0.9rem',
              fontWeight: 600,
              color: isActive('/courses') ? 'var(--accent-bronze)' : 'var(--text-secondary)',
              letterSpacing: '0.02em',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'color var(--trans-fast)'
            }}
          >
            <Compass size={15} />
            Explore Library
          </Link>

          <Link
            to="/dashboard"
            style={{
              fontSize: '0.9rem',
              fontWeight: 600,
              color: isActive('/dashboard') ? 'var(--accent-bronze)' : 'var(--text-secondary)',
              letterSpacing: '0.02em',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'color var(--trans-fast)'
            }}
          >
            <LayoutDashboard size={15} />
            My Dashboard
          </Link>
        </nav>

        {/* Right Controls: Theme Toggle + User Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          
          <button
            onClick={toggleTheme}
            className="btn-icon"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {isAuthenticated ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  padding: '4px 10px 4px 6px',
                  borderRadius: 'var(--radius-full)',
                  cursor: 'pointer',
                  color: 'var(--text-primary)'
                }}
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, maxWidth: '110px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user.name.split(' ')[0]}
                </span>
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                  fontSize: '0.725rem',
                  fontWeight: 700,
                  color: 'var(--accent-bronze)',
                  background: 'var(--accent-bronze-subtle)',
                  padding: '2px 6px',
                  borderRadius: '10px'
                }}>
                  <Flame size={11} fill="#c5a059" />
                  {user.streak}d
                </span>
                <ChevronDown size={13} style={{ color: 'var(--text-muted)' }} />
              </button>

              {userDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '115%',
                  right: 0,
                  width: '230px',
                  backgroundColor: 'var(--bg-elevated)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-lg)',
                  padding: '8px',
                  zIndex: 200
                }}>
                  <div style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '6px' }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>{user.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.email}</div>
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setUserDropdownOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 10px',
                      fontSize: '0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    <UserIcon size={15} /> Student Profile
                  </Link>

                  <Link
                    to="/dashboard"
                    onClick={() => setUserDropdownOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 10px',
                      fontSize: '0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    <LayoutDashboard size={15} /> Learning Dashboard
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 10px',
                      fontSize: '0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--accent-rose)',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <LogOut size={15} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Link to="/login" className="btn btn-secondary btn-sm">
                Sign In
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Enroll Free
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn-icon mobile-menu-btn"
            style={{ display: 'none' }}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-medium)',
          padding: '16px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          <form onSubmit={handleSearchSubmit}>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '11px', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search masterclasses..."
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
                className="input"
                style={{ paddingLeft: '36px' }}
              />
            </div>
          </form>

          <Link
            to="/courses"
            onClick={() => setMobileMenuOpen(false)}
            style={{ padding: '8px 0', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Compass size={17} /> Explore Library
          </Link>

          <Link
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            style={{ padding: '8px 0', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <LayoutDashboard size={17} /> Learning Dashboard
          </Link>

          {isAuthenticated ? (
            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              style={{ padding: '8px 0', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <UserIcon size={17} /> My Profile ({user.name})
            </Link>
          ) : (
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn btn-secondary" style={{ flex: 1 }}>
                Sign In
              </Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary" style={{ flex: 1 }}>
                Enroll Free
              </Link>
            </div>
          )}
        </div>
      )}

      <style>{`
        @media (min-width: 860px) {
          .desktop-search { display: flex !important; }
          .desktop-nav { display: flex !important; }
        }
        @media (max-width: 859px) {
          .mobile-menu-btn { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}
