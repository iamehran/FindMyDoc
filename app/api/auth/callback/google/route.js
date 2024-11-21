import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    
    console.log("Received auth code:", code ? "Yes" : "No");

    if (!code) {
      return NextResponse.redirect(new URL('/?error=no_code', request.url));
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    const { tokens } = await oauth2Client.getToken(code);
    console.log("Got tokens:", tokens ? "Yes" : "No");

    // Redirect with tokens
    return NextResponse.redirect(
      new URL(`/?tokens=${encodeURIComponent(JSON.stringify(tokens))}`, request.url)
    );
  } catch (error) {
    console.error('Callback error:', error);
    return NextResponse.redirect(new URL('/?error=auth_failed', request.url));
  }
}