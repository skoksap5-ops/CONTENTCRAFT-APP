import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
        alert('Uspešna registracija! Proverite email za verifikaciju.');
        router.push('/login');
      } else {
        alert(data.error || 'Greška pri registraciji');
      }
    } catch (error) {
      alert('Greška pri registraciji');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignup = async (provider) => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/oauth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          provider: provider,
          redirectTo: `${window.location.origin}/auth/callback`
        }),
      });
      const data = await response.json();
      if (data.success) {
        window.location.href = data.url;
      } else {
        alert(data.error || `Greška pri ${provider} prijavi`);
      }
    } catch (error) {
      alert(`Greška pri ${provider} prijavi`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head><title>Registracija - ContentCraft</title></Head>
      <div style={{ maxWidth: '400px', margin: '100px auto', padding: '40px', border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Registruj se</h2>
        
        <form onSubmit={handleEmailSignup} style={{ marginBottom: '20px' }}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required style={{ width: '100%', padding: '12px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }} />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Lozinka" required style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '5px' }} />
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', background: '#007acc', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            {loading ? 'Učitavanje...' : 'Registruj se putem emaila'}
          </button>
        </form>

        <div style={{ textAlign: 'center', margin: '20px 0', color: '#666', position: 'relative' }}>
          <span style={{ background: 'white', padding: '0 10px', position: 'relative', zIndex: 1 }}>ILI</span>
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: '#ddd', zIndex: 0 }}></div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button onClick={() => handleOAuthSignup('google')} disabled={loading} style={{ width: '100%', padding: '12px', background: '#fff', border: '1px solid #ddd', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer' }}>
            <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" width="20" height="20" />
            Google
          </button>
          <button onClick={() => handleOAuthSignup('github')} disabled={loading} style={{ width: '100%', padding: '12px', background: '#333', color: 'white', border: '1px solid #333', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </button>
        </div>

        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          Već imaš nalog? <a href="/login" style={{ color: '#007acc' }}>Prijavi se</a>
        </p>
      </div>
    </>
  );
}