import Heading from '@/components/Heading';
import useBabysitter from '@/hooks/useBabysitter';
import { useParams } from 'react-router-dom';
import { differenceInYears, lightFormat } from 'date-fns';
import useReviews from '@/hooks/useReviews';
import useProfile from '@/hooks/useProfile';
import useSendReview from '@/hooks/useSendReview';
import { useForm } from 'react-hook-form';
import Rating from '@/components/Rating';
import { AnimatePresence, m } from 'framer-motion';
import ModalImage from 'react-modal-image';
import { Fragment, useState } from 'react';
import Modal from '@/components/Modal';
import classcat from 'classcat';

const education = ['Высшее', 'Среднее', 'Неоконченное высшее'];

const Babysitter = () => {
  const { id } = useParams();

  const { data: profile } = useProfile();
  const { data } = useBabysitter(id);
  const { data: reviews } = useReviews(id);
  const { mutate: sendReview, isLoading: isSendingReview } = useSendReview();
  const { handleSubmit, register, watch, setValue, reset } = useForm({
    defaultValues: {
      id,
      rating: 0,
      text: '',
    },
  });
  const [bookModal, setBookModal] = useState(false);

  return (
    <m.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='bs-container'>
      <Heading title={data?.full_name} />
      <div>
        <ModalImage
          className='w-20 h-20 rounded-full border border-primary object-cover object-center'
          small={data?.avatar}
          large={data?.avatar}
          hideDownload
          hideZoom
        />
      </div>
      <div className='mt-3'>
        <div>
          <h3 className='text-lg font-medium leading-6 text-gray-900'>Информация о няне</h3>
          <p className='mt-1 max-w-2xl text-sm text-gray-500'>Личные данные и анкета.</p>
        </div>
        <div className='mt-5 border-t border-gray-200'>
          <dl className='sm:divide-y sm:divide-gray-200'>
            <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5'>
              <dt className='text-sm font-medium text-gray-500'>Стаж</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>{data?.years_of_experience}</dd>
            </div>
            <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5'>
              <dt className='text-sm font-medium text-gray-500'>Пол</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                {data?.gender ? 'Мужской' : 'Женский'}
              </dd>
            </div>
            <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5'>
              <dt className='text-sm font-medium text-gray-500'>Образование</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>{education[data?.education - 1]}</dd>
            </div>
            {data?.birthday && (
              <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5'>
                <dt className='text-sm font-medium text-gray-500'>Возраст</dt>
                <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                  {differenceInYears(new Date(), new Date(data.birthday))}
                </dd>
              </div>
            )}
            <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5'>
              <dt className='text-sm font-medium text-gray-500'>Часовая ставка</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                {Intl.NumberFormat('ru-KZ', { style: 'currency', currency: 'KZT' }).format(data?.hourly_rate ?? 0)}
              </dd>
            </div>
            <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5'>
              <dt className='text-sm font-medium text-gray-500'>О себе</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>{data?.bio}</dd>
            </div>
            {reviews && (
              <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5'>
                <dt className='text-sm font-medium text-gray-500'>Средний рейтинг</dt>
                <dd
                  className={classcat([
                    'mt-1 text-sm sm:col-span-2 sm:mt-0',
                    reviews.length ? 'text-amber-500' : 'text-gray-900',
                  ])}
                >
                  {reviews.length > 0
                    ? reviews?.map((review) => review.rating).reduce((a, b) => a + b, 0) / reviews.length
                    : 0}
                </dd>
              </div>
            )}
          </dl>
        </div>

        {profile?.user_type === 2 && (
          <Fragment>
            <button
              onClick={() => setBookModal(true)}
              className='mt-2 font-semibold rounded-md shadow-sm ring ring-blue-100 px-2 py-3 bg-blue-400 text-white'
            >
              Нанять
            </button>
            <Modal
              open={bookModal}
              onClose={() => {
                setBookModal(false);
              }}
              onSubmit={({ hours, startTime }) => {
                mutate({ id, hours, startTime });
              }}
              bookedDates={data?.booked_dates}
            />
          </Fragment>
        )}

        {reviews && (
          <div className='mt-5 grid md:grid-cols-2 gap-6'>
            {profile?.user_type === 2 && (
              <form
                className='space-y-2'
                onSubmit={handleSubmit((data) => {
                  sendReview(data, {
                    onSuccess() {
                      reset();
                    },
                  });
                })}
              >
                <div className='font-medium text-gray-900'>Новый отзыв</div>
                <Rating value={watch('rating')} onChange={(rating) => setValue('rating', rating)} />
                <textarea
                  className='bs-input'
                  {...register('text', {
                    required: true,
                  })}
                />
                <button
                  type='submit'
                  className='bg-primary text-sm font-semibold text-white py-2 px-3 rounded-md'
                  disabled={isSendingReview}
                >
                  Отправить
                </button>
              </form>
            )}
            <div>
              <div className='font-medium text-gray-900'>Отзывы</div>
              {reviews?.length === 0 && <div className='mt-2 text-sm text-primary'>Отзывов пока нет</div>}
              <ul className='mt-2 space-y-6'>
                <AnimatePresence mode='popLayout' initial={false}>
                  {reviews?.map((review) => (
                    <m.li key={review.id} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                      <Rating value={review.rating} readOnly />
                      <div className='mt-2 text-sm text-gray-600'>{review.text}</div>
                    </m.li>
                  ))}
                </AnimatePresence>
              </ul>
            </div>
          </div>
        )}
      </div>
    </m.main>
  );
};

export default Babysitter;
