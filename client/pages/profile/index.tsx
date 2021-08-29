import Link from 'next/link';
import MainLayout from '../../components/layouts/MainLayout';

const Profile = () => (
  <div className='p-4'>
    <h1>About</h1>
    <p>This is the about page</p>
    <p>
      <Link href='/'>
        <a>Go home</a>
      </Link>
    </p>
  </div>
);

export default Profile;
