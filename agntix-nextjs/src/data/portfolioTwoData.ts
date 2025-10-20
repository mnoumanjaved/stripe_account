import image1 from '../../public/assets/img/project-slider-img/cr-slider-6.jpg';
import image2 from '../../public/assets/img/project-slider-img/cr-slider-7.jpg';
import image3 from '../../public/assets/img/project-slider-img/cr-slider-8.jpg';
import image4 from '../../public/assets/img/project-slider-img/cr-slider-9.jpg';
import image5 from '../../public/assets/img/project-slider-img/cr-slider-10.jpg';
import image6 from '../../public/assets/img/project-slider-img/cr-slider-1.jpg';

import smallImage1 from '../../public/assets/img/project-slider-img/cr-slider-small-6.jpg';
import smallImage2 from '../../public/assets/img/project-slider-img/cr-slider-small-7.jpg';
import smallImage3 from '../../public/assets/img/project-slider-img/cr-slider-small-8.jpg';
import smallImage4 from '../../public/assets/img/project-slider-img/cr-slider-small-9.jpg';
import smallImage5 from '../../public/assets/img/project-slider-img/cr-slider-small-10.jpg';
import smallImage6 from '../../public/assets/img/project-slider-img/cr-slider-small-1.jpg';
import { StaticImageData } from 'next/image';

// WebGL showcase images
import showcase_1 from '../../public/assets/img/webgl/webgl-1.jpg';
import showcase_2 from '../../public/assets/img/webgl/webgl-2.jpg';
import showcase_3 from '../../public/assets/img/webgl/webgl-3.jpg';
import showcase_4 from '../../public/assets/img/webgl/webgl-4.jpg';
import showcase_5 from '../../public/assets/img/webgl/webgl-5.jpg';
import showcase_6 from '../../public/assets/img/webgl/webgl-6.jpg';

// Skew slider images
import skewImage1 from '../../public/assets/img/slider-img/skew-1.jpg';
import skewImage2 from '../../public/assets/img/slider-img/skew-2.jpg';
import skewImage3 from '../../public/assets/img/slider-img/skew-3.jpg';
import skewImage4 from '../../public/assets/img/slider-img/skew-4.jpg';
import skewImage5 from '../../public/assets/img/slider-img/skew-5.jpg';
import skewImage6 from '../../public/assets/img/slider-img/skew-6.jpg';

// portfolio wrapper slider images
import port_sm_1 from "../../public/assets/img/portfolio/wrapper-slider/wrapper-sm-1.jpg";
import port_sm_2 from "../../public/assets/img/portfolio/wrapper-slider/wrapper-sm-2.jpg";
import port_sm_3 from "../../public/assets/img/portfolio/wrapper-slider/wrapper-sm-3.jpg";
import port_sm_4 from "../../public/assets/img/portfolio/wrapper-slider/wrapper-sm-4.jpg";
import port_sm_5 from "../../public/assets/img/portfolio/wrapper-slider/wrapper-sm-5.jpg";

//portfolio details image comparison
import thumb1 from "../../public/assets/img/portfolio/portfolio-details-6/portfolio-details-thumb-1.jpg";
import thumb2 from "../../public/assets/img/portfolio/portfolio-details-6/portfolio-details-thumb-2.jpg";
import thumb3 from "../../public/assets/img/portfolio/portfolio-details-6/portfolio-details-thumb-3.jpg";
import thumb4 from "../../public/assets/img/portfolio/portfolio-details-6/portfolio-details-thumb-4.jpg";
import thumb5 from "../../public/assets/img/portfolio/portfolio-details-6/portfolio-details-thumb-5.jpg";

//portfolio details image comparison
import bgImg1 from "../../public/assets/img/project-slider-img/cr-slider-7.jpg";
import bgImg2 from "../../public/assets/img/project-slider-img/cr-slider-1.jpg";
import bgImg3 from "../../public/assets/img/project-slider-img/cr-slider-6.jpg";
import bgImg4 from "../../public/assets/img/project-slider-img/cr-slider-8.jpg";
import bgImg5 from "../../public/assets/img/project-slider-img/cr-slider-9.jpg";

//portfolio details image comparison
import smallbgImg1 from "../../public/assets/img/project-slider-img/cr-slider-1.jpg";
import smallbgImg2 from "../../public/assets/img/project-slider-img/cr-slider-7.jpg";
import smallbgImg3 from "../../public/assets/img/project-slider-img/cr-slider-8.jpg";
import smallbgImg4 from "../../public/assets/img/project-slider-img/cr-slider-9.jpg";
import smallbgImg5 from "../../public/assets/img/project-slider-img/cr-slider-10.jpg";

// portfolio slider elegant image
import port1 from "../../public/assets/img/project-slider-img/portfolio-slider-5/port-7.jpg";
import port2 from "../../public/assets/img/project-slider-img/portfolio-slider-5/port-6.jpg";
import port3 from "../../public/assets/img/project-slider-img/portfolio-slider-5/port-5.jpg";
import port4 from "../../public/assets/img/project-slider-img/portfolio-slider-5/port-4.jpg";

interface PortfolioItem {
    id: number;
    image: StaticImageData;
    smallImage: StaticImageData;
    name: string;
    link: string;
}


export const portfolioThumbSliderItems: PortfolioItem[] = [
    {
        id: 1,
        image: image1,
        smallImage: smallImage1,
        name: 'Jon Piterson',
        link: '/portfolio-details-image-comparison'
    },
    {
        id: 2,
        image: image2,
        smallImage: smallImage2,
        name: 'Jean Gomez',
        link: '/portfolio-details-image-comparison'
    },
    {
        id: 3,
        image: image3,
        smallImage: smallImage3,
        name: 'Katia Ivanova',
        link: '/portfolio-details-image-comparison'
    },
    {
        id: 4,
        image: image4,
        smallImage: smallImage4,
        name: 'Adaora Musa',
        link: '/portfolio-details-image-comparison'
    },
    {
        id: 5,
        image: image5,
        smallImage: smallImage5,
        name: 'Mia Tobez',
        link: '/portfolio-details-image-comparison'
    },
    {
        id: 6,
        image: image6,
        smallImage: smallImage6,
        name: 'Anni Marire',
        link: '/portfolio-details-image-comparison'
    }
];

// Portfolio WebGL slides data
export const portfolioWebglSlides = [
    { id: 0, active: true, title: "Top Paddock" },
    { id: 1, active: false, title: "Stickers Pack" },
    { id: 2, active: false, title: "Diseno Grafico" },
    { id: 3, active: false, title: "Bright Cap" },
    { id: 4, active: false, title: "Grafico Jan" },
    { id: 5, active: false, title: "Bright Cap" }
].map(item => ({
    ...item,
    categories: ["UI", "Web Design"],
    link: "/portfolio-details-classic-stack-light"
}));

// slider images
export const sliderImages = [showcase_1, showcase_2, showcase_3, showcase_4, showcase_5, showcase_6];

// Portfolio WebGL slides data end


export const skewSliderData = [
    {
        image: skewImage1,
        category: 'Digital platform',
        title: ['simple', 'logistics'],
        isSpanInTitle: true
    },
    {
        image: skewImage2,
        category: 'Digital platform',
        title: ['Smart', 'platform']
    },
    {
        image: skewImage3,
        category: 'Digital platform',
        title: ['Royal', 'Benz']
    },
    {
        image: skewImage4,
        category: 'Digital platform',
        title: ['World\'s', 'Relays']
    },
    {
        image: skewImage5,
        category: 'Digital platform',
        title: ['Bright', 'Captive']
    },
    {
        image: skewImage6,
        category: 'Interactive Mind',
        title: ['Bright', 'Mind']
    }
];


// Data for portfolio creative text slider items 
export const textSliderItems = [
    { bgImage: bgImg1 },
    { bgImage: bgImg2 },
    { bgImage: bgImg3 },
    { bgImage: bgImg4 },
    { bgImage: bgImg5 }
];

export const textSmallSliderItems = [
    { bgImage: smallbgImg1 },
    { bgImage: smallbgImg2 },
    { bgImage: smallbgImg3 },
    { bgImage: smallbgImg4 },
    { bgImage: smallbgImg5 }
];

export const textPortfolioItems = [
    { name: 'Sagor Mahmud', link: '/portfolio-details-classic-stack-light' },
    { name: 'Jean Gomez', link: '/portfolio-details-classic-stack-light' },
    { name: 'Katia Ivanova', link: '/portfolio-details-classic-stack-light' },
    { name: 'Adaora Musa', link: '/portfolio-details-classic-stack-light' },
    { name: 'Mia Petković', link: '/portfolio-details-classic-stack-light' }
];
// Data for portfolio creative text slider items end

export const parallaxSlideItems = [
    {
        backgroundImage: "assets/img/project-slider-img/portfolio-slider-3/portfolio-2.jpg",
        subtitle: "Brain Lara",
        title: "Retouch Photo",
        filterId: "buttonFilter3"
    },
    {
        backgroundImage: "assets/img/project-slider-img/portfolio-slider-3/portfolio-1.jpg",
        subtitle: "Jone Deo",
        title: "Dinámica",
        filterId: "buttonFilter4"
    },
    {
        backgroundImage: "assets/img/project-slider-img/portfolio-slider-3/portfolio-3.jpg",
        subtitle: "Farhan Firoz",
        title: "Lifestyle App",
        filterId: "buttonFilter5"
    },
    {
        backgroundImage: "assets/img/project-slider-img/portfolio-slider-3/portfolio-4.jpg",
        subtitle: "Thomas Alvi",
        title: "World's Relays",
        filterId: "buttonFilter9"
    },
    {
        backgroundImage: "assets/img/project-slider-img/portfolio-slider-3/portfolio-5.jpg",
        subtitle: "Benzama Khalil",
        title: "Stickers Pack",
        filterId: "buttonFilter6"
    },
    {
        backgroundImage: "assets/img/project-slider-img/portfolio-slider-3/portfolio-6.jpg",
        subtitle: "Orpa Tomez",
        title: "Diseño Gráfico",
        filterId: "buttonFilter7"
    }
];



//portfolio wrapper slider
// slider data
export const sliderData = [
    {
        id: 1,
        bg: "/assets/img/portfolio/wrapper-slider/wrapper-big-1.jpg",
        subtitle: "Digital Design",
        year: "2024",
        title: "Fashion <br> Sentence",
        link: "/portfolio-details-creative-slider-light"
    },
    {
        id: 2,
        bg: "/assets/img/portfolio/wrapper-slider/wrapper-big-2.jpg",
        subtitle: "Digital Design",
        year: "2022",
        title: "Chania <br> Tourism",
        link: "/portfolio-details-creative-slider-light"
    },
    {
        id: 3,
        bg: "/assets/img/portfolio/wrapper-slider/wrapper-big-3.jpg",
        subtitle: "Digital Design",
        year: "2021",
        title: "Kiteboard <br> action",
        link: "/portfolio-details-creative-slider-light"
    },
    {
        id: 4,
        bg: "/assets/img/portfolio/wrapper-slider/wrapper-big-4.jpg",
        subtitle: "Digital Design",
        year: "2021",
        title: "Headphones <br> Cheap",
        link: "/portfolio-details-creative-slider-light"
    },
    {
        id: 5,
        bg: "/assets/img/portfolio/wrapper-slider/wrapper-big-5.jpg",
        subtitle: "Digital Design",
        year: "2021",
        title: "Zon <br> Robinson",
        link: "/portfolio-details-creative-slider-light"
    },
];
// slider thumbs
export const sliderThumbs = [
    {
        id: 1,
        img: port_sm_1,
        subtitle: "Digital Design",
        year: "2024",
        title: "Fashion Sentence",
        link: "/portfolio-details-creative-slider-light"
    },
    {
        id: 2,
        img: port_sm_2,
        subtitle: "Digital Design",
        year: "2022",
        title: "Chania Tourism",
        link: "/portfolio-details-creative-slider-light"
    },
    {
        id: 3,
        img: port_sm_3,
        subtitle: "Digital Design",
        year: "2021",
        title: "Kiteboard action",
        link: "/portfolio-details-creative-slider-light"
    },
    {
        id: 4,
        img: port_sm_4,
        subtitle: "Digital Design",
        year: "2021",
        title: "Headphones Cheap",
        link: "/portfolio-details-creative-slider-light"
    },
    {
        id: 5,
        img: port_sm_5,
        subtitle: "Digital Design",
        year: "2021",
        title: "Zon Robinson",
        link: "/portfolio-details-creative-slider-light"
    },
];
// portfolio slider elegant data
export const portfolioSliderElegantData = [
    {
        img: port1,
        title: "Brand promotion",
        href: "/portfolio-details-gallery-light",
    },
    {
        img: port2,
        title: "Commercial",
        href: "/portfolio-details-gallery-light",
    },
    {
        img: port3,
        title: "Wedding",
        href: "/portfolio-details-gallery-light",
    },
    {
        img: port4,
        title: "Portrait",
        href: "/portfolio-details-gallery-light",
    },
];

export const portfolioDetailsImgSlider = [thumb1, thumb2, thumb3, thumb4, thumb5];