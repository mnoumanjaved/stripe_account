import React, { useState } from 'react';
import Link from 'next/link';

// Importing all social thumb images
import thumb1 from '../../../public/assets/img/home-14/social/social-thumb-1.jpg';
import thumb2 from '../../../public/assets/img/home-14/social/social-thumb-2.jpg';
import thumb3 from '../../../public/assets/img/home-14/social/social-thumb-3.jpg';
import thumb4 from '../../../public/assets/img/home-14/social/social-thumb-4.jpg';
import thumb5 from '../../../public/assets/img/home-14/social/social-thumb-5.jpg';
import thumb6 from '../../../public/assets/img/home-14/social/social-thumb-6.jpg';
import thumb7 from '../../../public/assets/img/home-14/social/social-thumb-7.png';
import thumb8 from '../../../public/assets/img/home-14/social/social-thumb-8.png';
import thumb9 from '../../../public/assets/img/home-14/social/social-thumb-9.png';
import thumb10 from '../../../public/assets/img/home-14/social/social-thumb-10.jpg';
import thumb11 from '../../../public/assets/img/home-14/social/social-thumb-11.jpg';
import thumb12 from '../../../public/assets/img/home-14/social/social-thumb-12.jpg';
import thumb13 from '../../../public/assets/img/home-14/social/social-thumb-13.jpg';
import thumb14 from '../../../public/assets/img/home-14/social/social-thumb-14.jpg';
import thumb17 from '../../../public/assets/img/home-14/social/social-thumb-17.jpg';
import thumb18 from '../../../public/assets/img/home-14/social/social-thumb-18.jpg';
import { SocialItemDT } from '@/types/custom-d-t';
import Image from 'next/image';

const PersonalPortfolioSocial = () => {
    const [activeProject, setActiveProject] = useState<number>(2);

    const socialItems: SocialItemDT[] = [
        {
            id: 1,
            title: 'Dribbble',
            description: 'Web-design<br />Shorts inspiration',
            position: 'img-pos-1',
            thumbs: [thumb1, thumb4, thumb2, thumb3]
        },
        {
            id: 2,
            title: 'Behance',
            description: 'Projects case<br />Studies',
            position: 'img-pos-2',
            isActive: true,
            thumbs: [thumb6, thumb5, thumb7, thumb10]
        },
        {
            id: 3,
            title: 'Pinterest',
            description: 'Inspiration for<br />your project',
            position: 'img-pos-3',
            thumbs: [thumb17, thumb13, thumb11, thumb8]
        },
        {
            id: 4,
            title: 'LinkedIn',
            description: 'Contact with<br />me',
            position: 'img-pos-4',
            thumbs: [thumb14, thumb18, thumb9, thumb12]
        }
    ];

    return (
        <div className="pp-social-area pp-social-ptb pb-100">
            <div className="container-fluid gx-0">
                <div className="row gx-0">
                    <div className="col-lg-12">
                        <div className="pp-social-wrapper p-relative fix pt-20">
                            {socialItems.map((item) => (

                                <Link
                                    href="#"
                                    key={item.id}
                                    className={`pp-social-item ${item.position} ${item.id === activeProject ? 'active' : ''}`}
                                    onMouseEnter={() => { setActiveProject(item.id); }}
                                >
                                    <div className="pp-social-item-wrap p-relative">
                                        {item.position === 'img-pos-1' || item.position === 'img-pos-3' ? (
                                            <>
                                                <h3 className="pp-social-item-title">{item.title}</h3>
                                                <p className="text-right" dangerouslySetInnerHTML={{ __html: item.description }} />
                                            </>
                                        ) : (
                                            <>
                                                <p className="text-left" dangerouslySetInnerHTML={{ __html: item.description }} />
                                                <h3 className="pp-social-item-title">{item.title}</h3>
                                            </>
                                        )}
                                    </div>
                                    <div className="pp-social-item-thumb">
                                        {item.thumbs.map((thumb, index) => (
                                            <Image
                                                key={index}
                                                src={thumb}
                                                alt={`${item.title} thumbnail ${index + 1}`}
                                                className={`thumb-${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalPortfolioSocial;