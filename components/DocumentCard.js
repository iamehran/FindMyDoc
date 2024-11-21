'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2Icon } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { TokenManager } from '../lib/token-manager';
import { FileIcon, Trash2Icon, ExternalLinkIcon, DownloadIcon } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const getColorByFileType = (type) => {
  if (type.includes('pdf')) return 'from-red-500/10 to-red-500/20';
  if (type.includes('sheet') || type.includes('excel')) return 'from-green-500/10 to-green-500/20';
  if (type.includes('presentation') || type.includes('powerpoint')) return 'from-orange-500/10 to-orange-500/20';
  if (type.includes('document') || type.includes('word')) return 'from-blue-500/10 to-blue-500/20';
  if (type.includes('image')) return 'from-purple-500/10 to-purple-500/20';
  return 'from-gray-500/10 to-gray-500/20';
};

const DocumentCard = ({ 
  id, 
  title, 
  displayName, 
  type, 
  lastModified, 
  onView, 
  onDownload, 
  onDelete,
  onRename 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState(displayName || title);
  const [isRenaming, setIsRenaming] = useState(false);

  const handleRename = async () => {
    if (!newDisplayName.trim()) return;
    
    try {
      setIsRenaming(true);
      const tokens = TokenManager.getTokens();
      
      const response = await fetch(`/api/files/${id}/rename`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${JSON.stringify(tokens)}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ displayName: newDisplayName })
      });

      if (!response.ok) throw new Error('Failed to rename file');

      toast({
        title: "Success",
        description: "File renamed successfully",
      });

      onRename?.(id, newDisplayName);
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to rename file",
        variant: "destructive",
      });
    } finally {
      setIsRenaming(false);
    }
  };

  return (
    <>
      <Card className="w-full overflow-hidden group hover:shadow-lg transition-shadow duration-200">
        <div className="relative">
          {/* Blurred background with gradient */}
          <div 
          className={`absolute inset-0 bg-gradient-to-br ${gradientClass} 
          opacity-50 group-hover:opacity-70 transition-opacity duration-300`}
        />

<CardHeader className="relative z-10">
  {isEditing ? (
    <div className="flex gap-2">
      <Input
        value={newDisplayName}
        onChange={(e) => setNewDisplayName(e.target.value)}
        disabled={isRenaming}
        autoFocus
        className="bg-white/50"
      />
      <Button 
        onClick={handleRename} 
        disabled={isRenaming || !newDisplayName.trim()}
        size="sm"
      >
        Save
      </Button>
      <Button 
        onClick={() => {
          setNewDisplayName(displayName || title);
          setIsEditing(false);
        }}
        variant="outline" 
        size="sm"
      >
        Cancel
      </Button>
    </div>
  ) : (
    <h2 className="text-3xl font-extrabold tracking-tight leading-tight 
        bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600
        group-hover:from-gray-800 group-hover:to-gray-500
        transition-colors duration-300 min-h-[3.5rem] flex items-center gap-2">
      {displayName || title}
      <Button
        variant="ghost"
        size="sm"
        className="opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => setIsEditing(true)}
      >
        <Edit2Icon className="h-4 w-4" />
      </Button>
    </h2>
  )}
</CardHeader>

          <CardContent className="relative z-10 space-y-2">
            {/* Original filename */}
            <div className="flex items-center text-sm text-gray-600">
              <FileIcon className="mr-2 h-4 w-4" />
              <span className="truncate">{title}</span>
            </div>
            
            {/* File type and date */}
            <div className="flex flex-col space-y-1 text-xs text-gray-500">
              <span>Type: {type.split('/').pop()}</span>
              <span>Modified: {lastModified}</span>
            </div>
          </CardContent>

          <CardFooter className="relative z-10 flex justify-between gap-2 pt-4">
            <Button 
              onClick={onView} 
              variant="outline" 
              size="sm"
              className="flex-1"
            >
              <ExternalLinkIcon className="mr-2 h-4 w-4" />
              View
            </Button>
            <Button 
              onClick={onDownload} 
              variant="outline" 
              size="sm"
              className="flex-1"
            >
              <DownloadIcon className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button 
              onClick={() => setIsDeleteDialogOpen(true)} 
              variant="outline" 
              size="sm"
              className="flex-1 text-red-500 hover:text-red-700 hover:bg-red-50"
              disabled={isDeleting}
            >
              <Trash2Icon className="mr-2 h-4 w-4" />
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </CardFooter>
        </div>
      </Card>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Document</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &ldquo;{displayName || title}&rdquo;? This action cannot be undone.
              </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DocumentCard;