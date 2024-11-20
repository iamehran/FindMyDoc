import { NextResponse } from 'next/server';
import { drive } from '../../../../lib/google-drive';


export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json(
        { error: 'No authorization token provided' },
        { status: 401 }
      );
    }

    const tokens = JSON.parse(authHeader.replace('Bearer ', ''));
    const driveClient = drive.createDriveClient(tokens);

    // Request additional fields including properties and description
    const files = await driveClient.listFiles({
      fields: 'files(id, name, mimeType, modifiedTime, webViewLink, properties, description)'
    });

    // Transform the files data
    const transformedFiles = files.files.map(file => ({
      id: file.id,
      title: file.name,
      // Use the custom displayName from properties or description, fallback to file name
      displayName: file.properties?.displayName || file.description || file.name,
      type: file.mimeType,
      lastModified: file.modifiedTime,
      viewLink: file.webViewLink
    }));

    console.log("Transformed files with displayNames:", transformedFiles);

    return NextResponse.json(transformedFiles);
  } catch (error) {
    console.error('Error in list API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch files' },
      { status: 500 }
    );
  }
}