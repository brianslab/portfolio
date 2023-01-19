import Link from 'next/link';
import { NavbarProps } from './types';

export function Navbar({ home = 'home', pages = [] }: NavbarProps) {
  const pageButtons = pages.map((page) => {
    return (
      <Link
        className='block px-2 py-2 text-gray-600 hover:shadow-md transition duration-150 ease-in-out'
        href={page.link}
      >
        {page.name}
      </Link>
    );
  });

  return (
    <header>
      <nav className='shadow-md py-2 bg-white w-full relative flex items-center justify-between'>
        <div className='px-6 flex-wrap grow block'>
          <Link
            className='float-left px-2 py-2 text-gray-600 hover:shadow-md transition duration-150 ease-in-out'
            href='/'
            // data-mdb-ripple='true'
            // data-mdb-ripple-color='dark'
          >
            {home}
          </Link>
          <div className='flex float-right'>{pageButtons}</div>
        </div>
      </nav>
    </header>
  );
}
