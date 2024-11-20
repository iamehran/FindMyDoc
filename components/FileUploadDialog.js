'use client';

import React, { useState } from 'react';
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Loader2 } from 'lucide-react';

const FileUploadDialog = ({ 
  isOpen, 
  onClose, 
  selectedFile, 
  onUpload, 
  isUploading 
}) => {
  const [displayName, setDisplayName] = useState('');

  const handleUpload = () => {
    console.log("Dialog sending display name:", displayName); // Debug log
    onUpload(displayName);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="displayName" className="text-sm font-medium">
              Display Name
            </label>
            <Input
              id="displayName"
              placeholder="Enter a display name for your document"
              value={displayName}
              onChange={(e) => {
                console.log("Input value changed:", e.target.value); // Debug log
                setDisplayName(e.target.value);
              }}
            />
          </div>
          
          <div className="text-sm text-gray-500">
            <p>Original filename: {selectedFile?.name}</p>
            <p>File type: {selectedFile?.type || 'Unknown'}</p>
            <p>Size: {selectedFile ? (selectedFile.size / 1024).toFixed(2) : 0} KB</p>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setDisplayName(''); // Reset on cancel
              onClose();
            }}
            disabled={isUploading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleUpload}
            disabled={!displayName.trim() || isUploading}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              'Upload'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FileUploadDialog;