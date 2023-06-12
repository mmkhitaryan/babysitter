import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Надежность',
    description:
      'Наши няни проходят строгий отбор и проверку на судимость, что гарантирует безопасность вашего ребенка.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Безопасность',
    description:
      'Всем нашим няням мы гарантируем медицинский осмотр, что обеспечивает безопасность вашего ребенка в случае возникновения каких-либо проблем со здоровьем.',
    icon: LockClosedIcon,
  },
  {
    name: 'Профессиональная забота',
    description:
      'Все наши няни имеют высокую квалификацию и опыт работы с детьми разного возраста, что гарантирует профессиональную заботу о вашем ребенке.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Свобода действий',
    description:
      'Благодаря нашим услугам вы можете спокойно заниматься своими делами, не беспокоясь о безопасности и заботе о своем ребенке.',
    icon: FingerPrintIcon,
  },
];

const FeatureSections = () => {
  return (
    <div className='bs-container'>
      <div className='mx-auto max-w-2xl lg:text-center'>
        <h2 className='text-base font-semibold leading-7 text-primary'>Почему Baby Bee?</h2>
        <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
          Наши преимущества:
        </p>
      </div>
      <div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl'>
        <dl className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16'>
          {features.map((feature) => (
            <div key={feature.name} className='relative pl-16'>
              <dt className='text-base font-semibold leading-7 text-gray-900'>
                <div className='absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-negative'>
                  <feature.icon className='h-6 w-6 text-white' aria-hidden='true' />
                </div>
                {feature.name}
              </dt>
              <dd className='mt-2 text-base leading-7 text-gray-600'>{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default FeatureSections;
