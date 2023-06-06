import { RouterProvider } from 'react-router-dom';
import { router } from '@/router';
import { AuthContextProvider } from '@/context/Auth';
import { LazyMotion, domAnimation } from 'framer-motion';

const App = () => {
  return (
    <LazyMotion features={domAnimation} strict>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </LazyMotion>
  );
};

export default App;
