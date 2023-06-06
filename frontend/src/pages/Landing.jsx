import FeatureSections from '@/components/FeatureSections';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Testimonials from '@/components/Testimonials';
import useTitle from '@/hooks/useTitle';
import { m } from 'framer-motion';

const Landing = () => {
  useTitle('Главное');

  return (
    <m.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='space-y-24 sm:space-y-32'>
      <Hero />
      <Stats />
      <FeatureSections />
      <Testimonials />
    </m.main>
  );
};

export default Landing;
