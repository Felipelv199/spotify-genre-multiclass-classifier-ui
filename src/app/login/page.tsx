'use client';

import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Button } from 'react-bootstrap';
import { useRouter, useSearchParams } from 'next/navigation';
import { authorize, token } from '../services/spotify';

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  async function initialFetch() {
    if (code !== null) {
      const response = await token(code);
      document.cookie = `spotifyAccessToken=${response.access_token};expires=${response.expires_in}`;
      router.push("/");
    }
    router.push('/login');
  }

  useEffect(() => {
    initialFetch();
  });

  return (
    <Container>
      <Button onClick={() => router.push(authorize())}>
        Log in with Spotify
      </Button>
    </Container>
  );
}
