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

  const handleGoogleSignup = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/auth/oauth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          provider: 'google',
          redirectTo: `${window.location.origin}/auth/callback`
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Greška pri Google prijavi');
      }
    } catch (error) {
      alert('Greška pri Google prijavi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Registracija - ContentCraft</title>
      </Head>
      <div style={{ 
        maxWidth: '400px', 
        margin: '100px auto', 
        padding: '40px',
        border: '1px solid #ddd',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Registruj se</h2>
        
        <form onSubmit={handleEmailSignup} style={{ marginBottom: '20px' }}>
          <div style={{ marginBottom: '15px' }}>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email adresa"
              required
              style={{ 
                width: '100%', 
                padding: '12px', 
                border: '1px solid #ccc',
                borderRadius: '5px',
                fontSize: '16px'
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Lozinka"
              required
              style={{ 
                width: '100%', 
                padding: '12px', 
                border: '1px solid #ccc',
                borderRadius: '5px',
                fontSize: '16px'
              }}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '12px', 
              background: '#007acc', 
              color: 'white', 
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            {loading ? 'Učitavanje...' : 'Registruj se putem emaila'}
          </button>
        </form>

        <div style={{ 
          textAlign: 'center', 
          margin: '20px 0', 
          color: '#666',
          position: 'relative'
        }}>
          <span style={{ 
            background: 'white', 
            padding: '0 10px',
            position: 'relative',
            zIndex: 1
          }}>
            ILI
          </span>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: '1px',
            background: '#ddd',
            zIndex: 0
          }}></div>
        </div>

        <button 
          onClick={handleGoogleSignup}
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            background: '#fff',
            border: '1px solid #ddd',
            color: '#333',
            borderRadius: '5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            fontSize: '16px',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          <img 
            src="https://developers.google.com/identity/images/g-logo.png" 
            alt="Google" 
            width="20" 
            height="20"
          />
          Registruj se preko Google-a
        </button>

        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          Već imaš nalog? <a href="/login" style={{ color: '#007acc' }}>Prijavi se</a>
        </p>
      </div>
    </>
  );
}
