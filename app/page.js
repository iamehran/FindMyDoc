'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { TokenManager } from '../lib/token-manager';
import DocumentList from '../components/DocumentList';
import { Button } from "@/components/ui/button";
import { FileIcon, Shield, Pencil, RefreshCcw } from 'lucide-react';

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

function LandingPage({ onAuth }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16 pt-16">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 text-transparent bg-clip-text">
              Your Documents, Your Names
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Keep your files organized with custom display names while preserving original filenames. A smarter way to manage your Google Drive.
            </p>
            <Button 
              onClick={onAuth}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
            >
              <FileIcon className="w-6 h-6" />
              Connect with Google Drive
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <FeatureCard 
              icon={<Pencil className="w-8 h-8 text-blue-500" />}
              title="Custom Names"
              description="Give your documents meaningful names while keeping original filenames intact."
            />
            <FeatureCard 
              icon={<Shield className="w-8 h-8 text-green-500" />}
              title="Secure Access"
              description="Your files stay in your Google Drive. We just help you organize better."
            />
            <FeatureCard 
              icon={<RefreshCcw className="w-8 h-8 text-purple-500" />}
              title="Real-time Sync"
              description="Changes reflect instantly across all your devices."
            />
          </div>

          {/* Trust Badge */}
          <div className="mt-16 mb-24 text-center text-gray-600">
            <p className="text-sm">
              Secured with Google OAuth 2.0 | Your data stays in your Google Drive
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t py-6"> {/* Reduced padding */}
  <div className="container mx-auto px-8"> {/* Added more horizontal padding */}
    {/* Main Footer Content */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6"> {/* Reduced gap and margin */}
      {/* About Section */}
      <div className="col-span-1 md:col-span-2">
        <h3 className="text-base font-bold mb-3 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          FindMyDoc
        </h3>
        <p className="text-gray-600 mb-3 text-sm">
          A better way to organize your Google Drive documents with custom display names while preserving original filenames.
        </p>
        <div className="flex space-x-4">
          {/* X (Twitter) Icon */}
          <a 
            href="https://x.com/xnarhem" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-500 transition-colors"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
            </svg>
          </a>
          {/* GitHub Icon */}
          <a 
            href="https://github.com/iamehran" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
            </svg>
          </a>
        </div>
      </div>

      {/* Quick Links - More compact */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 uppercase mb-3">Legal</h4>
        <ul className="space-y-1.5 text-sm">
          <li>
            <a href="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/terms" className="text-gray-600 hover:text-blue-600 transition-colors">
              Terms & Conditions
            </a>
          </li>
          <li>
            <a href="/cookies" className="text-gray-600 hover:text-blue-600 transition-colors">
              Cookie Policy
            </a>
          </li>
        </ul>
      </div>

      {/* Contact - More compact */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 uppercase mb-3">Contact</h4>
        <ul className="space-y-1.5 text-sm">
          <li>
            <a 
              href="mailto:reachmehraan@gmail.com" 
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Email Us
            </a>
          </li>
          <li>
            <a 
              href="https://github.com/iamehran/FindMyDoc/issues" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Report an Issue
            </a>
          </li>
        </ul>
      </div>
    </div>

    {/* Bottom Bar - More compact */}
    <div className="border-t border-gray-200 pt-4">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
        <div className="text-gray-600 text-xs">
          © {new Date().getFullYear()} FindMyDoc. Built by{' '}
          <a 
            href="https://github.com/iamehran" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Mehran
          </a>
        </div>
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            v1.0.0
          </span>
          <a 
            href="https://github.com/iamehran/FindMyDoc"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-600 text-xs"
          >
            View on GitHub ↗
          </a>
        </div>
      </div>
    </div>
  </div>
</footer>
    </div>
  );
}


function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
        {title}
      </h3>
      <p className="text-gray-600 text-center">
        {description}
      </p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              FindMyDoc
            </h3>
            <p className="text-gray-600 mb-4">
              A better way to organize your Google Drive documents with custom display names while preserving original filenames.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://twitter.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-500 transition-colors"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a 
                href="https://github.com/iamehran" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/cookies" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="mailto:your.email@example.com" 
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Email Us
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/iamehran/FindMyDoc/issues" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Report an Issue
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-600 text-sm">
              © {new Date().getFullYear()} FindMyDoc. Built by{' '}
              <a 
                href="https://github.com/iamehran" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Mehran
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                v1.0.0
              </span>
              <a 
                href="https://github.com/iamehran/FindMyDoc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-600 text-sm"
              >
                View on GitHub ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(TokenManager.getTokens() !== null);
  }, []);

  const handleAuth = async () => {
    try {
      const response = await fetch('/api/auth/google');
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error initiating Google Auth:', error);
    }
  };

  return (
    <>
      <Suspense fallback={null}>
        <TokenHandler />
      </Suspense>
      {isAuthenticated ? (
        <main className="container mx-auto px-4">
          <DocumentList />
        </main>
      ) : (
        <LandingPage onAuth={handleAuth} />
      )}
    </>
  );
}