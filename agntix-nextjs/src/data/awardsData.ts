import { awardDT } from "@/types/award-d-t";
import awardImg from "../../public/assets/img/home-01/award/award-1.jpg";
import awardImg2 from "../../public/assets/img/home-01/award/award-2.jpg";
import awardImg3 from "../../public/assets/img/home-01/award/award-3.jpg";
import awardImg4 from "../../public/assets/img/home-01/award/award-4.jpg";
import awardImg5 from "../../public/assets/img/home-01/award/award-5.jpg";
import awardImg6 from "../../public/assets/img/home-01/award/award-6.jpg";

//startup agency award thumb
import awardThumb from "../../public/assets/img/home-12/award/st-award-thumb-1.jpg";

//home personal portfolio award image
import awardImg7 from '../../public/assets/img/home-01/award/award-1.jpg';
import awardImg8 from '../../public/assets/img/home-01/award/award-2.jpg';
import awardImg9 from '../../public/assets/img/home-01/award/award-3.jpg';
import awardImg10 from '../../public/assets/img/home-01/award/award-4.jpg';
import awardImg11 from '../../public/assets/img/home-01/award/award-5.jpg';
import awardImg12 from '../../public/assets/img/home-01/award/award-6.jpg';


// Awards data array
export const homeAwardsData: awardDT[] = [
    {
        id: 1,
        year: "2008",
        title: "1x agency of the year",
        position: "Winner",
        image: awardImg
    },
    {
        id: 2,
        year: "2009",
        title: "3x creative agency of the day",
        position: "Awarded",
        image: awardImg2
    },
    {
        id: 3,
        year: "2011",
        title: "2x Featured design of the week",
        position: "Mentioned",
        image: awardImg3
    },
    {
        id: 4,
        year: "2016",
        title: "5x honorable mentioned",
        position: "Mentioned",
        image: awardImg4
    },
    {
        id: 5,
        year: "2022",
        title: "8x Best design of the day",
        position: "Winner",
        image: awardImg5
    },
    {
        id: 6,
        year: "2025",
        title: "3x Mobile Excellence Award",
        position: "Awarded",
        image: awardImg6
    },
];

export const startupAwardsData: awardDT[] = [
    // startup agency award data start
    {
        id: 1,
        title: "BDM design awards",
        date: "Feb 15, 2025",
        image: awardThumb
    },
    {
        id: 2,
        title: "Creative mind design awards",
        date: "Feb 15, 2025",
        image: awardImg2
    },
    {
        id: 3,
        title: "The new creative UI Website awards",
        date: "Feb 15, 2025",
        image: awardImg3
    },
    {
        id: 4,
        title: "FDM most creative UI/UX",
        date: "Feb 15, 2025",
        image: awardImg3
    },
    {
        id: 5,
        title: "UI/UX design awards",
        date: "Feb 15, 2025",
        image: awardImg4
    }
    // startup agency award data end
]

export const portfolioAwardsData: awardDT[] = [
    {
        id: 1,
        year: '2025',
        recognition: 'Honors',
        platform: 'AWWWARDS',
        project: 'Agntix',
        image: awardImg7
    },
    {
        id: 2,
        year: '2025',
        recognition: 'Site of the Day',
        platform: 'Mindsparkle Mag',
        project: 'Personal Portfolio',
        image: awardImg8
    },
    {
        id: 3,
        year: '2023',
        recognition: 'Best Innovation',
        platform: 'MUSE Awards',
        project: 'Thom Evans Fitness',
        image: awardImg9
    },
    {
        id: 4,
        year: '2022',
        recognition: 'Mobile Excellence',
        platform: 'Mindsparkle Mag',
        project: 'Pixel Forged',
        image: awardImg10
    },
    {
        id: 5,
        year: '2021',
        recognition: 'Site of the Day',
        platform: 'CSS Awards',
        project: 'Portfolio',
        image: awardImg11
    },
    {
        id: 6,
        year: '2020',
        recognition: 'Honors',
        platform: 'AWWWARDS',
        project: 'Agntix Studio',
        image: awardImg12
    }
];