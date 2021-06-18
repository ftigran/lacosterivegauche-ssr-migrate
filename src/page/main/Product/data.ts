import ImageProduct1 from '../../../imgs/tikkurila/product/product_tikkurila_harmony.png';
import ImageProduct2 from '../../../imgs/tikkurila/product/tikkurila_joker.png';
import ImageProduct3 from '../../../imgs/tikkurila/product/new_tikkurila_remontti_assa.png';
import ImageProduct4 from '../../../imgs/tikkurila/product/tikkurila_luja.png';
import ImageProduct5 from '../../../imgs/tikkurila/product/tikkurila_perfecta.png';
import ImageProduct6 from '../../../imgs/tikkurila/product/prima_9l-v2_1.png';
import ImageProduct7 from '../../../imgs/tikkurila/product/euro_smart2_3.png';
import ImageProduct8 from '../../../imgs/tikkurila/product/euro_power7_3l_web.png';
import ImageProduct9 from '../../../imgs/tikkurila/product/euro_extra20_3l_web.png';
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
    title: 'Tikkurila Harmony',
    description: 'Элегантная глубокоматовая интерьерная краска',
    link: 'https://tikkurila.ru/dlya-vashego-doma/produkty/tikkurila-harmony',
    image: ImageProduct1,
  },
  {
    id: 2,
    title: 'Tikkurila Joker',
    description: 'Долговечная и экологичная матовая интерьерная краска',
    link: 'https://tikkurila.ru/dlya-vashego-doma/produkty/tikkurila-joker',
    image: ImageProduct2,
  },
  {
    id: 3,
    title: 'Tikkurila Remontti-Ässä',
    description: 'Экстрастойкая полуматовая интерьерная краска',
    link: 'https://tikkurila.ru/dlya-vashego-doma/produkty/tikkurila-remontti-assa',
    image: ImageProduct3,
  },
  {
    id: 4,
    title: 'Tikkurila Luja 7',
    description: 'Противогрибковая матовая интерьерная краска',
    link: 'https://tikkurila.ru/dlya-vashego-doma/produkty/tikkurila-luja-7',
    image: ImageProduct4,
  },
  {
    id: 5,
    title: 'Tikkurila Perfecta',
    description: 'Износостойкая глубокоматовая интерьерная краска ',
    link: 'https://tikkurila.ru/dlya-vashego-doma/produkty/tikkurila-perfecta',
    image: ImageProduct5,
  },
  {
    id: 6,
    title: 'Tikkurila Priima',
    description: 'Глубокоматовая интерьерная краска, максимальная укрывистость в 1 слой',
    link: 'https://tikkurila.ru/dlya-vashego-doma/produkty/tikkurila-priima',
    image: ImageProduct6,
  },
  {
    id: 7,
    title: 'Tikkurila Euro Smart 2',
    description: 'Интерьерная краска для стен и потолка',
    link: 'https://tikkurila.ru/dlya-vashego-doma/produkty/tikkurila-euro-smart-2',
    image: ImageProduct7,
  },
  {
    id: 8,
    title: 'Tikkurila Euro Power 7',
    description: 'Моющаяся краска для стен и потолка',
    link: 'https://tikkurila.ru/dlya-vashego-doma/produkty/tikkurila-euro-power-7',
    image: ImageProduct8,
  },
  {
    id: 9,
    title: 'Tikkurila Euro Extra 20',
    description: 'Моющаяся краска для влажных помещений',
    link: 'https://tikkurila.ru/dlya-vashego-doma/produkty/tikkurila-euro-extra-20',
    image: ImageProduct9,
  },
];
