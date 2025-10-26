"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LaunchBrainstormPage() {
  const [status, setStatus] = useState<string>('Launching Brainstorming App...');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    launchApp();
  }, []);

  const launchApp = async () => {
    try {
      setStatus('Starting Brainstorming App...');

      const response = await fetch('/api/launch-brainstorm', {
        method: 'POST',
      });

      const data = await response.json();

      if (data.success) {
        setStatus('Brainstorming App is ready! Redirecting...');

        // Wait a moment then redirect
        setTimeout(() => {
          window.location.href = 'http://localhost:3003';
        }, 1000);
      } else {
        if (response.status === 202) {
          // App is still starting
          setStatus('App is starting, this may take a moment...');
          setTimeout(() => {
            window.location.href = 'http://localhost:3003';
          }, 3000);
        } else {
          setError(data.error || 'Failed to start Brainstorming App');
        }
      }
    } catch (err) {
      setError('Failed to connect to server');
      console.error('Launch error:', err);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    }}>
      {error ? (
        <div style={{
          textAlign: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          padding: '40px',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
          maxWidth: '500px'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>⚠️</div>
          <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Error</h1>
          <p style={{ fontSize: '16px', opacity: 0.9, marginBottom: '24px' }}>{error}</p>
          <button
            onClick={() => router.push('/')}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              backgroundColor: 'white',
              color: '#667eea',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Go Back Home
          </button>
        </div>
      ) : (
        <div style={{
          textAlign: 'center'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '4px solid rgba(255, 255, 255, 0.3)',
            borderTop: '4px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }}></div>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
