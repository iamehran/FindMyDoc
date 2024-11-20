'use client';

import { useEffect } from 'react';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import DocumentList from '../components/DocumentList';
import { TokenManager } from '../lib/token-manager';

function MainContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const tokensParam = searchParams.get('tokens');
    if (tokensParam) {
      try {
        const tokens = JSON.parse(decodeURIComponent(tokensParam));
        TokenManager.setTokens(tokens);
        // Clear the URL
        window.history.replaceState({}, '', '/');
      } catch (error) {
        console.error('Error processing tokens:', error);
      }
    }
  }, [searchParams]);

  return <DocumentList />;
}

export default function Home() {
  return (
    <main className="container mx-auto px-4">
      <Suspense fallback={<div>Loading...</div>}>
        <MainContent />
      </Suspense>
    </main>
  );
}