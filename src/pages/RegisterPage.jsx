import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Building, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [institution, setInstitution] = useState('');
  const [errors, setErrors] = useState({});

  const { register } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!name.trim()) newErrors.name = 'Full name is required.';
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
      register({ name, email, password, institution });
      addToast('Welcome to LEARNOVA! Profile created.', 'success');
      navigate('/dashboard');
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  return (
    <div className="section animate-fade-in" style={{ paddingTop: '5rem', paddingBottom: '7rem' }}>
      <div className="container" style={{ maxWidth: '480px' }}>
        
        <div className="card" style={{ padding: '2.5rem 2rem' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '10px',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
              color: 'var(--accent-bronze)'
            }}>
              <User size={22} />
            </div>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 600 }}>Create Scholar Account</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '4px' }}>
              Begin your study with access to all engineering masterclasses
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: '12px', top: '13px', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="e.g. Sameera Bhanu"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input"
                  style={{ paddingLeft: '38px', borderColor: errors.name ? 'var(--accent-rose)' : undefined }}
                />
              </div>
              {errors.name && <div style={{ fontSize: '0.75rem', color: 'var(--accent-rose)', marginTop: '2px' }}>{errors.name}</div>}
            </div>

            <div className="input-group">
              <label className="input-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '12px', top: '13px', color: 'var(--text-muted)' }} />
                <input
                  type="email"
                  placeholder="scholar@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  style={{ paddingLeft: '38px', borderColor: errors.email ? 'var(--accent-rose)' : undefined }}
                />
              </div>
              {errors.email && <div style={{ fontSize: '0.75rem', color: 'var(--accent-rose)', marginTop: '2px' }}>{errors.email}</div>}
            </div>

            <div className="input-group">
              <label className="input-label">University / Organization (Optional)</label>
              <div style={{ position: 'relative' }}>
                <Building size={16} style={{ position: 'absolute', left: '12px', top: '13px', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="e.g. SVECW Bhimavaram"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="input"
                  style={{ paddingLeft: '38px' }}
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Password (Min. 6 characters)</label>
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
              <span>Complete Registration</span>
              <ArrowRight size={16} />
            </button>

          </form>

          <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Already registered?{' '}
            <Link to="/login" style={{ color: 'var(--accent-bronze)', fontWeight: 600 }}>
              Sign in to portal
            </Link>
          </div>

          <div style={{
            marginTop: '1.5rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border-subtle)',
            fontSize: '0.725rem',
            color: 'var(--text-muted)',
            textAlign: 'center'
          }}>
            <ShieldCheck size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-1px' }} />
            Simulated client-side registration with LocalStorage persistence.
          </div>

        </div>

      </div>
    </div>
  );
}
