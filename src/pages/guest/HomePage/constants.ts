import { Card, Card2 } from './types';
import inspo1 from '~/assets/our-shop.png';
import inspo2 from '~/assets/best-seller.png';
import inspo3 from '~/assets/most-loved.png';
import wo1 from '~/assets/safety-food.png';
import wo2 from '~/assets/daily-discounts.png';
import wo3 from '~/assets/quick-delivery.png';

export const cardData: Card[] = [
    { image: inspo1, title: 'Our Shop!', link: '/restaurants/our_shop/search' },
    { image: inspo2, title: 'Best Sellers', link: '/restaurants/best_seller' },
    { image: inspo3, title: 'Most Loved', link: '/restaurants/most_loved' },
];
export const cardData2: Card2[] = [
    { image: wo1 },
    { image: wo2 },
    { image: wo3 },
];
