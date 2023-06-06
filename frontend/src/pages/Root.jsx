import { Fragment, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import GlobalLoader from '@/components/GlobalLoader';
import { Toaster } from 'react-hot-toast';
import Layout from '@/components/Layout';

const Root = () => {
  return (
    <Fragment>
      <Toaster />
      <Layout>
        <Suspense fallback={<GlobalLoader />}>
          <Outlet />
        </Suspense>
      </Layout>
    </Fragment>
  );
};

export default Root;
