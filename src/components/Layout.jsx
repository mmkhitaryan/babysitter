import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Layout = ({ children }) => {
  return (
    <div className='bg-white h-full'>
      <Header />

      {children}

      <Footer />
    </div>
  );
};

export default Layout;
