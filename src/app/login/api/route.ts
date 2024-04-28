import { NextRequest, NextResponse } from 'next/server';
import { token } from '../../services/spotify';

export const dynamic = 'force-dynamic'; // defaults to auto

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const code = searchParams.get('code');
  if (code !== null && code !== undefined) {
    const response = await token(code);
    NextResponse.redirect('/');
  }
}
