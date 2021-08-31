import Link from 'next/link';
import { ReactElement, ReactNode } from 'react';
import MainLayout from '../components/layouts/MainLayout';
import SecondaryLayout from '../components/layouts/SecondaryLayout';

const Home = () => (
  <>
    <p>
      <Link href='/about'>
        <a>Main Page</a>
      </Link>
    </p>
  </>
);

export default Home;
