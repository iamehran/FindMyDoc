import { google } from 'googleapis';
import { Readable } from 'stream';

class GoogleDriveClient {
  constructor(initialTokens) {
    if (!initialTokens) {
      throw new Error('Tokens are required to create a Google Drive client');
    }

    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
    
    this.oauth2Client.setCredentials(initialTokens);
    this.drive = google.drive({ version: 'v3', auth: this.oauth2Client });
  }

  async refreshTokenIfNeeded() {
    try {
      const tokens = this.oauth2Client.credentials;
      const isTokenExpired = tokens.expiry_date && tokens.expiry_date <= Date.now();

      if (isTokenExpired && tokens.refresh_token) {
        console.log("Token expired, refreshing...");
        const { credentials } = await this.oauth2Client.refreshAccessToken();
        this.oauth2Client.setCredentials(credentials);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw new Error('Token refresh failed');
    }
  }

  async listFiles(options = {}) {
    try {
      await this.refreshTokenIfNeeded();
      const defaultOptions = {
        pageSize: 30,
        fields: 'files(id, name, mimeType, modifiedTime, webViewLink, properties, description)',
        orderBy: 'modifiedTime desc'
      };
  
      const response = await this.drive.files.list({
        ...defaultOptions,
        ...options
      });
  
      console.log("Drive API response:", response.data);
  
      return response.data;
    } catch (error) {
      console.error('Error listing files:', error);
      throw new Error('Failed to list files');
    }
  }

  async uploadFile(fileMetadata, media) {
    try {
      await this.refreshTokenIfNeeded();
      
      const response = await this.drive.files.create({
        requestBody: fileMetadata,
        media: {
          mimeType: media.mimeType,
          body: media.body
        },
        fields: 'id, name, mimeType, webViewLink, properties'
      });
  
      return response.data;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }
  
  async deleteFile(fileId) {
    try {
      await this.refreshTokenIfNeeded();
      await this.drive.files.delete({
        fileId: fileId
      });
      return true;
    } catch (error) {
      console.error('Error deleting file:', error);
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  }

  async updateFile(fileId, metadata) {
    try {
      await this.refreshTokenIfNeeded();
      
      const response = await this.drive.files.update({
        fileId,
        requestBody: {
          properties: metadata.properties,
          description: metadata.description
        },
        fields: 'id, name, mimeType, description, properties'
      });
  
      return response.data;
    } catch (error) {
      console.error('Error updating file:', error);
      throw new Error(`Failed to update file: ${error.message}`);
    }
  }
}


// Factory function
export function createDriveClient(tokens) {
  return new GoogleDriveClient(tokens);
}

// Export the client directly to preserve methods
export const drive = {
  createDriveClient,
  MIME_TYPES: {
    FOLDER: 'application/vnd.google-apps.folder',
    DOCUMENT: 'application/vnd.google-apps.document',
    SPREADSHEET: 'application/vnd.google-apps.spreadsheet',
    PRESENTATION: 'application/vnd.google-apps.presentation',
    PDF: 'application/pdf',
    JPEG: 'image/jpeg',
    PNG: 'image/png'
  }
};