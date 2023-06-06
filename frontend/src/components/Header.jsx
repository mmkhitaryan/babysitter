import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import useProfile from '@/hooks/useProfile';
import { useAuthContext } from '@/context/Auth';
import useCurrentBooking from '@/hooks/useCurrentBooking';

const Header = () => {
  const { data } = useProfile();
  const { logOut } = useAuthContext();
  const { data: currentBooking } = useCurrentBooking();

  return (
    <header>
      <Popover className='relative bg-white'>
        <div className='bs-container flex items-center justify-between py-6 md:justify-start md:space-x-10'>
          <div className='flex justify-start lg:w-0 lg:flex-1'>
            <Link to='/'>
              <span className='sr-only'>Няни</span>
              <img className='w-auto h-8 sm:h-10' src='/logo_small.svg' alt='Baby Bee' />
            </Link>
          </div>
          <div className='-my-2 -mr-2 md:hidden'>
            <Popover.Button className='inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-negative'>
              <span className='sr-only'>Open menu</span>
              <Bars3Icon className='h-6 w-6' aria-hidden='true' />
            </Popover.Button>
          </div>

          <Link to='/' className='hidden md:block text-base font-medium'>
            Главное
          </Link>
          <Link to='/about' className='hidden md:block text-base font-medium'>
            О нас
          </Link>

          <div className='hidden items-center justify-end md:flex md:flex-1 lg:w-0 md:space-x-6'>
            {data ? (
              <Fragment>
                <Link to='/babysitters' className='text-base font-medium'>
                  Няни
                </Link>
                {!!currentBooking && (
                  <Link to='/current-booking' className='text-base font-medium'>
                    Текущий заказ
                  </Link>
                )}
                <Link to='/settings' className='cursor-pointer text-base font-medium'>
                  Настройки
                </Link>
                <div onClick={logOut} className='text-negative cursor-pointer text-base font-medium'>
                  Выйти
                </div>
              </Fragment>
            ) : (
              <Link
                to='/login'
                className='inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-origin-border px-4 py-2 text-base font-medium text-primary'
              >
                Вход
              </Link>
            )}
          </div>
        </div>

        <Transition
          as={Fragment}
          enter='duration-200 ease-out'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='duration-100 ease-in'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <Popover.Panel
            focus
            className='absolute inset-x-0 top-0 z-30 origin-top-right transform p-2 transition md:hidden'
          >
            <div className='divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5'>
              <div className='px-5 pt-5 pb-6'>
                <div className='flex items-center justify-between'>
                  <div>
                    <img className='h-8 w-auto' src='/logo_small.svg' alt='Baby Bee' />
                  </div>
                  <div className='-mr-2'>
                    <Popover.Button className='inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-negative'>
                      <span className='sr-only'>Close menu</span>
                      <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                    </Popover.Button>
                  </div>
                </div>
              </div>
              <div className='py-6 px-5'>
                <div className='grid grid-cols-2 gap-4'>
                  <Link to='/' className='text-base font-medium'>
                    Главное
                  </Link>
                  <Link to='/about' className='text-base font-medium'>
                    О нас
                  </Link>
                </div>
                <div className='mt-6'>
                  {data ? (
                    <div className='grid grid-cols-2 gap-4'>
                      <Link to='/babysitters' className='text-base font-medium'>
                        Няни
                      </Link>
                      {!!currentBooking && (
                        <Link to='/current-booking' className='text-base font-medium'>
                          Текущий заказ
                        </Link>
                      )}
                      <Link to='/settings' className='cursor-pointer text-base font-medium'>
                        Настройки
                      </Link>
                      <div onClick={logOut} className='text-negative cursor-pointer text-base font-medium'>
                        Выйти
                      </div>
                    </div>
                  ) : (
                    <Link
                      to='/login'
                      className='flex w-full items-center justify-center rounded-md border border-transparent bg-origin-border px-4 py-2 text-base font-medium text-primary'
                    >
                      Вход
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </header>
  );
};

export default Header;
