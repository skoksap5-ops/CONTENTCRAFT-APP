import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      
      if (code) {
        try {
          const response = await fetch(`/api/auth/callback?code=${code}`);
          const data = await response.json();
          
          if (data.success && data.session) {
            localStorage.setItem('supabase_session', JSON.stringify(data.session));
            localStorage.setItem('supabase_user', JSON.stringify(data.user));
            router.push('/dashboard');
          } else {
            alert('Greška pri prijavi: ' + (data.error || 'Nepoznata greška'));
            router.push('/login');
          }
        } catch (error) {
          console.error('Callback error:', error);
          alert('Greška pri obradi prijave');
          router.push('/login');
        }
      } else {
        router.push('/login');
      }
    };

    handleOAuthCallback();
  }, [router]);

  return (
    <>
      <Head><title>Prijava u toku - ContentCraft</title></Head>
      <div style={{ textAlign: 'center', margin: '100px auto', maxWidth: '500px', padding: '40px' }}>
        <h2>Procesuiram prijavu...</h2>
        <p>Molimo sačekajte dok vas preusmeravamo.</p>
      </div>
    </>
  );
}
