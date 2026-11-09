import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Shield, Terminal } from 'lucide-react';

export function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-subtle)',
      paddingTop: '4.5rem',
      paddingBottom: '3rem',
      marginTop: 'auto',
      position: 'relative'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '3rem',
          marginBottom: '4rem'
        }}>
          
          {/* Brand Column */}
          <div style={{ maxWidth: '340px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-bronze)',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontStyle: 'italic',
                fontSize: '1.2rem'
              }}>
                L
              </div>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '1.2rem', fontWeight: 800, letterSpacing: '0.08em' }}>
                LEARNOVA
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.65, color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              The Master Series in computing, distributed systems, autonomous AI, and engineering architecture.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span className="badge badge-brand" style={{ fontSize: '0.7rem' }}>
                <Shield size={12} /> SOC2 Compliant
              </span>
              <span className="badge" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)', fontSize: '0.7rem' }}>
                <Award size={12} /> Verified Diplomas
              </span>
            </div>
          </div>

          {/* Curricula Disciplines */}
          <div>
            <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-bronze)', marginBottom: '1.25rem' }}>
              Curricula Disciplines
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
              <li>
                <Link to="/courses?category=Artificial+Intelligence" style={{ color: 'var(--text-secondary)', transition: 'color var(--trans-fast)' }}>
                  Artificial Intelligence Architecture
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Systems+Architecture" style={{ color: 'var(--text-secondary)' }}>
                  Distributed Systems at Scale
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Full-Stack+Engineering" style={{ color: 'var(--text-secondary)' }}>
                  Modern Full-Stack Engineering (React 19)
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Cybersecurity" style={{ color: 'var(--text-secondary)' }}>
                  Applied Cybersecurity Architecture
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Quantum+Computing" style={{ color: 'var(--text-secondary)' }}>
                  Quantum Computing Foundations
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic Portal */}
          <div>
            <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-bronze)', marginBottom: '1.25rem' }}>
              Student Portal
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
              <li>
                <Link to="/dashboard" style={{ color: 'var(--text-secondary)' }}>
                  Student Learning Dashboard
                </Link>
              </li>
              <li>
                <Link to="/courses" style={{ color: 'var(--text-secondary)' }}>
                  Explore All Masterclasses
                </Link>
              </li>
              <li>
                <Link to="/dashboard" style={{ color: 'var(--text-secondary)' }}>
                  Diplomas & Credentials
                </Link>
              </li>
              <li>
                <Link to="/profile" style={{ color: 'var(--text-secondary)' }}>
                  Scholar Profile & XP
                </Link>
              </li>
            </ul>
          </div>

          {/* Developer Attribution */}
          <div>
            <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-bronze)', marginBottom: '1.25rem' }}>
              Scholar & Architect
            </h4>
            <div style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                <Terminal size={15} style={{ color: 'var(--accent-bronze)' }} />
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Sameera Bhanu
                </span>
              </div>
              <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                1st Year B.Tech CSE • Shri Vishnu Engineering College for Women (SVECW), Bhimavaram.
              </p>
              <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--accent-bronze)', fontWeight: 600 }}>
                PROJECT ASSIGNMENT 05 // LMS
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            © 2026 LEARNOVA LMS. The Master Series in Engineering & Computing.
          </div>
          <div>
            Built with React 19, Context API & LocalStorage Telemetry
          </div>
        </div>

      </div>
    </footer>
  );
}
