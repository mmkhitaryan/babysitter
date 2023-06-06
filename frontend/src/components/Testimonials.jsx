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
          “Qui dolor enim consectetur do et non ex amet culpa sint in ea non dolore. Enim minim magna anim id minim eu
          cillum sunt dolore aliquip. Amet elit laborum culpa irure incididunt adipisicing culpa amet officia
          exercitation. Eu non aute velit id velit Lorem elit anim pariatur.”
        </p>
      </blockquote>
      <figcaption className='mt-10 flex items-center gap-x-6'>
        <img
          className='h-12 w-12 rounded-full bg-gray-50'
          src='https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=1024&h=1024&q=80'
          alt=''
        />
        <div className='text-sm leading-6'>
          <div className='font-semibold text-gray-900'>Жазира Саматова</div>
          <div className='mt-0.5 text-gray-600'>Генеральный директор Baby Bee</div>
        </div>
      </figcaption>
    </figure>
  );
};

export default Testimonials;
