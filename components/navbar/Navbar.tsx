import Link from 'next/link';
import { NavbarProps } from './types';

export function Navbar({ home = 'home', pages = [] }: NavbarProps) {
  const pageButtons = pages.map((page) => {
    return (
      <li className='float-right' key={page.name}>
        <Link
          className='block pr-2 lg:px-2 py-2 text-gray-600 hover:shadow-md hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out'
          href={page.link}
        >
          {page.name}
        </Link>
      </li>
    );
  });

  return (
    <header>
      <nav className='shadow-md py-2 bg-white w-full relative flex items-center justify-between'>
        <div className='px-6 flex-wrap grow'>
          <Link
            className='float-left block pr-2 lg:px-2 py-2 text-gray-600 hover:shadow-md hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out'
            href='/'
            // data-mdb-ripple='true'
            // data-mdb-ripple-color='dark'
          >
            {home}
          </Link>
          <div className='ml-auto'>
            <ul>{pageButtons}</ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
