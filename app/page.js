'use client';

import { useEffect } from 'react'; // Changed this line
import { useSearchParams } from 'next/navigation';
import DocumentList from '../components/DocumentList';
import { TokenManager } from '../lib/token-manager';

export default function Home() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check for tokens in URL
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

  return (
    <main className="container mx-auto px-4">
      <DocumentList />
    </main>
  );
}