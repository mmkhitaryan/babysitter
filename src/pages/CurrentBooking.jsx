import Heading from '@/components/Heading';
import Layout from '@/components/Layout';
import useCurrentBooking from '@/hooks/useCurrentBooking';
import useDeleteBooking from '@/hooks/useDeleteBooking';
import { useNavigate } from 'react-router-dom';

const CurrentBooking = () => {
  const { data } = useCurrentBooking();

  const { mutate } = useDeleteBooking();

  const navigate = useNavigate();

  const today = new Date();
  const start = new Date(data?.start_time);
  const end = new Date(data?.end_time);
  const width = Math.round(((today - start) / (end - start)) * 100) + '%';

  return (
    <main className='bs-container'>
      <Heading title='Текущий заказ' />
      <div>
        <img
          className='w-20 h-20 rounded-full border border-primary object-cover object-center'
          src={data?.babysitter?.avatar}
        />
      </div>
      <div className='mt-4'>
        <div className='w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700'>
          <div className='bg-blue-600 h-1.5 rounded-full dark:bg-blue-500' style={{ width }}></div>
        </div>
        <div className='mt-5 border-t border-gray-200'>
          <dl className='sm:divide-y sm:divide-gray-200'>
            <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5'>
              <dt className='text-sm font-medium text-gray-500'>Конец найма</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>{end.toLocaleString('ru')}</dd>
            </div>
            <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5'>
              <dt className='text-sm font-medium text-gray-500'>Количество детей</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>{data?.family?.number_of_children}</dd>
            </div>
            <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5'>
              <dt className='text-sm font-medium text-gray-500'>Адрес</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>{data?.family?.address}</dd>
            </div>
            <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5'>
              <dt className='text-sm font-medium text-gray-500'>Особые потребности</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>{data?.family?.special_needs}</dd>
            </div>
          </dl>
        </div>
        <button
          onClick={() => {
            if (confirm('Вы уверены, что хотите отменить этот заказ?')) {
              mutate(undefined, {
                onSuccess: () => {
                  navigate('/');
                },
              });
            }
          }}
          className='mt-2 font-semibold rounded-md shadow-sm ring ring-red-100 px-2 py-3 bg-red-400 text-white'
        >
          Отменить заказ
        </button>
      </div>
    </main>
  );
};

export default CurrentBooking;
