import useTitle from '@/hooks/useTitle';
import { m } from 'framer-motion';

const NotFound = () => {
  useTitle('404');

  return (
    <m.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='bs-container flex w-full flex-grow flex-col'>
      <div className='my-auto flex-shrink-0 py-16 sm:py-32'>
        <p className='text-base font-semibold text-primary'>404</p>
        <h1 className='mt-2 text-4xl font-bold tracking-tight sm:text-5xl'>Страница не найдена</h1>
        <p className='mt-2 text-base'>Извините, мы не смогли найти страницу, которую вы ищете.</p>
        <div className='mt-6'>
          <a href='/' className='text-base font-medium text-primary'>
            Вернуться на главную
            <span aria-hidden='true'> &rarr;</span>
          </a>
        </div>
      </div>
    </m.main>
  );
};

export default NotFound;
