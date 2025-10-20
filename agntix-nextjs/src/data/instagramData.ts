 
// Import all main Instagram images
import instagram1 from '../../public/assets/img/home-07/instagram/instagram-1.jpg';
import instagram2 from '../../public/assets/img/home-07/instagram/instagram-2.jpg';
import instagram3 from '../../public/assets/img/home-07/instagram/instagram-3.jpg';
import instagram4 from '../../public/assets/img/home-07/instagram/instagram-4.jpg';
import instagram5 from '../../public/assets/img/home-07/instagram/instagram-5.jpg';
import instagram6 from '../../public/assets/img/home-07/instagram/instagram-6.jpg';

// Import all popup Instagram images
import instagram1Popup from '../../public/assets/img/home-07/instagram/instagram-1-1.jpg';
import instagram2Popup from '../../public/assets/img/home-07/instagram/instagram-2-2.jpg';
import instagram3Popup from '../../public/assets/img/home-07/instagram/instagram-3-3.jpg';
import instagram4Popup from '../../public/assets/img/home-07/instagram/instagram-4-4.jpg';
import instagram5Popup from '../../public/assets/img/home-07/instagram/instagram-5-5.jpg';
import instagram6Popup from '../../public/assets/img/home-07/instagram/instagram-6-6.jpg';
import { StaticImageData } from 'next/image';

// Define type for Instagram post
interface InstagramPost {
    id: number;
    image: StaticImageData;
    popupImage: StaticImageData;
    altText: string;
}

 // Instagram post data with imported images
    const instagramPosts: InstagramPost[] = [
        {
            id: 1,
            image: instagram1,
            popupImage: instagram1Popup,
            altText: 'Instagram post 1'
        },
        {
            id: 2,
            image: instagram2,
            popupImage: instagram2Popup,
            altText: 'Instagram post 2'
        },
        {
            id: 3,
            image: instagram3,
            popupImage: instagram3Popup,
            altText: 'Instagram post 3'
        },
        {
            id: 4,
            image: instagram4,
            popupImage: instagram4Popup,
            altText: 'Instagram post 4'
        },
        {
            id: 5,
            image: instagram5,
            popupImage: instagram5Popup,
            altText: 'Instagram post 5'
        },
        {
            id: 6,
            image: instagram6,
            popupImage: instagram6Popup,
            altText: 'Instagram post 6'
        },
        {
            id: 7,
            image: instagram3,
            popupImage: instagram3Popup,
            altText: 'Instagram post 7'
        }
    ];

    export default instagramPosts;