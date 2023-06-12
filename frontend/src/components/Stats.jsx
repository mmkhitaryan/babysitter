const stats = [
  { id: 1, name: 'Количество нянь на платформе', value: '10+' },
  { id: 2, name: 'Количество семей на платформе', value: '30+' },
  { id: 3, name: 'Гарантия бесперебойной работы', value: '99.9%' },
  { id: 4, name: 'Довольные клиеты:', value: '40+' },
];

const Stats = () => {
  return (
    <div className='bs-container'>
      <div className='mx-auto max-w-2xl lg:max-w-none'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>Статистика нашего сервиса:</h2>
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
