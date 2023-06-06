import useSendOTP from '@/hooks/useSendOTP';
import { useForm } from 'react-hook-form';
import classcat from 'classcat';
import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import useLogin from '@/hooks/useLogin';
import { useAuthContext } from '@/context/Auth';
import { withHookFormMask } from 'use-mask-input';
import ErrorMessage from '@/components/ErrorMessage';
import useTitle from '@/hooks/useTitle';

const types = [
  { id: 'b', name: 'Няня' },
  { id: 'f', name: 'Семья' },
];

const Login = () => {
  useTitle('Вход');

  const { handleSubmit, register, setValue, watch } = useForm({
    defaultValues: {
      phoneNumber: '',
      otp: '',
      csrf: '',
      type: 'f',
    },
  });

  const [isRegistered, setIsRegistered] = useState(false);

  const { logIn } = useAuthContext();
  const { mutate: sendOTP, isSuccess: isOTPSent, isLoading: isSendingOTP, reset } = useSendOTP();
  const { mutate: signIn, isLoading: isLoginIn, error } = useLogin();

  const onSubmit = (data) => {
    if (isOTPSent) {
      signIn(
        {
          challenge_token: data.csrf,
          phone: data.phoneNumber,
          sms_code: data.otp,
          account_type: isRegistered ? undefined : data.type === 'b' ? 1 : 2,
        },
        {
          onSuccess: ({ token }) => {
            logIn(token);
          },
        }
      );
    } else {
      sendOTP(data.phoneNumber, {
        onSuccess: ({ challenge_token: csrf, is_registered: isRegistered }) => {
          setIsRegistered(isRegistered);
          setValue('csrf', csrf);
        },
      });
    }
  };

  return (
    <m.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='flex h-1/2 items-center justify-center py-12 px-4 sm:px-6 lg:px-8'
    >
      <div className='w-full max-w-md space-y-8'>
        <div>
          <h2 className='text-center text-3xl font-bold tracking-tight'>Войти в свой аккаунт</h2>
          <AnimatePresence>
            {isOTPSent && !isRegistered && (
              <m.p
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: 'easeInOut' }}
                className='mt-2 text-center text-sm text-gray-600'
              >
                Похоже, вы здесь впервые! Пожалуйста, зарегистрируйте учетную запись, чтобы продолжить.
              </m.p>
            )}
          </AnimatePresence>
        </div>
        <form className='mt-8 space-y-6' onSubmit={handleSubmit(onSubmit)}>
          <div className='-space-y-px rounded-md shadow-sm'>
            <div>
              <label htmlFor='phoneNumber' className='sr-only'>
                Номер телефона
              </label>
              <input
                id='phoneNumber'
                type='tel'
                autoComplete='tel'
                className={classcat([
                  'relative block w-full appearance-none rounded-none rounded-t-2xl border border-gray-300 px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm',
                  !isOTPSent && 'rounded-b-2xl',
                ])}
                placeholder='Номер телефона'
                autoFocus
                {...withHookFormMask(
                  register('phoneNumber', {
                    required: true,
                    minLength: 11,
                  }),
                  ['87999999999'],
                  {
                    placeholder: '',
                  }
                )}
                disabled={isOTPSent}
              />
            </div>
            <AnimatePresence>
              {isOTPSent && (
                <m.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ ease: 'easeInOut' }}
                >
                  <label htmlFor='otp' className='sr-only'>
                    Одноразовый пароль
                  </label>
                  <input
                    id='otp'
                    type='text'
                    autoComplete='one-time-code'
                    className='relative block w-full appearance-none rounded-none rounded-b-2xl border border-gray-300 px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm'
                    placeholder='Одноразовый пароль'
                    autoFocus
                    {...register('otp', {
                      required: true,
                    })}
                  />
                </m.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {!isRegistered && isOTPSent && (
              <m.fieldset
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: 'easeInOut' }}
              >
                <legend className='sr-only'>Тип аккаунта</legend>
                <div className='space-y-3'>
                  {types.map((type) => (
                    <div key={type.id} className='relative flex items-start'>
                      <div className='flex h-5 items-center'>
                        <input
                          id={type.id}
                          type='radio'
                          className='h-4 w-4 border-primary text-primary focus:ring-primary'
                          checked={watch('type') === type.id}
                          onChange={() => {
                            setValue('type', type.id);
                          }}
                        />
                      </div>
                      <div className='ml-3 text-sm w-full'>
                        <label htmlFor={type.id} className='font-medium'>
                          {type.name}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </m.fieldset>
            )}
          </AnimatePresence>

          <div className='space-y-3'>
            <button
              type='submit'
              className='group relative flex w-full justify-center rounded-2xl border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
              disabled={isSendingOTP || isLoginIn}
            >
              {isOTPSent ? (isRegistered ? 'Войти' : 'Зарегистрироваться') : 'Войти'}
            </button>

            {isOTPSent && (
              <button
                type='button'
                className='group relative flex w-full justify-center rounded-2xl border border-transparent bg-negative py-2 px-4 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
                onClick={reset}
              >
                Поменять номер
              </button>
            )}
          </div>
        </form>
        <ErrorMessage>{error?.response?.data?.non_field_errors?.[0]}</ErrorMessage>
      </div>
    </m.main>
  );
};

export default Login;
