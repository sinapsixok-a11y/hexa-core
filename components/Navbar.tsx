import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-[#050505] border-b border-[#C5A880]">
      <div className="text-2xl font-bold text-[#66FCF1]">
        Hexa Turnos
      </div>
      <div className="space-x-4">
        <Link href="/signup">
          <a className="text-[#C5A880] hover:text-[#66FCF1] transition-colors">Comenzar</a>
        </Link>
        <Link href="/login">
          <a className="text-[#C5A880] hover:text-[#66FCF1] transition-colors">Iniciar Sesión</a>
        </Link>
      </div>
    </nav>
  );
}
