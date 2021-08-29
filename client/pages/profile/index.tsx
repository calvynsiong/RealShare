import Link from 'next/link';
import Layout from '../../components/layouts/Layout';

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
