import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { login, defaultUserCredentials } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleFillDemo = () => {
    setEmail(defaultUserCredentials.email);
    setPassword(defaultUserCredentials.password);
    setErrors({});
    addToast('Demo student credentials preloaded!', 'info');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please provide a valid email format.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      login(email, password);
      addToast('Welcome to LEARNOVA Academy!', 'success');
      navigate('/dashboard');
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  return (
    <div className="section animate-fade-in" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
      <div className="container" style={{ maxWidth: '440px' }}>
        
        <div className="card" style={{ padding: '2.5rem 2rem' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'var(--grad-brand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              color: '#ffffff'
            }}>
              <Lock size={24} />
            </div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Student Portal Sign In</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '4px' }}>
              Access your enrolled curricula and progress
            </p>
          </div>

          {/* Quick Demo Pre-fill Pill */}
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-md)',
            padding: '12px',
            marginBottom: '1.75rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
              Testing the application?
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="btn btn-secondary btn-sm"
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            >
              <Zap size={14} style={{ color: 'var(--accent-amber)' }} />
              <span>Auto-Fill Demo Student (Sameera)</span>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            
            {/* Email Field */}
            <div className="input-group">
              <label className="input-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '12px', top: '13px', color: 'var(--text-muted)' }} />
                <input
                  type="email"
                  placeholder="student@learnova.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  style={{ paddingLeft: '38px', borderColor: errors.email ? 'var(--accent-rose)' : undefined }}
                />
              </div>
              {errors.email && <div style={{ fontSize: '0.75rem', color: 'var(--accent-rose)', marginTop: '2px' }}>{errors.email}</div>}
            </div>

            {/* Password Field */}
            <div className="input-group">
              <label className="input-label">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '12px', top: '13px', color: 'var(--text-muted)' }} />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                  style={{ paddingLeft: '38px', borderColor: errors.password ? 'var(--accent-rose)' : undefined }}
                />
              </div>
              {errors.password && <div style={{ fontSize: '0.75rem', color: 'var(--accent-rose)', marginTop: '2px' }}>{errors.password}</div>}
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '0.85rem' }}>
              <span>Sign In to Classroom</span>
              <ArrowRight size={16} />
            </button>

          </form>

          <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            New to LEARNOVA?{' '}
            <Link to="/register" style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>
              Create an account
            </Link>
          </div>

          {/* Academic Simulation Notice */}
          <div style={{
            marginTop: '1.5rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border-subtle)',
            fontSize: '0.725rem',
            color: 'var(--text-muted)',
            textAlign: 'center',
            lineHeight: 1.4
          }}>
            <ShieldCheck size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-1px' }} />
            Simulated client-side authentication persisted via LocalStorage.
          </div>

        </div>

      </div>
    </div>
  );
}
