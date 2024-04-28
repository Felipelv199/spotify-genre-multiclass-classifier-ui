'use client';

import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main  style={{ minHeight: 'calc(100vh - 56px)' }}>{children}</main>
      </body>
    </html>
  );
}
