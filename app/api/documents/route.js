import { NextResponse } from 'next/server';

// Temporary mock data
const documents = [
  { id: 1, title: 'Report.pdf', type: 'PDF', lastModified: '2024-09-25' },
  { id: 2, title: 'Spreadsheet.xlsx', type: 'Excel', lastModified: '2024-09-26' },
  { id: 3, title: 'Presentation.pptx', type: 'PowerPoint', lastModified: '2024-09-27' },
];

export async function GET() {
  return NextResponse.json(documents);
}