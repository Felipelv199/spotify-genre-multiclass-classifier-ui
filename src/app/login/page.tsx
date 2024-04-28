'use client'

import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { authorize } from '../services/spotify';

export default function Page() {
  const router = useRouter();

  return (
    <Container>
      <Button onClick={() => router.push(authorize())}>Log in with Spotify</Button>
    </Container>
  );
};
