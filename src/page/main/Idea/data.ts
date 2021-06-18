import ImageProduct1 from '../../../imgs/tikkurila/idea/idea_tikkurila_harmony.png';
import ImageProduct2 from '../../../imgs/tikkurila/idea/idea_tikkurila_joker.png';
import ImageProduct3 from '../../../imgs/tikkurila/idea/idea_tikkurila_remontti_assa.png';
import ImageProduct4 from '../../../imgs/tikkurila/idea/ide_kabinet.png';
import ImageProduct5 from '../../../imgs/tikkurila/idea/idea_kuhni.png';
import ImageProduct6 from '../../../imgs/tikkurila/idea/idea_zag_dom.png';
export type ProductInfo = {
  id: number;
  title: string;
  description: string;
  link: string;
  image: string;
};

export const data: Array<ProductInfo> = [
  {
    id: 1,
    title: 'Гостиная',
    description:
      'От городской уютной гостиной до загородного дома в стиле кантри – ' +
      'воплотите любые идеи с красками Tikkurila',
    link: 'https://tikkurila.ru/idei/idei-dlya-gostinoy',
    image: ImageProduct1,
  },
  {
    id: 2,
    title: 'Спальня',
    description:
      'Подберите цвета, материалы и текстуры, чтобы создать гармоничное пространство спальни, ' +
      'которое подходит именно вам.',
    link: 'https://tikkurila.ru/idei/idei-dlya-spalni',
    image: ImageProduct2,
  },
  {
    id: 3,
    title: 'Детская',
    description: 'Превратите детскую комнату в красочный сказочный мир вместе с Tikkurila!',
    link: 'https://tikkurila.ru/idei/idei-okraski-dlya-detskoy-komnaty',
    image: ImageProduct3,
  },
  {
    id: 4,
    title: 'Кабинет',
    description:
      'Палитры цветов Tikkurila позволят создать обстановку ' +
      'для активной работы или спокойной концентрации мысли.',
    link: 'https://tikkurila.ru/idei/idei-dlya-kabineta',
    image: ImageProduct4,
  },
  {
    id: 5,
    title: 'Кухня',
    description: 'Проявите креативность на кухне и в столовой, просто добавив цвета!',
    link: 'https://tikkurila.ru/idei/idei-dlya-kukhni',
    image: ImageProduct5,
  },
  {
    id: 6,
    title: 'Терраса и загородный дом',
    description:
      'Источники вдохновения, практические советы по реализации идей ' +
      ' и продукты для окраски вашего загородного дома и террасы.',
    link: 'https://tikkurila.ru/idei/idei-dlya-terrasy-i-zagorodnogo-doma',
    image: ImageProduct6,
  },
];
