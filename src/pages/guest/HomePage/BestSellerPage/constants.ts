import { Card, Card2 } from './types';
import inspo1 from '~/assets/our-menu.png';
import inspo2 from '~/assets/our-shop.png';
import inspo3 from '~/assets/best-seller.png';
import inspo4 from '~/assets/most-loved.png';
import inspo5 from '~/assets/24-hours.png';
import wo1 from '~/assets/safety-food.png';
import wo2 from '~/assets/daily-discounts.png';
import wo3 from '~/assets/live-tracing.png';
import wo4 from '~/assets/quick-delivery.png';

export const cardData: Card[] = [
    { image: inspo1, title: 'Our Menu!', link: '/restaurants/our_menu' },
    { image: inspo2, title: 'Our Shop!', link: '/restaurants/our_shop' },
    { image: inspo3, title: 'Best Seller', link: '/restaurants/best_seller' },
    { image: inspo4, title: 'Most Loved', link: '/restaurants/most_loved' },
    { image: inspo5, title: '24 Hours', link: '/restaurants/24_hours' },
];
export const cardData2: Card2[] = [
    { image: wo1 },
    { image: wo2 },
    { image: wo3 },
    { image: wo4 },
];
