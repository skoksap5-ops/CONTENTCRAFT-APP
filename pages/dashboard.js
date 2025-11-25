import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('supabase_user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('supabase_user');
    localStorage.removeItem('supabase_session');
    router.push('/');
  };

  if (!user) {
    return <div style={{ textAlign: 'center', margin: '50px' }}>Učitavanje...</div>;
  }

  return (
    <>
      <Head><title>Dashboard - ContentCraft</title></Head>
      <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1>Dobrodošao, {user.email}!</h1>
          <button onClick={handleLogout} style={{ padding: '10px 20px', background: '#ff4444', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Odjavi se
          </button>
        </div>
        
        <div style={{ padding: '30px', background: '#f9f9f9', borderRadius: '10px', border: '1px solid #ddd' }}>
          <h2>Uspešno ste prijavljeni! 🎉</h2>
          <p>Ovo je vaš dashboard. Ovdje ćemo kasnije dodati:</p>
          <ul>
            <li>Generisanje sadržaja</li>
            <li>Istorija generisanog sadržaja</li>
            <li>Podešavanja profila</li>
            <li>Subscription informacije</li>
          </ul>
        </div>
      </div>
    </>
  );
}
