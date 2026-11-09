import React from 'react';
import { X, Printer, Award, ShieldCheck, Download } from 'lucide-react';
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
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      overflowY: 'auto'
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '850px',
        backgroundColor: '#0c101a',
        border: '2px solid rgba(250, 204, 21, 0.4)',
        borderRadius: '16px',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(234, 179, 8, 0.2)',
        padding: '2.5rem',
        color: '#f8fafc',
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(234, 179, 8, 0.05) 0%, transparent 70%)'
      }} className="printable-certificate">

        {/* Action Controls Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }} className="no-print">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={20} style={{ color: '#facc15' }} />
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#facc15', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Official Verifiable Credential
            </span>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handlePrint} className="btn btn-primary btn-sm" style={{ background: 'linear-gradient(135deg, #eab308, #ca8a04)' }}>
              <Printer size={15} /> Print / Save as PDF
            </button>
            <button onClick={onClose} className="btn-icon" aria-label="Close Certificate">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Certificate Decorative Border Frame */}
        <div style={{
          border: '1px solid rgba(250, 204, 21, 0.3)',
          borderRadius: '12px',
          padding: '2.5rem 2rem',
          textAlign: 'center',
          position: 'relative'
        }}>
          {/* Top Emblem */}
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #eab308, #a16207)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            boxShadow: '0 0 24px rgba(234, 179, 8, 0.4)'
          }}>
            <Award size={34} color="#0c101a" />
          </div>

          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.75rem',
            fontWeight: 800,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#facc15',
            marginBottom: '0.25rem'
          }}>
            LEARNOVA ACADEMY OF ADVANCED COMPUTING
          </div>

          <div style={{ fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
            Certificate of Engineering Mastery
          </div>

          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            This hereby verifies that
          </p>

          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2.2rem',
            fontWeight: 800,
            color: '#ffffff',
            textDecoration: 'underline',
            textDecorationColor: 'rgba(250, 204, 21, 0.5)',
            textUnderlineOffset: '8px',
            marginBottom: '1.25rem'
          }}>
            {user?.name || 'Sameera Bhanu'}
          </div>

          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '620px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
            has successfully demonstrated deep technical proficiency, architectural comprehension, and verified module milestones in
          </p>

          <div style={{
            fontSize: '1.35rem',
            fontWeight: 700,
            color: 'var(--accent-cyan)',
            marginBottom: '2rem'
          }}>
            {course.title}
          </div>

          {/* Signatures & Verification Details */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '1.75rem',
            marginTop: '2rem',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontFamily: 'Brush Script MT, cursive', fontSize: '1.5rem', color: '#facc15', minHeight: '36px' }}>
                {course.instructor.name}
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>{course.instructor.name}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Lead Instructor</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={28} style={{ color: '#10b981', marginBottom: '4px' }} />
              <div style={{ fontSize: '0.725rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>ID: {certId}</div>
              <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>Issued: {issueDate}</div>
            </div>

            <div>
              <div style={{ fontFamily: 'Brush Script MT, cursive', fontSize: '1.5rem', color: '#facc15', minHeight: '36px' }}>
                Dr. Alistair Vance
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>Dr. Alistair Vance</div>
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
