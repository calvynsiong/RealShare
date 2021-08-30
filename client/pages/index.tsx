import Link from 'next/link';
import { ReactElement } from 'react';
import MainLayout from '../components/layouts/MainLayout';
import SecondaryLayout from '../components/layouts/SecondaryLayout';

const Home = () => (
  <>
    <p>
      <Link href='/about'>
        <a>About</a>
      </Link>
    </p>
  </>
);

export default Home;
