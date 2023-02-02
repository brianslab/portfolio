import { Html, Head, Main, NextScript } from 'next/document';
import { Navbar } from '@/components';

const pages = [
  // {
  //   name: 'About',
  //   link: '/about',
  // },
  {
    name: 'Resume',
    link: '/resume',
  },
];

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <Navbar home='Brian Kuhn' pages={pages} />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
