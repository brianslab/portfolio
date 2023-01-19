import { NavbarProps } from './types';

export function Navbar({ home = 'home', pages = [] }: NavbarProps) {
  const renderedPages = pages.map((page) => {
    return (
      <li className='nav-item float-right'>
        <a
          className='nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out'
          href={page.link}
          data-mdb-ripple='true'
          data-mdb-ripple-color='light'
        >
          {page.name}
        </a>
      </li>
    );
  });

  return (
    <header>
      <nav className='navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between'>
        <div className='navbar-collapse px-6 flex-wrap grow'>
          <a
            className='float-left nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out'
            href='/'
            // data-mdb-ripple='true'
            // data-mdb-ripple-color='dark'
          >
            {home}
          </a>
          <div className='ml-auto'>
            <ul>{renderedPages}</ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
