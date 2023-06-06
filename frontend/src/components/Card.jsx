import { m } from 'framer-motion';
import { CalendarDaysIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';
import useProfile from '@/hooks/useProfile';

const item = {
  hidden: { opacity: 0, scale: 0.75, y: -20 },
  show: { opacity: 1, scale: 1, y: 0 },
};

const Card = ({ person, onBook }) => {
  const { data: profile } = useProfile();
  const navigate = useNavigate();

  return (
    <m.li
      onClick={() => {
        navigate(`/babysitter/${person.id}`);
      }}
      className='cursor-pointer col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow'
      variants={item}
    >
      <div className='flex w-full items-center justify-between space-x-6 p-6'>
        <div className='flex-1 truncate'>
          <div className='flex items-center space-x-3'>
            <h3 className='truncate text-sm font-medium'>{person.full_name}</h3>
            <span className='inline-block flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-medium bg-negative text-white'>
              Стаж {person.years_of_experience} лет
            </span>
          </div>
          <p className='mt-1 truncate text-sm text-gray-500'>{person.bio}</p>
        </div>
        <img
          className='h-20 w-20 flex-shrink-0 rounded-full bg-gray-300 object-cover object-center'
          src={person?.avatar}
          alt=''
        />
      </div>
      {profile?.user_type === 2 && (
        <div>
          <div className='-mt-px flex divide-x divide-gray-200'>
            <div className='flex w-0 flex-1'>
              <button
                type='button'
                className='relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500'
                onClick={onBook}
              >
                <CalendarDaysIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                <span className='ml-3'>Нанять {person.hourly_rate}₸/час</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </m.li>
  );
};

export default Card;
