'use client';

import React, { useState, useEffect, useMemo } from 'react';
import DocumentCard from './DocumentCard';
import FileUpload from './FileUpload';
import DocumentSearch from './DocumentSearch';
import LoadingState from './LoadingState';
import { RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { TokenManager } from '../lib/token-manager';
import { toast } from "./ui/use-toast";

const DocumentList = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const fetchDocuments = async () => {
    try {
      console.log("Starting to fetch documents..."); // Debug log
      setIsLoading(true);
      setError(null);
      
      const tokens = TokenManager.getTokens();
      console.log("Tokens retrieved:", tokens ? "Present" : "Not found"); // Debug log

      if (!tokens) {
        console.log("No tokens found, setting not authenticated"); // Debug log
        setIsAuthenticated(false);
        return;
      }

      // First, verify the tokens structure
      if (!tokens.access_token) {
        console.error("Invalid token structure:", tokens);
        throw new Error('Invalid token structure');
      }

      console.log("Making API request to /api/files/list"); // Debug log
      const response = await fetch('/api/files/list', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${JSON.stringify(tokens)}`,
          'Content-Type': 'application/json'
        }
      });

      console.log("API Response status:", response.status); // Debug log

      if (response.status === 401) {
        console.log("Unauthorized response, handling auth error"); // Debug log
        handleAuthError();
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Error response:", errorData); // Debug log
        throw new Error(errorData.error || 'Failed to fetch documents');
      }

      const data = await response.json();
      console.log("Documents received:", data); // Debug log

      const processedData = data.map(doc => ({
        ...doc,
        displayName: doc.displayName || doc.title // Fallback to title if no displayName
      }));

      if (!Array.isArray(data)) {
        console.error("Invalid data format received:", data);
        throw new Error('Invalid data format received');
      }

      setDocuments(data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error fetching documents:', error);
      setError(error.message || 'Failed to load documents');
      
      toast({
        title: "Error",
        description: error.message || "Failed to load documents",
        variant: "destructive",
      });

      if (error.message?.includes('Token refresh failed')) {
        handleAuthError();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthError = () => {
    console.log("Handling auth error..."); // Debug log
    TokenManager.clearTokens();
    setIsAuthenticated(false);
    setError('Authentication expired. Please login again.');
    toast({
      title: "Authentication Error",
      description: "Please login again",
      variant: "destructive",
    });
  };

  const handleGoogleAuth = async () => {
    try {
      console.log("Initiating Google Auth..."); // Debug log
      const response = await fetch('/api/auth/google');
      
      if (!response.ok) {
        throw new Error('Failed to initiate authentication');
      }

      const { url } = await response.json();
      console.log("Redirecting to:", url); // Debug log
      window.location.href = url;
    } catch (error) {
      console.error('Error initiating Google Auth:', error);
      toast({
        title: "Error",
        description: "Failed to connect to Google Drive",
        variant: "destructive",
      });
    }
  };
  

const handleDelete = async (id, fileName) => {
  try {
    const tokens = TokenManager.getTokens();
    const response = await fetch(`/api/files/${id}/delete`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${JSON.stringify(tokens)}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to delete file');
    }

    // Remove the file from the local state
    setDocuments(prev => prev.filter(doc => doc.id !== id));
    
    toast({
      title: "Success",
      description: `${fileName} has been deleted`,
    });
  } catch (error) {
    console.error('Error deleting file:', error);
    toast({
      title: "Error",
      description: "Failed to delete file. Please try again.",
      variant: "destructive",
    });
  }
};

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      console.log("Checking authentication..."); // Debug log
      const tokens = TokenManager.getTokens();
      
      if (tokens) {
        if (TokenManager.isTokenExpired()) {
          console.log("Tokens expired"); // Debug log
          handleAuthError();
        } else {
          console.log("Tokens valid, fetching documents"); // Debug log
          setIsAuthenticated(true);
          await fetchDocuments();
        }
      } else {
        console.log("No tokens found"); // Debug log
        setIsAuthenticated(false);
      }
    };

    checkAuthAndFetch();
  }, []);

  return (
    <div className="space-y-6 p-4">
      {error && (
        <div className="p-4 text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
          {!isAuthenticated && (
            <Button 
              onClick={handleGoogleAuth}
              className="mt-4"
            >
              Reconnect to Google Drive
            </Button>
          )}
        </div>
      )}

      {!isAuthenticated ? (
        <div className="text-center">
          <Button 
            onClick={handleGoogleAuth}
            className="bg-blue-500 hover:bg-blue-700"
          >
            Connect to Google Drive
          </Button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <FileUpload onUploadComplete={() => {
      fetchDocuments(); // Refresh the document list after upload
      toast({
        title: "Success",
        description: "File uploaded successfully",
      });
    }} 
    />
            <Button
              onClick={fetchDocuments}
              disabled={isLoading}
              variant="outline"
              className="ml-4"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          {isLoading ? (
            <LoadingState />
          ) : (
            documents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {documents.map((doc) => {
                console.log("Rendering document:", doc); // Debug log
                return (
                  <DocumentCard
                    key={doc.id}
                    id={doc.id}
                    title={doc.title}
                    displayName={doc.displayName}
                    type={doc.type}
                    lastModified={new Date(doc.lastModified).toLocaleDateString()}
                    onView={() => window.open(doc.viewLink, '_blank')}
                    onDownload={() => window.open(doc.viewLink, '_blank')}
                    onDelete={() => handleDelete(doc.id, doc.displayName || doc.title)}
                  />
                );
              })}
            </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No documents found. Upload some files to get started!
              </div>
            )
          )}
        </>
      )}
    </div>
  );
};

export default DocumentList;