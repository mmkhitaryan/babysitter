import useBabysitters from '@/hooks/useBabysitters';
import { useDeferredValue, useMemo, useState } from 'react';
import Modal from '@/components/Modal';
import useBookBabysitter from '@/hooks/useBookBabysitter';
import { AnimatePresence } from 'framer-motion';
import Heading from '@/components/Heading';
import Card from '@/components/Card';
import { m } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const container = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0,
      staggerChildren: 0.2,
    },
  },
};

const Babysitters = () => {
  const [filters, setFilters] = useState({
    age: { min: 18, max: 120 },
    ordering: '',
    threeToFive: null,
    detsad: null,
    baby: null,
  });
  const defferedAge = useDeferredValue(filters.age);

  const [bookModal, setBookModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  const { data } = useBabysitters({
    ordering: filters.ordering,
    age_min: defferedAge.min,
    age_max: defferedAge.max,
    detsad: filters.detsad,
    threeToFive: filters.threeToFive,
    baby: filters.baby,
  });

  const selectedBabysitter = useMemo(() => data?.results.find((p) => p.id === selectedId) ?? [], [data, selectedId]);

  const { mutate } = useBookBabysitter();

  return (
    <m.main initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className='bs-container'>
      <Heading title='Няни' />
      <div className='grid sm:grid-cols-3 gap-6'>
        <div>
          <label htmlFor='ordering' className='block text-sm font-medium text-gray-700'>
            Сортировать по
          </label>
          <select
            id='ordering'
            name='ordering'
            className='mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary focus:outline-none focus:ring-primborder-primary sm:text-sm'
            onChange={(e) => setFilters((prev) => ({ ...prev, ordering: e.target.value }))}
            value={filters.ordering}
          >
            <option value='-hourly_rate'>Возрастание цены</option>
            <option value='+hourly_rate'>Понижение цены</option>
          </select>
        </div>

        <div className='sm:col-span-3 flex gap-3'>
          <div>
            <label htmlFor='age_min' className='block text-sm font-medium text-gray-700'>
              Возраст минимум
            </label>
            <input
              type='number'
              id='age_min'
              name='age_min'
              className='mt-1 bs-input w-24'
              min='18'
              max='120'
              onChange={(e) => setFilters((prev) => ({ ...prev, age: { ...prev.age, min: e.target.valueAsNumber } }))}
              value={filters.age.min}
            />
          </div>
          <div>
            <label htmlFor='age_max' className='block text-sm font-medium text-gray-700'>
              Возраст максимум
            </label>
            <input
              type='number'
              id='age_max'
              name='age_max'
              className='mt-1 bs-input w-24'
              min='18'
              max='120'
              onChange={(e) => setFilters((prev) => ({ ...prev, age: { ...prev.age, max: e.target.valueAsNumber } }))}
              value={filters.age.max}
            />
          </div>
        </div>
        <div>
          <label htmlFor='threeToFive' className='block text-sm font-medium text-gray-700'>
            Дети от 3-х до 5 лет
          </label>
          <select
            id='threeToFive'
            name='threeToFive'
            className='mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary focus:outline-none focus:ring-primborder-primary sm:text-sm'
            onChange={(e) => setFilters((prev) => ({ ...prev, threeToFive: e.target.value }))}
            value={filters.threeToFive}
          >
            <option>Не выбрано</option>
            <option value='true'>Да</option>
            <option value='false'>Нет</option>
          </select>
        </div>
        <div>
          <label htmlFor='baby' className='block text-sm font-medium text-gray-700'>
            Работа с грудничками
          </label>
          <select
            id='baby'
            name='baby'
            className='mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary focus:outline-none focus:ring-primborder-primary sm:text-sm'
            onChange={(e) => setFilters((prev) => ({ ...prev, baby: e.target.value }))}
            value={filters.baby}
          >
            <option>Не выбрано</option>
            <option value='true'>Да</option>
            <option value='false'>Нет</option>
          </select>
        </div>
        <div>
          <label htmlFor='detsad' className='block text-sm font-medium text-gray-700'>
            Работа с детсадовцами
          </label>
          <select
            id='detsad'
            name='detsad'
            className='mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary focus:outline-none focus:ring-primborder-primary sm:text-sm'
            onChange={(e) => setFilters((prev) => ({ ...prev, detsad: e.target.value }))}
            value={filters.detsad}
          >
            <option>Не выбрано</option>
            <option value='true'>Да</option>
            <option value='false'>Нет</option>
          </select>
        </div>
      </div>
      <div className='w-full border-b mt-8' />
      <AnimatePresence mode='popLayout'>
        <m.ul
          className='mt-8 pb-8 grid grid-cols-1 gap-6 lg:grid-cols-2'
          variants={container}
          initial='hidden'
          animate='show'
          exit='hidden'
        >
          {data?.results.map((person) => (
            <Card
              key={person.id}
              id={person.id}
              person={person}
              onBook={(e) => {
                e.stopPropagation();
                setBookModal(true);
                setSelectedId(person.id);
              }}
            />
          ))}
        </m.ul>
      </AnimatePresence>
      <Modal
        open={bookModal}
        onClose={() => {
          setBookModal(false);
          setSelectedId(null);
        }}
        onSubmit={({ hours, startTime }) => {
          mutate(
            { id: selectedId, hours, startTime },
            {
              onSuccess() {
                navigate('/');
              },
            }
          );
        }}
        bookedDates={selectedBabysitter?.booked_dates}
      />
    </m.main>
  );
};

export default Babysitters;
