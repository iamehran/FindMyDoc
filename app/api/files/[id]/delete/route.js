import { NextResponse } from 'next/server';
import { drive } from '@/lib/google-drive';

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json(
        { error: 'No authorization token provided' },
        { status: 401 }
      );
    }

    const tokens = JSON.parse(authHeader.replace('Bearer ', ''));
    const driveClient = drive.createDriveClient(tokens);

    await driveClient.deleteFile(id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete file', details: error.message },
      { status: 500 }
    );
  }
}