import { Controller, useForm } from 'react-hook-form';
import useUpdateFamily from '@/hooks/useUpdateFamily';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import classcat from 'classcat';
import useAddresses from '@/hooks/useAddresses';

const FamilyForm = ({ data }) => {
  const { control, handleSubmit, register } = useForm({
    defaultValues: data,
  });
  const { data: addresses } = useAddresses();

  const { mutate, isLoading } = useUpdateFamily();

  const navigate = useNavigate();

  return (
    <form
      className='space-y-8 divide-y divide-gray-200'
      onSubmit={handleSubmit((data) => {
        mutate(data, {
          onSuccess() {
            navigate('/');
          },
        });
      })}
    >
      <div className='space-y-8 divide-y divide-gray-200'>
        <div>
          <div className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
            <div className='sm:col-span-6'>
              <label htmlFor='address' className='block text-sm font-medium text-gray-700'>
                Адрес
              </label>
              <div className='mt-1'>
                <input
                  type='text'
                  id='address'
                  autoComplete='street-address'
                  className='block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-prborder-primary sm:text-sm'
                  {...register('address', { required: true })}
                />
              </div>
            </div>
            <div className='sm:col-span-6'>
              <label htmlFor='address_type' className='bs-label'>
                Ваш район
              </label>
              <div className='mt-1'>
                <Controller
                  control={control}
                  name='address_type'
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value }, fieldState: { error } }) => {
                    const normalizeAddresses = (a) => ({ value: a.id, label: a.name });
                    const foundValue = addresses?.find((a) => value === a.id);
                    return (
                      <Select
                        onChange={(value) => onChange(value.value)}
                        value={foundValue ? normalizeAddresses(foundValue) : null}
                        options={addresses?.map(normalizeAddresses) ?? []}
                        className={classcat([error && 'border border-red-500 rounded-md text-sm'])}
                      />
                    );
                  }}
                />
              </div>
            </div>

            <div className='sm:col-span-3'>
              <label htmlFor='number_of_children' className='block text-sm font-medium'>
                Количество детей
              </label>
              <div className='mt-1'>
                <input
                  type='number'
                  id='number_of_children'
                  className='block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm'
                  {...register('number_of_children', { required: true })}
                />
              </div>
            </div>
          </div>
          <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
            <div className='sm:col-span-6'>
              <label htmlFor='special_needs' className='block text-sm font-medium'>
                Особые потребности
              </label>
              <div className='mt-1'>
                <textarea
                  id='special_needs'
                  rows={3}
                  className='block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm'
                  required
                  {...register('special_needs')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='pt-5'>
        <div className='flex justify-end'>
          <button
            type='submit'
            className='inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-smfocus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
            disabled={isLoading}
          >
            Сохранить
          </button>
        </div>
      </div>
    </form>
  );
};

export default FamilyForm;
