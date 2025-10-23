import React from 'react';
import Image from 'next/image';

// Image import
import port1 from '../../../public/assets/img/portfolio/portfolio-details-3/port-1.jpg';
import port2 from '../../../public/assets/img/portfolio/portfolio-details-3/port-2.jpg';
import port3 from '../../../public/assets/img/portfolio/portfolio-details-3/port-3.jpg';
import port4 from '../../../public/assets/img/portfolio/portfolio-details-3/port-4.jpg';

const PortfolioDetailsThreeGallery = () => {
    // Data array
    const galleryData = [
        { id: 1, img: port1, col: 'col-lg-4', extraClass: 'small-img mb-20' },
        { id: 2, img: port2, col: 'col-lg-4', extraClass: 'small-img mb-20' },
        { id: 3, img: port3, col: 'col-lg-4', extraClass: 'small-img mb-20' },
        { id: 4, img: port4, col: 'col-lg-12', extraClass: 'height mb-20' },
    ];

    return (
        <div className="tp-pd-3-gallery-area">
            <div className="container container-1800">
                <div className="row gx-20">
                    {galleryData.map((item) => (
                        <div key={item.id} className={item.col}>
                            <div className={`tp-pd-3-gallery-img ${item.extraClass}`}>
                                <Image
                                    style={{ width: "100%", height: "auto" }}
                                    src={item.img}
                                    alt={`portfolio-${item.id}`}
                                    data-speed=".8"
                                    className="w-100"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PortfolioDetailsThreeGallery;
