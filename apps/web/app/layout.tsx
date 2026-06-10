import React from 'react';
import Navbar from '../../components/Navbar';

export const metadata = {
  title: 'Hexa Turnos – Plataforma de Agendamiento Autónomo',
  description: 'Calendario inteligente y sin esperas. Gestión de turnos para empresas y profesionales.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-[#050505] text-[#C5A880] antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
