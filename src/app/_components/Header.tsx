import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full p-4 shadow-md bg-white">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Algoing
        </Link>
        <ul className="flex gap-4">
          <li>
            <Link href="/main">Main</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
