import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Search, 
  Play, 
  Star, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { COURSES, CATEGORIES, TESTIMONIALS, PLATFORM_STATS } from '../data/coursesData';
import { CourseCard } from '../components/course/CourseCard';

export function LandingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/courses?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/courses');
    }
  };

  const featuredCourses = COURSES.filter(c => c.featured);

  return (
    <div className="animate-fade-in">
      
      {/* CINEMATIC EDITORIAL HERO SECTION */}
      <section style={{
        position: 'relative',
        paddingTop: '6.5rem',
        paddingBottom: '5.5rem',
        borderBottom: '1px solid var(--border-subtle)',
        backgroundImage: 'radial-gradient(circle at 50% 20%, rgba(197, 160, 89, 0.07) 0%, transparent 65%)'
      }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '920px' }}>
          
          {/* Understated Editorial Header Pill */}
          <div style={{ marginBottom: '1.5rem' }}>
            <span className="badge badge-brand" style={{ letterSpacing: '0.14em', padding: '6px 16px' }}>
              THE MASTER SERIES IN COMPUTING & SYSTEMS
            </span>
          </div>

          {/* Master Headline with Cormorant Garamond Serif */}
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5.2vw, 4.2rem)',
            lineHeight: 1.12,
            marginBottom: '1.5rem',
            color: 'var(--text-primary)'
          }}>
            Learn from the masters of <span className="font-italic text-bronze-foil">deep engineering.</span>
          </h1>

          {/* Subheading */}
          <p style={{
            fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
            color: 'var(--text-secondary)',
            maxWidth: '680px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.6,
            fontWeight: 400
          }}>
            Cinematic masterclasses taught by world-class architects from DeepMind, AWS, and Stripe. Master distributed consensus, autonomous AI, and modern systems architecture.
          </p>

          {/* Clean Search Input */}
          <form onSubmit={handleHeroSearch} style={{
            maxWidth: '560px',
            margin: '0 auto 2.5rem',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-full)',
            padding: '6px 8px 6px 20px',
            boxShadow: 'var(--shadow-md)'
          }}>
            <Search size={18} style={{ color: 'var(--text-muted)', marginRight: '10px', flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search by topic, instructor, or protocol..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                color: 'var(--text-primary)',
                fontSize: '0.925rem',
                outline: 'none',
                fontFamily: 'var(--font-sans)'
              }}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '0.6rem 1.4rem' }}>
              <span>Search</span>
              <ArrowRight size={15} />
            </button>
          </form>

          {/* Primary Action Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', marginBottom: '4rem' }}>
            <Link to="/courses" className="btn btn-primary btn-lg">
              <span>Explore All Masterclasses</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/dashboard" className="btn btn-secondary btn-lg">
              <span>Open Student Dashboard</span>
            </Link>
          </div>

          {/* Understated Stats Banner */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1.5rem',
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '2.5rem'
          }}>
            {PLATFORM_STATS.map((stat, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.85rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)'
                }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '2px' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FEATURED CINEMATIC MASTERCLASSES */}
      <section className="section">
        <div className="container">
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="badge badge-brand" style={{ marginBottom: '0.5rem' }}>FEATURED CURRICULA</span>
              <h2 style={{ fontSize: '2.4rem', fontWeight: 600 }}>The Flagship Series</h2>
            </div>
            <Link to="/courses" style={{ color: 'var(--accent-bronze)', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>Browse full library</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2rem'
          }}>
            {featuredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

        </div>
      </section>

      {/* CURRICULUM DISCIPLINES */}
      <section className="section" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem' }}>
            <span className="badge badge-brand" style={{ marginBottom: '0.5rem' }}>DISCIPLINES</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 600, marginBottom: '0.75rem' }}>
              Specialized Engineering Fields
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Curated masterclasses taught with mathematical rigor and real production experience.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {[
              { title: 'Systems Architecture', count: '20 Lessons', desc: 'Raft consensus, vector clocks, partition tolerance, and message brokers.' },
              { title: 'Artificial Intelligence', count: '16 Lessons', desc: 'Multi-agent swarms, structured tool calling, and high-recall RAG pipelines.' },
              { title: 'Full-Stack Engineering', count: '24 Lessons', desc: 'React 19 Server Actions, useOptimistic, and resilient WebSockets.' },
              { title: 'Applied Cybersecurity', count: '14 Lessons', desc: 'Zero-Trust network segmentation, OWASP vulnerability exploitation, and mTLS.' },
              { title: 'Product Design & WebGL', count: '18 Lessons', desc: 'Tokenized design systems, GLSL shaders, and spring physics micro-interactions.' },
              { title: 'Quantum Computing', count: '12 Lessons', desc: 'Superposition, entanglement, Bloch spheres, and Qiskit circuits.' }
            ].map((disc, idx) => (
              <Link
                key={idx}
                to={`/courses?category=${encodeURIComponent(disc.title === 'Full-Stack Engineering' ? 'Full-Stack Engineering' : disc.title)}`}
                className="card card-interactive"
                style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-bronze)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  {disc.count}
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                  {disc.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, flex: 1 }}>
                  {disc.desc}
                </p>
                <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-bronze)' }}>
                  <span>View courses</span>
                  <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* FACULTY OF MASTERS */}
      <section className="section">
        <div className="container">
          
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem' }}>
            <span className="badge badge-brand" style={{ marginBottom: '0.5rem' }}>THE FACULTY</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 600, marginBottom: '0.75rem' }}>
              Learn from Renowned Practitioners
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Our faculty members build and maintain infrastructure serving millions of global users.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem'
          }}>
            {[
              {
                name: 'Elena Rostova',
                role: 'Principal Infrastructure Architect',
                org: 'Ex-AWS DynamoDB Team',
                avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
                course: 'Distributed Systems at Scale'
              },
              {
                name: 'Dr. Aris Thorne',
                role: 'Principal Research Architect',
                org: 'Ex-DeepMind',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
                course: 'Artificial Intelligence Architecture'
              },
              {
                name: 'Marcus Vance',
                role: 'Staff Frontend Architect',
                org: 'Ex-Stripe UI Team',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
                course: 'Modern Full-Stack Engineering'
              },
              {
                name: 'Sarah Chen, CISSP',
                role: 'Red Team Operations Lead',
                org: 'Aegis Threat Intelligence',
                avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
                course: 'Applied Cybersecurity'
              }
            ].map((fac, idx) => (
              <div key={idx} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ height: '240px', position: 'relative' }}>
                  <img
                    src={fac.avatar}
                    alt={fac.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(11, 11, 14, 0.95) 0%, rgba(11, 11, 14, 0.2) 60%, transparent 100%)'
                  }} />
                  <div style={{ position: 'absolute', bottom: '12px', left: '16px', right: '16px' }}>
                    <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff' }}>{fac.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-bronze)' }}>{fac.role}</div>
                  </div>
                </div>
                <div style={{ padding: '1.25rem', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                  <div>Teaching: <strong style={{ color: 'var(--text-primary)' }}>{fac.course}</strong></div>
                  <div style={{ marginTop: '2px' }}>{fac.org}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* STUDENT TESTIMONIALS */}
      <section className="section" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem' }}>
            <span className="badge badge-brand" style={{ marginBottom: '0.5rem' }}>TESTIMONIALS</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 600, marginBottom: '0.75rem' }}>
              Reflections from the Community
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {TESTIMONIALS.map(t => (
              <div key={t.id} className="card" style={{ display: 'flex', flexDirection: 'column', padding: '2rem' }}>
                <div style={{ display: 'flex', gap: '3px', marginBottom: '1.25rem', color: 'var(--accent-bronze)' }}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="#c5a059" stroke="none" />
                  ))}
                </div>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.15rem',
                  color: 'var(--text-primary)',
                  lineHeight: 1.55,
                  fontStyle: 'italic',
                  marginBottom: '1.75rem',
                  flex: 1
                }}>
                  "{t.quote}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
                  <img
                    src={t.avatar}
                    alt={t.name}
                    style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {t.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FINAL INVITATION */}
      <section className="section" style={{ paddingBottom: '6rem' }}>
        <div className="container">
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-accent)',
            borderRadius: 'var(--radius-lg)',
            padding: '4.5rem 2rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', fontWeight: 600, marginBottom: '1rem' }}>
              Begin Your Journey in <span className="font-italic text-bronze-foil">Mastery</span>
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '560px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
              Join thousands of engineers and scholars advancing their craft with the LEARNOVA masterclass library.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
              <Link to="/courses" className="btn btn-primary btn-lg">
                <span>Browse All Masterclasses</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/register" className="btn btn-secondary btn-lg">
                <span>Create Student Account</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
