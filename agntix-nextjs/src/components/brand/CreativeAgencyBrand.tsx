import { ArrowTwo } from '@/svg';
import React from 'react';

// Import brand logos
import brandIcon1 from '../../../public/assets/img/about-us/about-us/brand/icon-1.png';
import brandIcon2 from '../../../public/assets/img/about-us/about-us/brand/icon-2.png';
import brandIcon3 from '../../../public/assets/img/about-us/about-us/brand/icon-3.png';
import brandIcon4 from '../../../public/assets/img/about-us/about-us/brand/icon-4.png';
import brandIcon5 from '../../../public/assets/img/about-us/about-us/brand/icon-5.png';
import Image from 'next/image';

interface brandPropsType {
    titleClass?: string;
    spacingCls?: string;
    subtitleTextColor?:string
}

const CreativeAgencyBrand: React.FC<brandPropsType> = ({ titleClass, spacingCls="pb-200", subtitleTextColor="color-red" }) => {
    // Brand data
    const brandLogos = [
        { id: 1, image: brandIcon1, alt: "Brand 1" },
        { id: 2, image: brandIcon2, alt: "Brand 2" },
        { id: 3, image: brandIcon3, alt: "Brand 3" },
        { id: 4, image: brandIcon4, alt: "Brand 4" },
        { id: 5, image: brandIcon5, alt: "Brand 5" }
    ];

    // Duplicate the array to create infinite loop effect
    const duplicatedBrands = [...brandLogos, ...brandLogos.slice(0, 2)];

    return (
        <div className={`des-brand-area ${titleClass} ${spacingCls}`}>
            <div className="container container-1830">
                <div className="row">
                    <div className="col-xl-6">
                        <div className="des-brand-title-box mb-40">
                            <h3 className={`tp-section-subtitle-clash ${subtitleTextColor} mb-0`}>
                                Our clients
                                <i><ArrowTwo /></i>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="des-brand-moving-wrap">
                {/* Top moving brand row */}
                <div className="des-brand-moving-top moving-text pb-10">
                    <div className="des-brand-item wrapper-text black-style d-flex align-items-center">
                        {duplicatedBrands.map((brand, index) => (
                            <div className="des-brand-item-inner" key={`top-${brand.id}-${index}`}>
                                <Image src={brand.image} alt={brand.alt} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom moving brand row */}
                <div className="des-brand-moving-bottom moving-text">
                    <div className="des-brand-item wrapper-text black-style d-flex align-items-center">
                        {duplicatedBrands.map((brand, index) => (
                            <div className="des-brand-item-inner" key={`bottom-${brand.id}-${index}`}>
                                <Image src={brand.image} alt={brand.alt} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreativeAgencyBrand;