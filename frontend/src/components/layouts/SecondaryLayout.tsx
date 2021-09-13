import React, { ReactNode } from 'react';

type Props = {
  title?: string;
  children?: ReactNode;
};

const SecondaryLayout = ({
  children,
  title = 'This is the default secondary title',
}: Props) => (
  <>
    <div className='p-4'>
      {children}
      {title}
      Secondary
    </div>
  </>
);

export default SecondaryLayout;
