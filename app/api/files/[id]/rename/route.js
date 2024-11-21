import { NextResponse } from 'next/server';
import { drive } from '@/lib/google-drive';

export const dynamic = 'force-dynamic';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { displayName } = await request.json();
    const authHeader = request.headers.get('Authorization');

    if (!authHeader) {
      return NextResponse.json(
        { error: 'No authorization token provided' },
        { status: 401 }
      );
    }

    const tokens = JSON.parse(authHeader.replace('Bearer ', ''));
    const driveClient = drive.createDriveClient(tokens);

    await driveClient.updateFile(id, { 
      properties: { displayName }
    });

    return NextResponse.json({ success: true, displayName });
  } catch (error) {
    console.error('Rename error:', error);
    return NextResponse.json(
      { error: 'Failed to rename file' },
      { status: 500 }
    );
  }
}