import Image from 'next/image'; 
import React from 'react';

// Import all showcase images
import showcase1 from '../../../public/assets/img/home-06/showcase/showcase-1.jpg';
import showcase2 from '../../../public/assets/img/home-06/showcase/showcase-2.jpg';
import showcase4 from '../../../public/assets/img/home-06/showcase/showcase-4.jpg';
import showcase5 from '../../../public/assets/img/home-06/showcase/showcase-5.jpg';
import showcase6 from '../../../public/assets/img/home-06/showcase/showcase-6.jpg';
import showcase7 from '../../../public/assets/img/home-06/showcase/showcase-7.jpg';
import showcase8 from '../../../public/assets/img/home-06/showcase/showcase-8.jpg';
import showcase9 from '../../../public/assets/img/home-06/showcase/showcase-9.jpg';

const CreativeAgencyShowcase = () => {
    // Showcase data
    const showcaseColumns = [
        {
            speed: 0.7,
            hiddenOnMobile: true,
            images: [showcase2, showcase1, showcase7, showcase2, showcase1, showcase7]
        },
        {
            speed: 1.1,
            hiddenOnMobile: false,
            images: [showcase5, showcase4, showcase6, showcase5, showcase4, showcase5,
                showcase4, showcase6, showcase5, showcase4, showcase6, showcase5]
        },
        {
            speed: 0.7,
            hiddenOnMobile: true,
            images: [showcase8, showcase6, showcase9, showcase8, showcase6, showcase9]
        }
    ];

    return (
        <div className="studio-showcase-area mb-200 black-bg">
            <div className="container-fluid">
                <div className="studio-showcase-wrap">
                    <div className="studio-showcase-main d-flex">
                        {showcaseColumns.map((column, index) => (
                            <div
                                key={index}
                                className={`studio-showcase-item ${column.hiddenOnMobile ? 'd-none d-md-block' : ''}`}
                                data-speed={column.speed}
                            >
                                {column.images.map((image, imgIndex) => (
                                    <div key={imgIndex} className="studio-showcase-thumb mb-30">
                                        <Image
                                            src={image}
                                            style={{width:"100%", height:"auto"}}
                                            alt={`Showcase ${index + 1}-${imgIndex + 1}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreativeAgencyShowcase;