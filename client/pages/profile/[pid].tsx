import React, { Fragment } from 'react';
import { useRouter } from 'next/router';

const Profile = () => {
  const router = useRouter();
  const { pid } = router.query;

  return <div>{`Hello asWorld${pid}`}</div>;
};

export default Profile;

// interface ISinglePath {
//   pid: string;
// }

// interface IStaticProps {
//   params: ISinglePath;
// }

// export const getStaticPaths = async () => {
//   const paths = Array.from({ length: 400 }).map((value) => {
//     return {
//       params: {
//         pid: `${value}`,
//       },
//     };
//   });

//   return {
//     paths,
//     fallback: true,
//   };
// };

// export const getStaticProps = async ({ params }: IStaticProps) => {
//   return {
//     props: {
//       pid: params.pid,
//     },
//   };
// };
// export const getInitialProps = async ({ params }: StaticProps) => {
//   return {
//     props: {
//       pid: params.pid,
//     },
//   };
// };
