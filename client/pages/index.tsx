import Link from 'next/link';
import MainLayout from '../components/layouts/MainLayout';

const IndexPage = () => (
  <MainLayout title='Home | Next.js + TypeScript Example'>
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href='/about'>
        <a>About</a>
      </Link>
    </p>
  </MainLayout>
);

export default IndexPage;
