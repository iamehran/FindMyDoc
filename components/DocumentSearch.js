'use client';

import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DocumentSearch = ({ onSearch, onFilterChange }) => {
  return (
    <div className="flex gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search documents..."
          className="pl-8"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <Select onValueChange={onFilterChange} defaultValue="all">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="pdf">PDF</SelectItem>
          <SelectItem value="document">Document</SelectItem>
          <SelectItem value="spreadsheet">Spreadsheet</SelectItem>
          <SelectItem value="presentation">Presentation</SelectItem>
          <SelectItem value="image">Image</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default DocumentSearch;