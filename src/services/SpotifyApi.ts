import { stringify } from 'querystring';

interface AccessTokenDataI {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refreshToken: string;
}

const ACCOUNTS_BASE_URL = 'https://accounts.spotify.com/';
const API_BASE_URL = 'https://api.spotify.com/v1/';

export default class SpotifyApi {
  private baseUrl: string;
  private redirectUri: string;

  constructor(_baseUrl: string, _redirectUri: string) {
    this.baseUrl = _baseUrl;
    this.redirectUri = _redirectUri;
  }

  requestUserAuthorization(clientId: string): string {
    const scope =
      'user-read-private user-read-email user-library-read playlist-modify-private playlist-modify-public';
    return `${this.baseUrl}/authorize?${stringify({
      client_id: clientId,
      redirectUri: this.redirectUri,
      response_type: 'code',
      scope,
    })}`;
  }

  async requestAccessToken(code: string): Promise<AccessTokenDataI> {
    const response = await fetch(`${ACCOUNTS_BASE_URL}/api/token`, {
      body: this.mapObjectToUrlSearchParams({
        code,
        grant_type: 'authorization_code',
        redirect_uri: this.redirectUri,
      }).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    });
    return response.json();
  }

  async getUserProfile(token: string) {
    const response = await fetch(`${API_BASE_URL}/v1/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  }

  private mapObjectToUrlSearchParams(_object: object): URLSearchParams {
    const formData = new URLSearchParams();
    for (const [key, value] of Object.entries(_object)) {
      formData.append(key, value);
    }
    return formData;
  }
}
