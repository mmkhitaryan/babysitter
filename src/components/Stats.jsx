const stats = [
  { id: 1, name: 'Няни на платформе', value: '8,000+' },
  { id: 2, name: 'Единая плата за платформу', value: '3%' },
  { id: 3, name: 'Гарантия бесперебойной работы', value: '99.9%' },
  { id: 4, name: 'Выплачено нашим пользователям', value: '$70M' },
];

const Stats = () => {
  return (
    <div className='bs-container'>
      <div className='mx-auto max-w-2xl lg:max-w-none'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>Доверие семей по всему миру</h2>
          <p className='mt-4 text-lg leading-8 text-gray-600'>
            Lorem ipsum dolor sit amet consect adipisicing possimus.
          </p>
        </div>
        <dl className='mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4'>
          {stats.map((stat) => (
            <div key={stat.id} className='flex flex-col p-8'>
              <dt className='text-sm font-semibold leading-6 text-primary'>{stat.name}</dt>
              <dd className='order-first text-3xl font-semibold tracking-tight text-gray-900'>{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default Stats;
