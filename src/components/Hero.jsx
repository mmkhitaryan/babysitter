import { Link } from 'react-router-dom';
import useProfile from '@/hooks/useProfile';

const Hero = () => {
  const { data } = useProfile();

  return (
    <div className='relative'>
      <div className='absolute inset-x-0 bottom-0 h-1/2' />
      <div className='bs-container px-0 sm:px-6 lg:px-8'>
        <div className='relative sm:overflow-hidden sm:rounded-[70px]'>
          <div className='absolute inset-0'>
            <img className='h-full w-full object-cover grayscale' src='/hero.jpg' alt='Babysitter' />
            <div className='absolute inset-0 bg-gradient-radial from-primary/0 to-primary/60 mix-blend-normal' />
          </div>
          <div className='relative py-16 px-6 sm:py-24 lg:py-32 lg:px-8'>
            <h1 className='text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl'>
              <span className='block text-white'>Надежные няни</span>
              <span className='block text-white'>для вашего спокойствия</span>
            </h1>
            <p className='mx-auto mt-6 max-w-lg text-center text-xl text-white sm:max-w-3xl'>
              Мы предоставляем надежных и опытных нянь, которые позаботятся о ваших малышах, пока вы заботитесь о себе.
            </p>
            <div className='mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center'>
              <div className='space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0'>
                {!data && (
                  <Link
                    to='/login'
                    className='flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium hover:bg-opacity-70 sm:px-8'
                  >
                    Начать работу
                  </Link>
                )}
                <Link
                  to={data ? '/settings' : '/login'}
                  className='flex items-center justify-center rounded-md border border-transparent bg-negative bg-opacity-60 px-4 py-3 text-base font-medium text-white hover:bg-opacity-70 sm:px-8'
                >
                  Профиль
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
