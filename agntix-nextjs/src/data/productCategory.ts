import cat1 from '../../public/assets/img/shop-home/category/cat-1.jpg';
import cat2 from '../../public/assets/img/shop-home/category/cat-2.jpg';
import cat3 from '../../public/assets/img/shop-home/category/cat-3.jpg';
import cat4 from '../../public/assets/img/shop-home/category/cat-4.jpg';
import cat5 from '../../public/assets/img/shop-home/category/cat-5.jpg';
import { productCategoryDT } from '@/types/custom-d-t';

export const productCategoryData: productCategoryDT[] = [
    //home shop modern product category start
    {
        id: 1,
        image: cat1,
        alt: 'Sofas',
        title: 'Sofas',
        productCount: '12 Products',
        size: 'lg',
        link: "/shop",
    },
    {
        id: 2,
        image: cat2,
        alt: 'Tables',
        title: 'Tables',
        productCount: '16 Products',
        size: 'sm',
        link: "/shop",
    },
    {
        id: 3,
        image: cat3,
        alt: 'Decor Items',
        title: 'Decor Items',
        productCount: '8 Products',
        size: 'sm',
        link: "/shop",
    },
    {
        id: 4,
        image: cat4,
        alt: 'Chairs',
        title: 'Chairs',
        productCount: '17 Products',
        size: 'sm',
        link: "/shop",
    },
    {
        id: 5,
        image: cat5,
        alt: 'Floor Lamps',
        title: 'Floor Lamps',
        productCount: '14 Products',
        size: 'sm',
        link: "/shop",
    }
    //home shop modern product category end
];