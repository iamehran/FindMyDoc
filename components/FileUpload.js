'use client';

import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Upload } from 'lucide-react';
import { TokenManager } from '../lib/token-manager';
import { toast } from "./ui/use-toast";
import FileUploadDialog from './FileUploadDialog';

const FileUpload = ({ onUploadComplete }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setIsDialogOpen(true);
    }
  };

  const handleUpload = async (displayName) => {
    console.log("FileUpload received displayName:", displayName); // Debug log
    if (!selectedFile || !displayName) return;

    try {
      setIsUploading(true);
      const tokens = TokenManager.getTokens();
      
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('displayName', displayName);

      console.log("Sending upload request with displayName:", displayName); // Debug log

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${JSON.stringify(tokens)}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const data = await response.json();
      console.log("Upload response:", data); // Debug log
      
      toast({
        title: "Success",
        description: "File uploaded successfully",
      });

      if (onUploadComplete) {
        onUploadComplete(data);
      }
      
      setIsDialogOpen(false);
      setSelectedFile(null);
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to upload file",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={handleFileSelect}
          disabled={isUploading}
        />
        <label
          htmlFor="file-upload"
          className="inline-flex items-center px-4 py-2 rounded-md
            bg-blue-500 hover:bg-blue-600 cursor-pointer
            text-white font-medium text-sm"
        >
          <Upload className="w-4 h-4 mr-2" />
          Select File
        </label>
      </div>

      <FileUploadDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedFile(null);
        }}
        selectedFile={selectedFile}
        onUpload={handleUpload}
        isUploading={isUploading}
      />
    </>
  );
};

export default FileUpload;