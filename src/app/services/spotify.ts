import querystring from 'querystring';

const scopesList: string[] = ['user-read-private', 'user-read-email'];

const baseUrl = 'https://accounts.spotify.com';

export function authorize(): string {
  const scopes = scopesList.join(' ');
  const params = querystring.stringify({
    response_type: 'code',
    client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
    scope: scopes,
    redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI,
  });
  return `${baseUrl}/authorize?${params}`;
}

function buildAuthorizationHeader(): string {
    return Buffer.from(`${process.env.REACT_APP_SPOTIFY_CLIENT_ID}:${process.env.REACT_APP_SPOTIFY_CLIENT_SECRET}`).toString('base64');
}

interface ApiTokenResponseI {
    access_token: string;
    token_type: string;
    scope: string;
    expires_in: number;
    refresh_token: number;
}

export async function token(code: string): Promise<ApiTokenResponseI> {
    const formData = new URLSearchParams();
    formData.append('code', code);
    formData.append('grant_type', 'authorization_code');

    const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
    if (redirectUri) formData.append('redirect_uri', redirectUri);

    const response = await fetch(`${baseUrl}/api/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${buildAuthorizationHeader()}`
        },
        body: formData,
    });
    return (await response.json()) as ApiTokenResponseI;
}
