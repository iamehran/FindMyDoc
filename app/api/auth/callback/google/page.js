'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      // Exchange the code for tokens
      fetch('/api/auth/callback/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
        .then(response => response.json())
        .then(data => {
          // Store the tokens in localStorage (for demo purposes only)
          // In a real app, you'd want to store these securely, preferably server-side
          localStorage.setItem('googleTokens', JSON.stringify(data.tokens));
          router.push('/'); // Redirect to the main page
        })
        .catch(error => {
          console.error('Error exchanging code for tokens:', error);
          router.push('/'); // Redirect to the main page even on error
        });
    }
  }, [searchParams, router]);

  return <div>Authenticating...</div>;
}