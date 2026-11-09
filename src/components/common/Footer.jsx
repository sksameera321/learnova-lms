import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Shield, Cpu, BookOpen, Terminal, Sparkles, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-subtle)',
      paddingTop: '4rem',
      paddingBottom: '2.5rem',
      marginTop: 'auto',
      position: 'relative'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '3rem',
          marginBottom: '3.5rem'
        }}>
          
          {/* Brand Vision Column */}
          <div style={{ maxWidth: '340px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'var(--grad-brand)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Cpu size={18} color="#ffffff" />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800 }}>
                LEARN<span style={{ color: 'var(--accent-cyan)' }}>OVA</span>
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              The vanguard learning ecosystem for modern software architecture, agentic artificial intelligence, distributed consensus, and creative computing.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <span className="badge badge-brand" style={{ fontSize: '0.7rem' }}>
                <Shield size={12} /> SOC2 Compliant
              </span>
              <span className="badge badge-beginner" style={{ fontSize: '0.7rem' }}>
                <Award size={12} /> Verifiable Creds
              </span>
            </div>
          </div>

          {/* Curriculum Tracks */}
          <div>
            <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-primary)', marginBottom: '1.2rem' }}>
              Deep Engineering Tracks
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
              <li>
                <Link to="/courses?category=Artificial+Intelligence" style={{ color: 'var(--text-secondary)', transition: 'color var(--trans-fast)' }}>
                  Autonomous Agents & Generative AI
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Distributed+Systems" style={{ color: 'var(--text-secondary)' }}>
                  Distributed Systems & Raft Consensus
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Full-Stack+Architecture" style={{ color: 'var(--text-secondary)' }}>
                  React 19 & Full-Stack Systems
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Cybersecurity" style={{ color: 'var(--text-secondary)' }}>
                  Zero-Trust Defensive Protocols
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Quantum+Computing" style={{ color: 'var(--text-secondary)' }}>
                  Quantum Circuits & Qiskit Algorithms
                </Link>
              </li>
            </ul>
          </div>

          {/* Student Ecosystem */}
          <div>
            <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-primary)', marginBottom: '1.2rem' }}>
              Student Platform
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
              <li>
                <Link to="/dashboard" style={{ color: 'var(--text-secondary)' }}>
                  Personal Learning Dashboard
                </Link>
              </li>
              <li>
                <Link to="/courses" style={{ color: 'var(--text-secondary)' }}>
                  Interactive Course Explorer
                </Link>
              </li>
              <li>
                <Link to="/dashboard" style={{ color: 'var(--text-secondary)' }}>
                  Certificates & Verification
                </Link>
              </li>
              <li>
                <Link to="/profile" style={{ color: 'var(--text-secondary)' }}>
                  Student Credentials & XP
                </Link>
              </li>
            </ul>
          </div>

          {/* Developer Attribution & Spec */}
          <div>
            <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-primary)', marginBottom: '1.2rem' }}>
              Architect Profile
            </h4>
            <div style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
                <Terminal size={16} style={{ color: 'var(--accent-cyan)' }} />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Sameera Bhanu
                </span>
              </div>
              <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                1st Year B.Tech CSE • Shri Vishnu Engineering College for Women (SVECW), Bhimavaram.
              </p>
              <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--accent-indigo)', fontWeight: 600 }}>
                PROJECT ASSIGNMENT 05 // LMS
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '1.75rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            © 2026 LEARNOVA LMS. Designed for forward-thinking engineers and researchers.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            Built with React 19, Context API & LocalStorage Telemetry
          </div>
        </div>

      </div>
    </footer>
  );
}
