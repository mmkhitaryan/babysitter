import { Controller, useForm } from 'react-hook-form';
import useUpdateBabysitter from '@/hooks/useUpdateBabysitter';
import useUpdateBabysitterAvatar from '@/hooks/useUpdateBabysitterAvatar';
import { useState } from 'react';
import { lightFormat, subYears } from 'date-fns';
import ModalImage from 'react-modal-image';
import useCertificates from '@/hooks/useCertificates';
import useUploadCertificate from '@/hooks/useUploadCertificate';
import useDeleteCertificate from '@/hooks/useDeleteCertificate';
import { useNavigate } from 'react-router-dom';
import useAddresses from '@/hooks/useAddresses';
import Select from 'react-select';
import classcat from 'classcat';
import { toast } from 'react-hot-toast';

const BabysitterForm = ({ data }) => {
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const { control, handleSubmit, watch, register } = useForm({
    defaultValues: data,
  });

  const { data: addresses } = useAddresses();

  const { mutate, isLoading } = useUpdateBabysitter();
  const { mutate: uploadAvatar, isLoading: isUploading } = useUpdateBabysitterAvatar();

  const avatar = watch('avatar');
  const tempAvatar = file && URL.createObjectURL(file);

  const { data: certificates } = useCertificates();
  const { mutate: uploadCertificate } = useUploadCertificate();
  const { mutate: deleteCertificate } = useDeleteCertificate();

  return (
    <form
      className='space-y-8 divide-y divide-gray-200'
      onSubmit={handleSubmit((data) => {
        if (!avatar && !file) {
          toast.error('Пожалуйста загрузите аватарку');
        } else {
          if (file) {
            uploadAvatar(file, {
              onSuccess() {
                mutate(data, {
                  onSuccess() {
                    navigate('/');
                  },
                });
              },
            });
          } else {
            mutate(data, {
              onSuccess() {
                navigate('/');
              },
            });
          }
        }
      })}
    >
      <div className='space-y-8 divide-y divide-gray-200'>
        <div
          className={classcat([
            'rounded-full p-3 font-medium text-xs w-fit text-white shadow-sm',
            data.published ? 'bg-blue-500' : 'bg-red-500',
          ])}
        >
          Профиль {data.published ? 'активен' : 'неактивен'}
        </div>
        <div className='pt-8'>
          <label className='cursor-pointer'>
            <img
              className='w-20 h-20 rounded-full border border-primary object-cover object-center'
              src={tempAvatar || avatar}
            />
            <input
              type='file'
              hidden
              accept='image/*'
              disabled={isUploading}
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </label>
        </div>
        <div>
          <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
            <div className='sm:col-span-6'>
              <label htmlFor='full_name' className='bs-label'>
                ФИО
              </label>
              <div className='mt-1'>
                <input
                  type='text'
                  id='full_name'
                  autoComplete='name'
                  className='bs-input'
                  {...register('full_name', { required: true })}
                />
              </div>
            </div>

            <div className='sm:col-span-3'>
              <label htmlFor='years_of_experience' className='bs-label'>
                Опыт работы
              </label>
              <div className='mt-1'>
                <input
                  type='number'
                  id='years_of_experience'
                  className='bs-input'
                  {...register('years_of_experience', { required: true })}
                />
              </div>
            </div>

            <div className='sm:col-span-3'>
              <label htmlFor='hourly_rate' className='bs-label'>
                Часовая ставка
              </label>
              <div className='mt-1'>
                <input
                  type='number'
                  id='hourly_rate'
                  className='bs-input'
                  defaultValue={500}
                  {...register('hourly_rate', { required: true })}
                />
              </div>
            </div>

            <div className='sm:col-span-3'>
              <label htmlFor='address_type' className='bs-label'>
                Районы где можете работать
              </label>
              <div className='mt-1'>
                <Controller
                  control={control}
                  name='address_type'
                  rules={{
                    validate: (a) => a.length > 0,
                  }}
                  render={({ field: { onChange, value }, fieldState: { error } }) => {
                    const normalizeAddresses = (a) => ({ value: a.id, label: a.name });
                    return (
                      <Select
                        onChange={(value) => onChange(value.map((a) => a.value))}
                        value={addresses?.filter((a) => value.includes(a.id)).map(normalizeAddresses)}
                        options={addresses?.map(normalizeAddresses) ?? []}
                        isMulti
                        className={classcat([error && 'border border-red-500 rounded-md text-sm'])}
                      />
                    );
                  }}
                />
              </div>
            </div>

            <div className='sm:col-span-3'>
              <label htmlFor='birthday' className='bs-label'>
                День рождения
              </label>
              <div className='mt-1'>
                <input
                  type='date'
                  id='birthday'
                  className='bs-input'
                  max={lightFormat(subYears(new Date(), 18), 'yyyy-MM-dd')}
                  {...register('birthday', { required: true })}
                />
              </div>
            </div>
          </div>
          <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
            <div className='sm:col-span-3'>
              <label htmlFor='education' className='bs-label'>
                Образование
              </label>
              <div className='mt-1'>
                <select
                  id='education'
                  rows={3}
                  className='bs-input'
                  defaultValue={''}
                  {...register('education', { required: true })}
                >
                  <option value='1'>Высшее</option>
                  <option value='2'>Среднее</option>
                  <option value='3'>Неоконченное высшее</option>
                </select>
              </div>
            </div>
            <div className='sm:col-span-3'>
              <label htmlFor='gender' className='bs-label'>
                Пол
              </label>
              <div className='mt-1'>
                <select id='gender' rows={3} className='bs-input' {...register('gender')}>
                  <option value='true'>Мужской</option>
                  <option value='false'>Женский</option>
                </select>
              </div>
            </div>
            <div className='sm:col-span-6'>
              <label htmlFor='bio' className='bs-label'>
                О себе
              </label>
              <div className='mt-1'>
                <textarea
                  id='bio'
                  rows={3}
                  className='bs-input'
                  defaultValue=''
                  {...register('bio', { required: true })}
                />
              </div>
              <p className='mt-2 text-sm text-gray-500'>Несколько предложении о себе.</p>
            </div>
          </div>
        </div>

        <div className='pt-8'>
          <div className='space-y-4'>
            <div className='relative flex items-start'>
              <div className='flex h-5 items-center'>
                <input
                  id='baby'
                  type='checkbox'
                  className='h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary'
                  {...register('baby')}
                />
              </div>
              <div className='ml-3 text-sm'>
                <label htmlFor='baby'>Грудничок</label>
              </div>
            </div>

            <div className='relative flex items-start'>
              <div className='flex h-5 items-center'>
                <input
                  id='detsad'
                  type='checkbox'
                  className='h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary'
                  {...register('detsad')}
                />
              </div>
              <div className='ml-3 text-sm'>
                <label htmlFor='detsad'>Ходит в дет. сад.</label>
              </div>
            </div>

            <div className='relative flex items-start'>
              <div className='flex h-5 items-center'>
                <input
                  id='threeToFive'
                  type='checkbox'
                  className='h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary'
                  {...register('threeToFive')}
                />
              </div>
              <div className='ml-3 text-sm'>
                <label htmlFor='threeToFive'>Дети от 3-х до 5 лет</label>
              </div>
            </div>
          </div>
        </div>

        <div className='pt-8'>
          <div className='bs-label'>Сертификаты</div>

          <div className='mt-2'>
            <label
              htmlFor='cert'
              className='flex items-center justify-center text-primary border-primary border-dashed border h-14 px-10 rounded-md text-sm cursor-pointer w-fit'
            >
              Нажмите сюда чтобы загрузить
            </label>
            <input
              id='cert'
              type='file'
              hidden
              accept='image/*'
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;

                if (file) {
                  const formData = new FormData();
                  formData.append('certificate_file', file);
                  uploadCertificate({ id: data.id, formData });
                }
              }}
            />
          </div>

          <div className='mt-2 flex gap-4 flex-wrap'>
            {certificates?.map((certificate) => (
              <div key={certificate.id}>
                <ModalImage
                  className='w-20 h-40 object-contain object-center bg-slate-300'
                  small={certificate?.certificate_file}
                  large={certificate?.certificate_file}
                  hideDownload
                  hideZoom
                />
                <button
                  type='button'
                  className='text-red-500 text-xs'
                  onClick={() => deleteCertificate(certificate.id)}
                >
                  Удалить
                </button>
              </div>
            ))}
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

export default BabysitterForm;
