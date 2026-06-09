import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `px-4 py-2 rounded-md hover:bg-[#0a0a0a] transition-colors ${
      pathname === href ? 'bg-[#0a0a0a] text-[#66FCF1]' : ''
    }`;

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-[#0a0a0a] border-b border-[#C5A880]">
      <Link href="/" className="text-2xl font-bold text-[#66FCF1]">
        Hexa Turnos
      </Link>

      <div className="flex space-x-4">
        <Link href="/signup" className={linkClass('/signup')}>
          Registrarse
        </Link>
        <Link href="/login" className={linkClass('/login')}>
          Iniciar Sesión
        </Link>
      </div>
    </nav>
  );
}
