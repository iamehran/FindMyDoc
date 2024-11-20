import { NextResponse } from 'next/server';
import { drive } from '../../../lib/google-drive';
import { Readable } from 'stream';

export async function POST(request) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json(
        { error: 'No authorization token provided' },
        { status: 401 }
      );
    }

    const tokens = JSON.parse(authHeader.replace('Bearer ', ''));
    const formData = await request.formData();
    
    const file = formData.get('file');
    const displayName = formData.get('displayName');

    console.log("Received upload request:", { 
      fileName: file?.name, 
      displayName 
    }); // Debug log
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const driveClient = drive.createDriveClient(tokens);

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a readable stream from the buffer
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);

    const fileMetadata = {
      name: file.name,
      properties: {
        displayName: displayName || file.name
      }
    };

    const media = {
      mimeType: file.type || 'application/octet-stream',
      body: stream
    };

    const uploadedFile = await driveClient.uploadFile(fileMetadata, media);

    return NextResponse.json({
      id: uploadedFile.id,
      title: file.name,
      displayName: displayName || file.name, // Make sure to include this
      type: uploadedFile.mimeType,
      viewLink: uploadedFile.webViewLink
    });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: 'Failed to upload file', details: error.message },
      { status: 500 }
    );
  }
}