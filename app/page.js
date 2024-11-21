'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { TokenManager } from '../lib/token-manager';
import DocumentList from '../components/DocumentList';

export default function Home() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const tokens = searchParams.get('tokens');
    if (tokens) {
      TokenManager.setTokens(JSON.parse(decodeURIComponent(tokens)));
      window.history.replaceState({}, '', '/');
    }
  }, [searchParams]);

  return (
    <main className="container mx-auto px-4">
      <DocumentList />
    </main>
  );
}