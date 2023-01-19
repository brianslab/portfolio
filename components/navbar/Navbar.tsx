import Link from 'next/link';
import { NavbarProps } from './types';

export function Navbar({ home = 'home', pages = [] }: NavbarProps) {
  const pageButtons = pages.map((page) => {
    return (
      <Link
        className='block px-2 py-2 text-gray-600 hover:shadow-md transition duration-150 ease-in-out'
        href={page.link}
        key={page.name}
      >
        {page.name}
      </Link>
    );
  });

  return (
    <header>
      <nav className='shadow-md px-2 py-2 flex flex-wrap grow block bg-white w-full relative items-center justify-between'>
        <Link
          className='float-left px-2 py-2 text-gray-600 hover:shadow-md transition duration-150 ease-in-out'
          href='/'
        >
          {home}
        </Link>
        <div className='flex float-right'>{pageButtons}</div>
      </nav>
    </header>
  );
}
