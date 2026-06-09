import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#C5A880] flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-24 px-4 md:px-12 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-[#66FCF1] mb-6">
          Hexa Turnos - La Plataforma de Agendamiento Autónoma
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8">
          Gestioná tus turnos de forma inteligente, sin esperas y con total autonomía.
        </p>
        <Link href="/signup">
          <a className="inline-block bg-[#66FCF1] text-[#050505] font-semibold py-3 px-8 rounded-full hover:bg-[#55d9d5] transition-colors">
            Comenzar Gratis
          </a>
        </Link>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 bg-[#0a0a0a] px-4 md:px-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-[#C5A880] mb-12">
          Características Principales
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-6 border border-[#C5A880] rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4 text-[#66FCF1]">Calendario Dinámico</h3>
            <p>Sincronización en tiempo real con Google Calendar y Outlook.</p>
          </div>
          <div className="p-6 border border-[#C5A880] rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4 text-[#66FCF1]">Gestión de Usuarios</h3>
            <p>Roles y permisos personalizables para administradores y clientes.</p>
          </div>
          <div className="p-6 border border-[#C5A880] rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4 text-[#66FCF1]">Notificaciones Inteligentes</h3>
            <p>Recordatorios vía SMS, email y notificaciones push.</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="w-full py-24 bg-[#050505] px-4 md:px-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-[#C5A880] mb-12">
          Plan de Precios
        </h2>
        <div className="max-w-md mx-auto bg-[#0a0a0a] border border-[#C5A880] rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4 text-[#66FCF1]">Standard</h3>
          <p className="text-5xl font-extrabold mb-6">$15</p>
          <p className="mb-8">por mes – Facturación anual</p>
          <Link href="/signup">
            <a className="inline-block bg-[#66FCF1] text-[#050505] font-semibold py-3 px-8 rounded-full hover:bg-[#55d9d5] transition-colors">
              Comenzar Gratis
            </a>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-[#0a0a0a] text-center text-[#C5A880]">
        © {new Date().getFullYear()} Hexa Turnos. Todos los derechos reservados.
      </footer>
    </main>
  );
}
