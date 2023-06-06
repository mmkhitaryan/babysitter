import useTitle from '@/hooks/useTitle';

const Heading = ({ title }) => {
  useTitle(title);

  return <h1 className='text-2xl font-semibold mb-6'>{title}</h1>;
};

export default Heading;
