import React from 'react';
import { X, Printer, Award, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function CertificateModal({ course, onClose }) {
  const { user } = useAuth();
  const certId = `LEARNOVA-${course.id.toUpperCase().slice(0, 6)}-${Math.floor(100000 + Math.random() * 900000)}`;
  const issueDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      backgroundColor: 'rgba(0, 0, 0, 0.88)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      overflowY: 'auto'
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '860px',
        backgroundColor: '#0e0e12',
        border: '1.5px solid var(--border-accent)',
        borderRadius: '16px',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), var(--shadow-bronze)',
        padding: '2.5rem',
        color: '#f8f6f0'
      }} className="printable-certificate">

        {/* Action Controls Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }} className="no-print">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={18} style={{ color: 'var(--accent-bronze)' }} />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-bronze)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              Official Verifiable Diploma
            </span>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handlePrint} className="btn btn-primary btn-sm">
              <Printer size={14} /> Print / Save PDF
            </button>
            <button onClick={onClose} className="btn-icon" aria-label="Close Diploma">
              <X size={17} />
            </button>
          </div>
        </div>

        {/* Diploma Framing */}
        <div style={{
          border: '1px solid rgba(197, 160, 89, 0.35)',
          borderRadius: '12px',
          padding: '3rem 2.5rem',
          textAlign: 'center',
          position: 'relative',
          backgroundColor: '#0a0a0d'
        }}>
          {/* Top Gold Crest */}
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'var(--grad-bronze)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            color: '#0b0b0e',
            boxShadow: '0 0 20px rgba(197, 160, 89, 0.3)'
          }}>
            <Award size={32} />
          </div>

          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.8rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--accent-bronze)',
            marginBottom: '0.35rem'
          }}>
            LEARNOVA ACADEMY OF ADVANCED COMPUTING
          </div>

          <div style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Diploma of Engineering Mastery
          </div>

          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '0.6rem' }}>
            This hereby confers upon
          </p>

          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2.5rem',
            fontWeight: 700,
            color: '#ffffff',
            textDecoration: 'underline',
            textDecorationColor: 'rgba(197, 160, 89, 0.4)',
            textUnderlineOffset: '8px',
            marginBottom: '1.5rem'
          }}>
            {user?.name || 'Sameera Bhanu'}
          </div>

          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '620px', margin: '0 auto 1.5rem', lineHeight: 1.65 }}>
            official verification for successfully demonstrating architectural comprehension, practical implementation milestones, and examination proficiency in
          </p>

          <div style={{
            fontSize: '1.45rem',
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            color: 'var(--accent-bronze)',
            marginBottom: '2.5rem'
          }}>
            {course.title}
          </div>

          {/* Signatures */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '2rem',
            marginTop: '2rem',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontFamily: 'Brush Script MT, cursive', fontSize: '1.6rem', color: 'var(--accent-bronze)', minHeight: '36px' }}>
                {course.instructor.name}
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>{course.instructor.name}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Lead Masterclass Instructor</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={26} style={{ color: 'var(--accent-emerald)', marginBottom: '4px' }} />
              <div style={{ fontSize: '0.725rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>ID: {certId}</div>
              <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>Verified: {issueDate}</div>
            </div>

            <div>
              <div style={{ fontFamily: 'Brush Script MT, cursive', fontSize: '1.6rem', color: 'var(--accent-bronze)', minHeight: '36px' }}>
                Dr. Alistair Vance
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>Dr. Alistair Vance</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Dean of Academic Engineering</div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .printable-certificate, .printable-certificate * {
            visibility: visible;
          }
          .printable-certificate {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background-color: #ffffff !important;
            color: #000000 !important;
            border-color: #000000 !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
