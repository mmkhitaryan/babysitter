import useTitle from '@/hooks/useTitle';
import { m } from 'framer-motion';

const Terms = () => {
  useTitle('Правила пользования');

  return (
    <m.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='bs-container'>
      <article className='prose'>
        <h1>Правила пользования</h1>
        <p>
          Добро пожаловать на наш сервис найма нянек онлайн! Ниже приведены основные правила использования нашего
          сервиса, которые помогут вам получить наилучший опыт пользования:
        </p>
        <ol>
          <li>
            Регистрация и профиль:
            <ul>
              <li>Для использования нашего сервиса необходимо зарегистрироваться и создать профиль.</li>
              <li>Вы должны предоставить достоверные и точные данные при заполнении профиля.</li>
              <li>
                При создании профиля вы можете указать свои предпочтения относительно нянек, чтобы мы могли предложить
                вам подходящие варианты.
              </li>
            </ul>
          </li>
          <li>
            Поиск и выбор няни:
            <ul>
              <li>
                Наш сервис предоставляет вам возможность просматривать профили доступных нянек и контактировать с ними.
              </li>
              <li>
                Вы можете использовать нашу систему фильтров для уточнения поиска и настройки параметров, таких как
                географическое местоположение, опыт работы и т.д.
              </li>
              <li>
                Рекомендуется провести собеседование и проверить референции няни, чтобы удостовериться в ее надежности и
                соответствии вашим потребностям.
              </li>
            </ul>
          </li>
          <li>
            Контракт и оплата:
            <ul>
              <li>
                Перед тем как няня начнет работу, рекомендуется заключить контракт, в котором указаны условия работы,
                график, оплата и другие соглашения.
              </li>
              <li>
                Оплата за услуги няни осуществляется непосредственно между вами и няней. Мы не принимаем оплату через
                нашу платформу.
              </li>
              <li>Рекомендуется обсудить детали оплаты и способы расчета заранее, чтобы избежать недоразумений.</li>
            </ul>
          </li>
          <li>
            Отзывы и рейтинги:
            <ul>
              <li>После завершения работы с няней, вы можете оставить отзыв о ней и поставить рейтинг.</li>
              <li>
                Отзывы и рейтинги помогут другим пользователям нашего сервиса выбрать подходящую няню и повысят уровень
                доверия к ней.
              </li>
              <li>
                Мы стремимся поддерживать высокий стандарт качества нашего сервиса, поэтому негативные отзывы или жалобы
                на няню могут повлечь за собой ее исключение из нашей платформы.
              </li>
            </ul>
          </li>
          <li>
            Конфиденциальность и безопасность:
            <ul>
              <li>
                Мы обеспечиваем защиту вашей личной информации и не передаем ее третьим лицам без вашего согласия.
              </li>
              <li>
                При общении с няней рекомендуется не раскрывать конфиденциальные данные, такие как адрес, финансовые
                сведения и прочие личные данные.
              </li>
            </ul>
          </li>
        </ol>

        <p>
          Пожалуйста, учтите, что наши правила могут быть дополнены или изменены в будущем, чтобы улучшить качество
          предоставляемых услуг. Если у вас возникли вопросы или проблемы, не стесняйтесь обращаться в нашу службу
          поддержки. Спасибо за использование нашего сервиса найма нянек онлайн!
        </p>
      </article>
    </m.main>
  );
};

export default Terms;
