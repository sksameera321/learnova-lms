import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Search, 
  Sparkles, 
  Zap, 
  Terminal, 
  Layers, 
  ShieldCheck, 
  PlayCircle, 
  Star, 
  Award, 
  Users, 
  Cpu, 
  BookOpen, 
  CheckCircle,
  Clock
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
      
      {/* HERO SECTION */}
      <section className="section" style={{ paddingTop: '5.5rem', paddingBottom: '4.5rem', textAlign: 'center', position: 'relative' }}>
        <div className="container" style={{ maxWidth: '980px' }}>
          
          {/* Eyebrow Pill */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
            <span className="badge badge-brand" style={{ padding: '6px 14px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={14} className="animate-pulse-glow" />
              <span>THE NEXT-GEN ENGINEERING ACADEMY</span>
            </span>
          </div>

          {/* Master Headline */}
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
            fontWeight: 800,
            lineHeight: 1.12,
            letterSpacing: '-0.03em',
            marginBottom: '1.5rem',
            color: 'var(--text-primary)'
          }}>
            Master Deep Engineering & <span className="text-gradient">Autonomous Systems</span>
          </h1>

          {/* Subheading */}
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'var(--text-secondary)',
            maxWidth: '720px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.6
          }}>
            Explore production-grade curricula in Autonomous AI Agents, Distributed Consensus, React 19 Architectures, and Zero-Trust Cyber Defense with interactive code environments and verifiable credentials.
          </p>

          {/* Interactive Search Bar */}
          <form onSubmit={handleHeroSearch} style={{
            maxWidth: '620px',
            margin: '0 auto 2.5rem',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--bg-card)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-full)',
            padding: '6px 8px 6px 20px',
            boxShadow: 'var(--shadow-lg), 0 0 25px rgba(99, 102, 241, 0.2)'
          }}>
            <Search size={20} style={{ color: 'var(--text-muted)', marginRight: '10px', flexShrink: 0 }} />
            <input
              type="text"
              placeholder="What do you want to master? (e.g. Raft, LangGraph, WebSockets)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                color: 'var(--text-primary)',
                fontSize: '0.975rem',
                outline: 'none',
                fontFamily: 'var(--font-sans)'
              }}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '0.65rem 1.4rem' }}>
              <span>Search</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Primary CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', marginBottom: '3.5rem' }}>
            <Link to="/courses" className="btn btn-primary btn-lg">
              <Zap size={18} />
              <span>Explore All Courses</span>
            </Link>
            <Link to="/dashboard" className="btn btn-secondary btn-lg">
              <Terminal size={18} />
              <span>Open Student Dashboard</span>
            </Link>
          </div>

          {/* Live Telemetry / Platform Stats Bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            {PLATFORM_STATS.map((stat, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.75rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em'
                }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '2px' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* POPULAR CATEGORIES BENTO */}
      <section className="section" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="badge badge-brand" style={{ marginBottom: '0.5rem' }}>CURRICULUM DISCIPLINES</span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Explore Elite Engineering Tracks</h2>
            </div>
            <Link to="/courses" style={{ color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>View full catalog</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem'
          }}>
            {[
              { title: 'Artificial Intelligence & Agents', cat: 'Artificial Intelligence', count: '16 Lessons', icon: Cpu, desc: 'Multi-agent coordination, LangGraph, tool calling, and RAG architectures.' },
              { title: 'Distributed Systems', cat: 'Distributed Systems', count: '20 Lessons', icon: Layers, desc: 'Raft consensus, vector clocks, Byzantine fault tolerance, and message brokers.' },
              { title: 'Full-Stack & React 19', cat: 'Full-Stack Architecture', count: '24 Lessons', icon: Terminal, desc: 'Server Actions, useOptimistic, real-time WebSockets, and state persistence.' },
              { title: 'Cybersecurity & Zero Trust', cat: 'Cybersecurity', count: '14 Lessons', icon: ShieldCheck, desc: 'Offensive penetration testing, OWASP Top 10, mTLS, and defense protocols.' },
              { title: 'UI/UX & Creative WebGL', cat: 'UI/UX & Creative Tech', count: '18 Lessons', icon: Sparkles, desc: 'Skeuomorphic materials, GLSL shaders, spring physics, and token systems.' },
              { title: 'Quantum Computing', cat: 'Quantum Computing', count: '12 Lessons', icon: BookOpen, desc: 'Qubits, Bloch spheres, Bell state entanglement, and Qiskit circuits.' }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  to={`/courses?category=${encodeURIComponent(item.cat)}`}
                  className="card card-interactive"
                  style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem' }}
                >
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'var(--grad-brand)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                    color: '#ffffff'
                  }}>
                    <Icon size={22} />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem', flex: 1 }}>
                    {item.desc}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-cyan)' }}>
                    <span>{item.count}</span>
                    <ArrowRight size={14} />
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* FEATURED FLAGSHIP MASTERCLASSES */}
      <section className="section">
        <div className="container">
          
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
            <span className="badge badge-brand" style={{ marginBottom: '0.5rem' }}>CURATED RIGOR</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Flagship Engineering Masterclasses
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
              Step into comprehensive courses designed in collaboration with leading architects from DeepMind, Stripe, and AWS.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '1.75rem'
          }}>
            {featuredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/courses" className="btn btn-secondary btn-lg">
              <span>View All 6 Specialized Tracks</span>
              <ArrowRight size={18} />
            </Link>
          </div>

        </div>
      </section>

      {/* WHY LEARNOVA - PLATFORM ARCHITECTURE */}
      <section className="section" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3.5rem' }}>
            <span className="badge badge-brand" style={{ marginBottom: '0.5rem' }}>PEDAGOGY BY DESIGN</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Engineered for Deep Retention
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              We rejected passive slide-decks in favor of an active, tactile learning workstation.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {[
              {
                title: 'Distraction-Free Video Theatre',
                desc: 'Custom player with variable playback speeds, theatre mode, and crystal audio clarity so you stay focused in the flow state.',
                icon: PlayCircle
              },
              {
                title: 'Persistent Lesson Scratchpad',
                desc: 'Dedicated student notes auto-save to LocalStorage per lesson, ensuring your personal study logs survive browser refreshes.',
                icon: Terminal
              },
              {
                title: 'Rigorous Concept Quizzes',
                desc: 'Exhaustive multiple-choice tests with real-time scoring, pass/fail rubrics, and detailed pedagogical explanations for every question.',
                icon: CheckCircle
              },
              {
                title: 'Verifiable Mastery Diplomas',
                desc: 'Earn printable, cryptographically identified completion certificates stamped with lead instructor and dean credentials.',
                icon: Award
              }
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="card" style={{ padding: '2rem' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: 'rgba(99, 102, 241, 0.15)',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-cyan)',
                    marginBottom: '1.25rem'
                  }}>
                    <Icon size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.6rem' }}>
                    {feature.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* STUDENT TESTIMONIALS */}
      <section className="section">
        <div className="container">
          
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem' }}>
            <span className="badge badge-brand" style={{ marginBottom: '0.5rem' }}>COMMUNITY VERIFICATION</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Trusted by Engineers Worldwide
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              See how engineers apply LEARNOVA masterclasses to ship resilient systems in production.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {TESTIMONIALS.map(t => (
              <div key={t.id} className="card" style={{ display: 'flex', flexDirection: 'column', padding: '1.75rem' }}>
                <div style={{ display: 'flex', gap: '3px', marginBottom: '1rem', color: '#facc15' }}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={15} fill="#facc15" />
                  ))}
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '1.5rem', flex: 1 }}>
                  "{t.quote}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
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

      {/* HIGH-IMPACT CTA */}
      <section className="section" style={{ paddingBottom: '6rem' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(99, 102, 241, 0.25) 50%, rgba(168, 85, 247, 0.15) 100%)',
            border: '1px solid var(--border-accent)',
            borderRadius: 'var(--radius-lg)',
            padding: '4rem 2rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, marginBottom: '1rem' }}>
              Begin Your Quantum Engineering Journey
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2rem' }}>
              Join thousands of engineers and students mastering autonomous agents, distributed databases, and high-performance frontend systems.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
              <Link to="/courses" className="btn btn-primary btn-lg">
                <span>Browse All Courses</span>
                <ArrowRight size={18} />
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
