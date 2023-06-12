import { StarIcon } from '@heroicons/react/20/solid';

const Testimonials = () => {
  return (
    <figure className='bs-container max-w-3xl'>
      <p className='sr-only'>5 out of 5 stars</p>
      <div className='flex gap-x-1 text-negative'>
        <StarIcon className='h-5 w-5 flex-none' aria-hidden='true' />
        <StarIcon className='h-5 w-5 flex-none' aria-hidden='true' />
        <StarIcon className='h-5 w-5 flex-none' aria-hidden='true' />
        <StarIcon className='h-5 w-5 flex-none' aria-hidden='true' />
        <StarIcon className='h-5 w-5 flex-none' aria-hidden='true' />
      </div>
      <blockquote className='mt-10 text-xl font-semibold leading-8 tracking-tight text-gray-900 sm:text-2xl sm:leading-9'>
        <p>
          “Наш онлайн сервис был создан с целью помочь родителям найти квалифицированных нянь для своих детей. Мы стремимся сделать процесс поиска няни максимально простым и удобным для всех пользователей. В будущем мы планируем развивать данный проект, чтобы предоставить еще больше возможностей для наших пользователей. Благодарим за использование нашего сервиса и желаем успехов в поиске няни!”
        </p>
      </blockquote>
      <figcaption className='mt-10 flex items-center gap-x-6'>
        <img
          className='h-12 w-12 rounded-full bg-gray-50'
          src='/avatarka.jpeg'
          alt=''
        />
        <div className='text-sm leading-6'>
          <div className='font-semibold text-gray-900'>Музафаров Максим</div>
          <div className='mt-0.5 text-gray-600'>Создатель Baby Bee</div>
        </div>
      </figcaption>
    </figure>
  );
};

export default Testimonials;
