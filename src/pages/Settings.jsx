import useProfile from '@/hooks/useProfile';
import BabysitterForm from '@/components/BabysitterForm';
import FamilyForm from '@/components/FamilyForm';
import Heading from '@/components/Heading';
import { m } from 'framer-motion';

const Settings = () => {
  const { data } = useProfile();

  return (
    <m.main initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1 , y: 0}} className='bs-container'>
      <Heading title='Настройки' />
      {data?.user_type === 1
        ? data?.babysitter && <BabysitterForm data={data?.babysitter} />
        : data?.family && <FamilyForm data={data?.family} />}
    </m.main>
  );
};

export default Settings;
