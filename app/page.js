'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { TokenManager } from '../lib/token-manager';
import DocumentList from '../components/DocumentList';

function TokenHandler() {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const tokens = searchParams.get('tokens');
    if (tokens) {
      TokenManager.setTokens(JSON.parse(decodeURIComponent(tokens)));
      window.history.replaceState({}, '', '/');
    }
  }, [searchParams]);

  return null;
}

export default function Home() {
  return (
    <main className="container mx-auto px-4">
      <Suspense fallback={null}>
        <TokenHandler />
      </Suspense>
      <DocumentList />
    </main>
  );
}