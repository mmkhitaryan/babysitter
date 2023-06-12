import useTitle from '@/hooks/useTitle';
import { m } from 'framer-motion';

const About = () => {
  useTitle('О нас');

  return (
    <m.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='bs-container relative'>
      <div className='lg:absolute lg:inset-0'>
        <div className='lg:absolute lg:inset-y-0 lg:left-0 lg:w-1/2'>
          <img
            className='h-56 w-full object-cover lg:absolute lg:h-full rounded-[70px] grayscale'
            src='https://images-ext-2.discordapp.net/external/O58MqBkx_t6QIx5J3aXEVHVGmkTRSDeAxa9k0EgLhx4/https/www.jdrf.org/wp-content/uploads/2020/01/bluestate_JDRF_MetaImage_B2-73.jpg?width=1158&height=650'
            alt=''
          />
        </div>
      </div>
      <div className='relative px-6 pt-12 pb-16 sm:pt-16 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:px-8'>
        <div className='lg:col-start-2 lg:pl-8'>
          <div className='mx-auto max-w-prose text-base lg:ml-auto lg:mr-0 lg:max-w-lg'>
            <h2 className='font-semibold leading-6 text-primary'>Baby Bee</h2>
            <h3 className='mt-2 text-3xl font-bold leading-8 tracking-tight sm:text-4xl'>О нашей компании:</h3>
            <p className='mt-8 text-lg text-gray-500'>
                Baby Bee — веб-сервис по поиску нянь в Казахстане, который помогает родителям найти надежный и профессиональный уход за своими детьми. Сервис предоставляет широкий выбор кандидатов, прошедших строгий отбор и имеющих опыт работы с детьми разного возраста.
              </p>
              <div className='prose prose-pink mt-5 text-gray-500'>
                <p>
                  Одной из главных особенностей Baby Bee является простота использования. Родители могут оставить заявку на сайте, указав все необходимые требования к няне. Родителям будут предложены подходящие кандидатуры, с которыми можно будет связаться и пройти собеседование.
                </p>
                <p>
                 Кроме того, Baby Bee гарантирует безопасность вашего малыша. Все няни проходят проверку на судимость и медицинское освидетельствование. Вы можете быть уверены, что ваш ребенок находится под надежной защитой и профессиональной заботой.
                </p>
                <p>
                  Baby Bee полностью бесплатный сервис для семьи. Мы берем плату только публикацию профиля верифицированной няни.
                </p>
                <p>
                  Baby Bee — это надежный и удобный сервис для родителей, которые ищут профессиональную няню в Казахстане. Сервис поможет найти идеального кандидата для вашего ребенка, а также даст полезные советы и рекомендации по уходу за ребенком. Не беспокойтесь о безопасности своего ребенка – Baby Bee гарантирует высокий уровень профессионализма и безопасности.
                </p>
            </div>
          </div>
        </div>
      </div>
    </m.main>
  );
};

export default About;
