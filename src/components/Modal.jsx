import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import { ClockIcon } from '@heroicons/react/20/solid';
import { isFuture, isValid } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Modal = ({ open, onClose, onSubmit, bookedDates = [] }) => {
  const [hours, setHours] = useState(1);
  const [startTime, setStartTime] = useState(new Date());
  const [message, setMessage] = useState('');
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' initialFocus={cancelButtonRef} onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative transform overflow-visible rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6'>
                <div>
                  <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-negative'>
                    <CalendarDaysIcon className='h-6 w-6 text-white' aria-hidden='true' />
                  </div>
                  <div className='mt-3 text-center sm:mt-5'>
                    <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                      Подтверждение найма
                    </Dialog.Title>
                    <div className='mt-2'>
                      <label htmlFor='hours' className='block text-left text-sm font-medium text-gray-700'>
                        Часы
                      </label>
                      <div className='relative mt-1 rounded-md shadow-sm'>
                        <input
                          type='number'
                          name='hours'
                          id='hours'
                          className='block w-full rounded-md border-gray-300 pr-10 focus:border-primary focus:ring-primary sm:text-sm'
                          placeholder='1'
                          value={hours}
                          onChange={(e) => setHours(e.target.valueAsNumber)}
                        />
                        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
                          <ClockIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                        </div>
                      </div>
                    </div>
                    <div className='mt-2 hidden'>
                      <label htmlFor='message' className='block text-left text-sm font-medium text-gray-700'>
                        Сообщение
                      </label>
                      <div className='relative mt-1 rounded-md shadow-sm'>
                        <textarea
                          type='text'
                          name='message'
                          id='message'
                          className='block w-full rounded-md border-gray-300 pr-10 focus:border-primary focus:ring-primary sm:text-sm resize-none'
                          placeholder='Additional message'
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className='mt-2'>
                      <div className='block text-left text-sm font-medium text-gray-700'>Дата начала</div>
                      <DatePicker
                        className='mt-1 border-gray-300 w-full rounded-md sm:text-sm'
                        selected={startTime}
                        onChange={setStartTime}
                        minDate={new Date()}
                        showTimeSelect
                        dateFormat='Pp'
                        excludeDateIntervals={bookedDates.map((bd) => ({
                          start: new Date(bd.start_time),
                          end: new Date(bd.end_time),
                        }))}
                        excludeTimes={bookedDates.reduce(
                          (acc, bd) => acc.concat(new Date(bd.start_time), new Date(bd.end_time)),
                          []
                        )}
                        filterTime={(time) => isFuture(time)}
                      />
                    </div>
                  </div>
                </div>
                <div className='mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3'>
                  <button
                    type='button'
                    className='inline-flex w-full justify-center rounded-md border border-transparent bg-primary disabled:cursor-not-allowed px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:col-start-2 sm:text-sm'
                    onClick={() => {
                      onSubmit?.({ hours, message, startTime });
                      onClose();
                    }}
                    disabled={hours <= 0 || !isValid(startTime)}
                  >
                    Нанять
                  </button>
                  <button
                    type='button'
                    className='mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm'
                    onClick={onClose}
                    ref={cancelButtonRef}
                  >
                    Отмена
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
