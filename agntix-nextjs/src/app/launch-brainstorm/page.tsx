"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LaunchBrainstormPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect immediately to the integrated brainstorm page
    router.push('/brainstorm');
  }, [router]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      background: '#ffffff',
      color: '#141414'
    }}>
      <div style={{
        textAlign: 'center'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          border: '4px solid rgba(0, 0, 0, 0.1)',
          borderTop: '4px solid #141414',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 20px'
        }}></div>
        <p style={{ fontSize: '18px', opacity: 0.9 }}>Launching Brainstorming App...</p>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
