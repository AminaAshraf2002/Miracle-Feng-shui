'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@300;400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    try {
      const auth = localStorage.getItem('mfs_admin_auth');
      if (auth === 'true' && !window.location.search.includes('callbackUrl')) {
        window.location.href = '/admin';
      }
    } catch { /* ignore */ }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const rawEmail = email.trim().toLowerCase();
    const cleanEmail = rawEmail === 'admin' ? 'admin@miraclefengshui.com' : rawEmail;
    const cleanPass = password.trim();

    try {
      const res = await signIn('credentials', {
        email: cleanEmail,
        password: cleanPass,
        redirect: false,
      });

      if (res?.error || !res?.ok) {
        localStorage.removeItem('mfs_admin_auth');
        localStorage.removeItem('mfs_admin_user');
        document.cookie = 'mfs_admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
        setError('Invalid credentials. Use admin@miraclefengshui.com · admin');
        setLoading(false);
      } else {
        localStorage.setItem('mfs_admin_auth', 'true');
        localStorage.setItem('mfs_admin_user', cleanEmail);
        document.cookie = 'mfs_admin_auth=true; path=/; max-age=2592000; SameSite=Lax';

        let target = '/admin';
        if (typeof window !== 'undefined') {
          const params = new URLSearchParams(window.location.search);
          const cb = params.get('callbackUrl');
          if (cb && !cb.includes('/admin/login')) target = cb;
        }
        window.location.href = target;
      }
    } catch {
      localStorage.removeItem('mfs_admin_auth');
      localStorage.removeItem('mfs_admin_user');
      document.cookie = 'mfs_admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
      setError('An error occurred during sign in');
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@miraclefengshui.com');
    setPassword('admin');
    setError('');
  };

  const montserrat = "'Montserrat', sans-serif";
  const bebas = "'Bebas Neue', cursive, sans-serif";

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#EFEFEF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.5rem',
        fontFamily: montserrat,
      }}
    >
      {/* Card wrapper */}
      <div
        style={{
          width: '100%',
          maxWidth: '960px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          borderRadius: '20px',
          overflow: 'hidden',
          background: '#ffffff',
          boxShadow: '0 8px 48px rgba(0,0,0,0.10)',
        }}
      >

        {/* ── LEFT: White Form Panel ── */}
        <div
          style={{
            background: '#ffffff',
            padding: '1.5rem 2.5rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 0,
          }}
        >
          {/* Brand logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.2rem' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', overflow: 'hidden', border: '1px solid #e5e5e5', flexShrink: 0 }}>
              <img src="/images/miracle.jpeg" alt="Miracle Feng Shui" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <span style={{ fontFamily: montserrat, fontWeight: 700, fontSize: '0.82rem', color: '#111', letterSpacing: '0.01em' }}>
              Miracle Feng Shui
            </span>
          </Link>

          {/* Heading */}
          <h1
            style={{
              fontFamily: bebas,
              fontSize: '2.8rem',
              color: '#111111',
              fontWeight: 400,
              letterSpacing: '0.04em',
              lineHeight: 1.05,
              margin: '0 0 0.25rem',
            }}
          >
            Admin Sign In
          </h1>
          <p style={{ fontFamily: montserrat, fontSize: '0.78rem', color: '#888', fontWeight: 400, margin: '0 0 1rem' }}>
            Access your store dashboard &amp; management tools
          </p>

          {/* Error */}
          {error && (
            <div
              style={{
                background: '#fff5f5',
                border: '1px solid #fecaca',
                color: '#dc2626',
                padding: '0.65rem 1rem',
                borderRadius: '10px',
                fontSize: '0.75rem',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1.25rem',
                fontFamily: montserrat,
              }}
            >
              <i className="fa-solid fa-circle-exclamation" style={{ flexShrink: 0 }} />
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>

            {/* Email */}
            <div>
              <label style={{ display: 'block', fontFamily: montserrat, fontSize: '0.75rem', fontWeight: 600, color: '#222', marginBottom: '0.4rem' }}>
                Email<span style={{ color: '#dc2626' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  required
                  placeholder="admin@miraclefengshui.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#F8F8F8',
                    border: '1.5px solid #E8E8E8',
                    borderRadius: '10px',
                    padding: '0.72rem 2.5rem 0.72rem 1rem',
                    fontSize: '0.83rem',
                    color: '#111',
                    fontFamily: montserrat,
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s, background 0.2s',
                  }}
                  onFocus={e => { e.target.style.borderColor = '#111'; e.target.style.background = '#fff'; }}
                  onBlur={e => { e.target.style.borderColor = '#E8E8E8'; e.target.style.background = '#F8F8F8'; }}
                />
                <i className="fa-regular fa-envelope" style={{ position: 'absolute', right: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: '#bbb', fontSize: '0.75rem', pointerEvents: 'none' }} />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{ display: 'block', fontFamily: montserrat, fontSize: '0.75rem', fontWeight: 600, color: '#222', marginBottom: '0.4rem' }}>
                Password<span style={{ color: '#dc2626' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#F8F8F8',
                    border: '1.5px solid #E8E8E8',
                    borderRadius: '10px',
                    padding: '0.72rem 2.5rem 0.72rem 1rem',
                    fontSize: '0.83rem',
                    color: '#111',
                    fontFamily: montserrat,
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s, background 0.2s',
                  }}
                  onFocus={e => { e.target.style.borderColor = '#111'; e.target.style.background = '#fff'; }}
                  onBlur={e => { e.target.style.borderColor = '#E8E8E8'; e.target.style.background = '#F8F8F8'; }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#bbb', cursor: 'pointer', padding: '0.25rem', fontSize: '0.75rem' }}
                  aria-label={showPassword ? 'Hide' : 'Show'}
                >
                  <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
                </button>
              </div>
            </div>

            {/* Sign In button — black pill like reference */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                background: loading ? '#444' : '#111111',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                padding: '0.9rem 1.5rem',
                fontSize: '0.82rem',
                fontFamily: montserrat,
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                cursor: loading ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginTop: '0.1rem',
                transition: 'background 0.2s',
                opacity: loading ? 0.7 : 1,
              }}
              onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = '#333'; }}
              onMouseLeave={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = '#111111'; }}
            >
              {loading ? (
                <><i className="fa-solid fa-circle-notch fa-spin" /><span>Signing in...</span></>
              ) : (
                <><span>Sign In</span><i className="fa-solid fa-arrow-right" style={{ fontSize: '0.7rem' }} /></>
              )}
            </button>
          </form>

          {/* Demo box */}
          <div
            style={{
              marginTop: '1rem',
              background: '#F8F8F8',
              border: '1.5px solid #E8E8E8',
              borderRadius: '10px',
              padding: '0.75rem 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.75rem',
            }}
          >
            <div>
              <span style={{ fontFamily: montserrat, fontWeight: 600, fontSize: '0.72rem', color: '#111', display: 'block', marginBottom: '0.15rem' }}>
                Demo credentials
              </span>
              <span style={{ fontFamily: montserrat, fontSize: '0.68rem', color: '#999' }}>
                admin@miraclefengshui.com · admin
              </span>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              style={{
                background: '#fff',
                border: '1.5px solid #ddd',
                borderRadius: '8px',
                padding: '0.38rem 0.8rem',
                fontFamily: montserrat,
                fontWeight: 600,
                fontSize: '0.68rem',
                color: '#555',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#111'; (e.currentTarget as HTMLButtonElement).style.color = '#111'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#ddd'; (e.currentTarget as HTMLButtonElement).style.color = '#555'; }}
            >
              Auto-fill
            </button>
          </div>

          {/* Back link */}
          <div style={{ marginTop: '1.5rem' }}>
            <Link
              href="/"
              style={{ fontFamily: montserrat, fontSize: '0.75rem', fontWeight: 500, color: '#aaa', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#111')}
              onMouseLeave={e => (e.currentTarget.style.color = '#aaa')}
            >
              <i className="fa-solid fa-arrow-left" style={{ fontSize: '0.65rem' }} />
              Back to store
            </Link>
          </div>
        </div>

        {/* ── RIGHT: Image Panel ── */}
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            minHeight: '360px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            borderRadius: '0 20px 20px 0',
          }}
        >
          {/* Image */}
          <img
            src="https://images.squarespace-cdn.com/content/v1/6465e9f0c32fb30720d59d36/1724123773365-097MNMLASST7ODU3GX9L/feng-shui-front-door-mirror-tips.jpg"
            alt="Feng Shui sanctuary"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          {/* Gradient overlay — dark at bottom like reference */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.05) 100%)',
            }}
          />

          {/* Bottom content */}
          <div style={{ position: 'relative', zIndex: 2, padding: '2rem 2rem 2.25rem' }}>
            <h2
              style={{
                fontFamily: bebas,
                fontSize: '2.4rem',
                color: '#ffffff',
                fontWeight: 400,
                letterSpacing: '0.04em',
                lineHeight: 1.1,
                margin: '0 0 0.6rem',
              }}
            >
              Your Admin<br />Sanctuary Awaits
            </h2>
            <p
              style={{
                fontFamily: montserrat,
                fontSize: '0.76rem',
                color: 'rgba(255,255,255,0.65)',
                fontWeight: 400,
                lineHeight: 1.7,
                margin: '0 0 1.25rem',
                maxWidth: '260px',
              }}
            >
              Manage products, harmonize your catalog, and oversee fulfillment in one clean workspace.
            </p>

            {/* Pill badges — like reference */}
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              {[
                { icon: 'fa-circle-check', label: 'Products & Orders' },
                { icon: 'fa-layer-group', label: 'Layout Manager' },
              ].map(badge => (
                <div
                  key={badge.label}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    background: 'rgba(0,0,0,0.4)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    borderRadius: '999px',
                    padding: '0.4rem 0.9rem',
                    fontFamily: montserrat,
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.75)',
                    letterSpacing: '0.02em',
                  }}
                >
                  <i className={`fa-solid ${badge.icon}`} style={{ fontSize: '0.6rem' }} />
                  {badge.label}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
