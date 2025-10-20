
import { projectsDT } from '@/types/project-d-t';
//home main project
import project1 from "../../public/assets/img/home-01/project/project-1.jpg"
import project2 from "../../public/assets/img/home-01/project/project-2.jpg"
import project3 from "../../public/assets/img/home-01/project/project-3.jpg"
import project4 from "../../public/assets/img/home-01/project/project-4.jpg"
import project5 from "../../public/assets/img/home-01/project/project-5.jpg"
import project6 from "../../public/assets/img/home-01/project/project-6.jpg"
//home 3 project image
import project7 from "../../public/assets/img/home-03/project/project-1.jpg";
import project8 from "../../public/assets/img/home-03/project/project-2.jpg";
import project9 from "../../public/assets/img/home-03/project/project-3.jpg";

//home 4 project image
import project10 from "../../public/assets/img/home-04/project/project-4.jpg";
import project11 from "../../public/assets/img/home-04/project/project-1.jpg";
import project12 from "../../public/assets/img/home-04/project/project-3.jpg";
import project13 from "../../public/assets/img/home-04/project/project-2.jpg";

//home 5 project image
import project14 from "../../public/assets/img/home-05/project/project-1.jpg";
import project15 from "../../public/assets/img/home-05/project/project-2.jpg";
import project16 from "../../public/assets/img/home-05/project/project-3.jpg";
//home 6 project image
import project17 from "../../public/assets/img/home-06/project/project-2.jpg";
import project18 from "../../public/assets/img/home-06/project/project-3.jpg";
import project19 from "../../public/assets/img/home-06/project/project-4.jpg";
import project20 from "../../public/assets/img/home-06/project/project-1.jpg";

//home 7 project image
import project21 from "../../public/assets/img/home-08/project/project-1.jpg";
import project22 from "../../public/assets/img/home-08/project/project-2.jpg";
import project23 from "../../public/assets/img/home-08/project/project-3.jpg";
import project24 from "../../public/assets/img/home-08/project/project-4.jpg";

//home 8 project image
import project25 from "../../public/assets/img/home-07/project/project-1.jpg";
import project26 from "../../public/assets/img/home-07/project/project-2.jpg";
import project27 from "../../public/assets/img/home-07/project/project-3.jpg";
import project28 from "../../public/assets/img/home-07/project/project-4.jpg";
import project29 from "../../public/assets/img/home-07/project/project-5.jpg";
import project30 from "../../public/assets/img/home-07/project/project-6.jpg";

//home 9 project image
import project31 from "../../public/assets/img/home-09/project/project-1.png";
import project32 from "../../public/assets/img/home-09/project/project-2.png";
import project33 from "../../public/assets/img/home-09/project/project-3.png";
import project34 from "../../public/assets/img/home-09/project/project-4.png";
//home IT Solution project image
import project35 from "../../public/assets/img/home-11/project/project-1.jpg";
import project36 from "../../public/assets/img/home-11/project/project-2.jpg";
import project37 from "../../public/assets/img/home-11/project/project-3.jpg";
import project38 from "../../public/assets/img/home-11/project/project-4.jpg";

// Home Personal Portfolio Project image
import project40 from '../../public/assets/img/home-04/project/project-5.jpg';
import project41 from '../../public/assets/img/home-04/project/project-6.jpg';
import project42 from '../../public/assets/img/home-04/project/project-7.jpg';

//portfolio metro images
import portfolioThumb21 from '../../public/assets/img/home-05/project/project-1.jpg';
import portfolioThumb22 from '../../public/assets/img/home-05/project/project-2.jpg';
import portfolioThumb23 from '../../public/assets/img/home-05/project/project-3.jpg';
import portfolioThumb24 from '../../public/assets/img/home-05/project/project-4.jpg';
import portfolioThumb25 from '../../public/assets/img/home-05/project/project-5.jpg';

export const projectsData: projectsDT[] = [
    {
        id: 1,
        title: "Acme Studio",
        image: project1,
        categories: ["Product Design", "Branding", "Creative"],
        link: "/portfolio-details-gallery-light",
    },
    {
        id: 2,
        title: "Digital Farming",
        image: project4,
        categories: ["Product Design", "Branding", "Creative"],
        link: "/portfolio-details-gallery-light",

    },
    {
        id: 3,
        title: "Grace Clinic",
        image: project2,
        categories: ["Creative", "Branding", "Development"],
        link: "/portfolio-details-gallery-light",
    },
    {
        id: 4,
        title: "Virtual Reality",
        image: project5,
        categories: ["Product Design", "Branding", "Creative"],
        link: "/portfolio-details-gallery-light",
    },
    {
        id: 5,
        title: "Smart Cities",
        image: project3,
        categories: ["Product Design", "Branding", "Creative"],
        link: "/portfolio-details-gallery-light",
    },
    {
        id: 6,
        title: "Cloud Computing",
        image: project6,
        categories: ["Product Design", "Branding", "Creative"],
        link: "/portfolio-details-gallery-light",
    },
    //home three project data start
    {
        id: 7,
        image: project7,
        title: "Avocado Cutter",
        description: "Digital marketing",
        link: "/portfolio-details-classic-stack-light"
    },
    {
        id: 8,
        image: project8,
        title: "Slice. Pit. Scoop.",
        description: "Digital marketing",
        link: "/portfolio-details-classic-stack-light"
    },
    {
        id: 9,
        image: project9,
        title: "Your guac's best friend.",
        description: "Digital marketing",
        link: "/portfolio-details-classic-stack-light"
    },
    {
        id: 10,
        image: project7,
        title: "Perfect halves, every time.",
        description: "Digital marketing",
        link: "/portfolio-details-classic-stack-light"
    },
    {
        id: 11,
        image: project8,
        title: "Three tools. One cutter.",
        description: "Digital marketing",
        link: "/portfolio-details-classic-stack-light"
    },
    {
        id: 12,
        image: project9,
        title: "Avocado Cutter",
        description: "Digital marketing",
        link: "/portfolio-details-classic-stack-light"
    },
    //home four project data start
    // projectLeft data
    {
        id: 13,
        image: project12,
        categories: ["Website", "SEO", "Business"],
        year: "2025",
        client: "Agntix",
        title: "Urban Green Spaces",
        link: "/portfolio-details-classic-stack-light",
    },
    {
        id: 14,
        image: project10,
        categories: ["Website", "SEO", "Business"],
        year: "2025",
        client: "Agntix",
        title: "Logistics Made Simple",
        link: "/portfolio-details-classic-stack-light",

    },
    {
        id: 15,
        image: project11,
        categories: ["Website", "SEO", "Business-light"],
        year: "2025",
        client: "Agntix",
        title: "AI in Healthcare",
        link: "/portfolio-details-classic-stack-light",
    },
    {
        id: 16,
        image: project13,
        categories: ["Website", "SEO", "Business"],
        year: "2025",
        client: "Agntix",
        title: "Social Media Impact",
        link: "/portfolio-details-classic-stack-light",
    },
    //home four project data end

    //home five light project data start
    {
        id: 17,
        title: "imusic",
        services: "Research, UX, UI Design",
        image: project14,
        layout: "left",
        hasLineBreak: false,
        link: "/portfolio-details-modern-light",
    },
    {
        id: 18,
        title: "simple logistics",
        services: "Research, UX, UI Design",
        image: project15,
        hasLineBreak: true,
        contentClass: "pl-200",
        link: "/portfolio-details-modern-light"
    },
    {
        id: 19,
        title: "genesis",
        services: "Research, UX, UI Design",
        image: project16,
        layout: "left",
        hasLineBreak: false,
        link: "/portfolio-details-modern-light",
    },
    //home five light project data end
    //home Six light project data Start
    {
        id: 20,
        number: '01',
        title: 'Simple Logistics',
        services: 'Supply Chain Platform',
        image: project17,
        link: '/portfolio-details-gallery-light',
    },
    {
        id: 21,
        number: '02',
        title: 'Made Logistics',
        services: 'Enterprise Solution',
        image: project18,
        link: '/portfolio-details-gallery-light',
    },
    {
        id: 22,
        number: '03',
        title: 'UX Design System',
        services: 'Design Framework',
        image: project19,
        link: '/portfolio-details-gallery-light',
    },
    {
        id: 23,
        number: '04',
        title: 'Mobile Banking App',
        services: 'Fintech Solution',
        image: project20,
        link: '/portfolio-details-gallery-light',
    },
    //home Six light project data end

    //home Seven light project data start
    {
        id: 24,
        title: 'Interior design',
        year: '2025',
        image: project21,
        altText: 'Interior design project',
        link: '/portfolio-details-classic-stack-light',
    },
    {
        id: 25,
        title: 'Stylish Interior',
        year: '2025',
        image: project22,
        altText: 'Stylish Interior project',
        link: '/portfolio-details-classic-stack-light',
    },
    {
        id: 26,
        title: 'Interior Transformation',
        year: '2025',
        image: project23,
        altText: 'Interior Transformation project',
        link: '/portfolio-details-classic-stack-light',
    },
    {
        id: 27,
        title: 'Interior Spaces',
        year: '2025',
        image: project24,
        altText: 'Interior Spaces project',
        link: '/portfolio-details-classic-stack-light',
    },
    //home Seven light project data end

    //home eight light project data start
    {
        id: 28,
        image: project25,
        subtitle: "Creative",
        title: "DT ASSOCIATION",
        link: "/portfolio-details-gallery-light",

    },
    {
        id: 29,
        image: project26,
        subtitle: "Creative",
        title: "DT COLLABORATION",
        link: "/portfolio-details-gallery-light",
    },
    {
        id: 30,
        image: project27,
        subtitle: "Creative",
        title: "DT NETWORK",
        link: "/portfolio-details-gallery-light",
    },
    {
        id: 31,
        image: project28,
        subtitle: "Creative",
        title: "DT COALITION",
        link: "/portfolio-details-gallery-light",
    },
    {
        id: 32,
        image: project29,
        subtitle: "Creative",
        title: "DT SYNDICATE",
        link: "/portfolio-details-gallery-light",
    },
    {
        id: 33,
        image: project30,
        subtitle: "Creative",
        title: "DT CONGLOMERATE",
        link: "/portfolio-details-gallery-light",
    },
    //home eight light project data end
    {
        id: 34,
        number: '01',
        year: '2025',
        image: project31,
        title: 'A clean and minimal website design template.',
        categories: ['Website', 'Business'],
        link: '/portfolio-details-gallery-light',
    },
    {
        id: 35,
        number: '02',
        year: '2025',
        image: project32,
        title: 'Sleek and Simple Website Template',
        categories: ['Website', 'Business'],
        link: '/portfolio-details-gallery-light',
    },
    {
        id: 36,
        number: '03',
        year: '2025',
        image: project33,
        title: 'Minimalist Web Design Framework',
        categories: ['Website', 'Business'],
        link: '/portfolio-details-gallery-light',
    },
    {
        id: 37,
        number: '04',
        year: '2025',
        image: project34,
        title: 'Modern Minimal Web Design Template',
        categories: ['Website', 'Business'],
        link: '/portfolio-details-gallery-light',
    },
    // IT Solution IT Project data start
    {
        id: 38,
        title: "The Professional Theft",
        category: "Digital Art",
        image: project35,
        link: "/portfolio-details-gallery-light",
    },
    {
        id: 39,
        title: "The Mastermind Heist",
        category: "Digital Art",
        image: project36,
        link: "/portfolio-details-gallery-light",
    },
    {
        id: 40,
        title: "The Shadow Larcenist",
        category: "Digital Art",
        image: project37,
        link: "/portfolio-details-gallery-light",
    },
    {
        id: 41,
        title: "The Elite Burglar",
        category: "Digital Art",
        image: project38,
        link: "/portfolio-details-gallery-light",
    },
    {
        id: 42,
        title: "The Mastermind Heist",
        category: "Digital Art",
        image: project36,
        link: "/portfolio-details-gallery-light",
    },
    {
        id: 43,
        title: "The Shadow Larcenist",
        category: "Digital Art",
        image: project37,
        link: "/portfolio-details-gallery-light",
    },
    //Home-11 IT Solution IT Project data end

    //Home Personal Portfolio Project data start
    {
        id: 44,
        image: project10,
        title: 'Corporate Branding',
        category: 'Branding',
        year: '2025',
        delay: '.3',
        fadeDirection: 'left',
        link: "/portfolio-details-modern-light",
    },
    {
        id: 45,
        image: project40,
        title: 'AI in Healthcare',
        category: 'Branding',
        year: '2025',
        delay: '.5',
        fadeDirection: 'right',
        link: "/portfolio-details-modern-light",
    },
    {
        id: 46,
        image: project41,
        title: 'Urban Green Spaces',
        category: 'Branding',
        year: '2025',
        delay: '.3',
        fadeDirection: 'left',
        link: "/portfolio-details-modern-light",
    },
    {
        id: 47,
        image: project42,
        title: 'Logistics Made Simple',
        category: 'Branding',
        year: '2025',
        delay: '.5',
        fadeDirection: 'right',
        link: "/portfolio-details-modern-light",
    },
    //Home Personal Portfolio Project data end

    //portfolio metro data start
    {
        id: 48,
        title: "imusic",
        services: "Research, UX, UI Design",
        image: portfolioThumb21,
        layout: "left",
        hasLineBreak: false,
        link: "/portfolio-details-modern-light",
    },
    {
        id: 49,
        title: "simple logistics",
        services: "Research, UX, UI Design",
        image: portfolioThumb22,
        hasLineBreak: true,
        contentClass: "pl-200",
        link: "/portfolio-details-modern-light"
    },
    {
        id: 50,
        title: "genesis",
        services: "Research, UX, UI Design",
        image: portfolioThumb23,
        layout: "left",
        hasLineBreak: false,
        link: "/portfolio-details-modern-light",
    },

    {
        id: 51,
        title: "simple logistics",
        services: "Research, UX, UI Design",
        image: portfolioThumb24,
        hasLineBreak: true,
        contentClass: "pl-200",
        link: "/portfolio-details-modern-light"
    },
    {
        id: 52,
        title: "genesis",
        services: "Research, UX, UI Design",
        image: portfolioThumb25,
        layout: "left",
        hasLineBreak: false,
        link: "/portfolio-details-modern-light",
    },
    //portfolio metro data  end

];

export default projectsData;