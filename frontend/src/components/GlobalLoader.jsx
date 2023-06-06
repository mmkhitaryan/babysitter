import { useEffect } from 'react';
import nProgress from 'nprogress';

const GlobalLoader = () => {
  useEffect(() => {
    nProgress.start();

    return () => {
      nProgress.done();
    };
  }, []);

  return null;
};

export default GlobalLoader;
