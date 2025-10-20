'use client';
import AnimatedCounter from '../counter/AnimatedCounter';
import { useHoverEffect } from '@/hooks/useHoverEffect';
import React, { useEffect, useState } from 'react';
import servicesData from '@/data/serviceData';
import { ArrowSvg } from '@/svg';
import Image from 'next/image';
import Link from 'next/link';

const InnerService = () => {
    const { addToRefs } = useHoverEffect();
    const [isMounted, setIsMounted] = useState(false);

    //display data for service 
    const displayServiceData = servicesData.slice(42, 46);

    //service category
    const ServiceCategoryItem = ({ name, link }: { name: string, link: string }) => (
        <Link href={link} className="inner-service-1-category-item d-flex justify-content-between align-items-center">
            <span>{name}</span>
            <i><ArrowSvg /></i>
        </Link>
    );

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <div className="tp-inner-service-area pt-120 pb-120">
                <div className="container container-1830">
                    <div className="row">
                        <div className="col-lg-9">
                            {/* Loading skeleton or placeholder */}
                            <div>Loading...</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="tp-inner-service-area pt-120 pb-120">
            <div className="container container-1830">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="inner-service-1-left">
                            <span>Services</span>
                            <ul>
                                {displayServiceData.map((service, index) => (
                                    <li key={service.id}>
                                        <span>{index + 1}. {service.title}</span>
                                    </li>
                                ))}
                            </ul> 
                        </div>
                    </div>
                    <div className="col-lg-9">
                        {displayServiceData.map((service, index) => (
                            <div key={service.id} className={`tp-inner-service-item ${service.spacingCls}`}>
                                <div className="inner-service-1-right">
                                    <div className="row">
                                        <div className="col-xl-4">
                                            <div className="inner-service-1-number">
                                                <h1>
                                                    <AnimatedCounter min={0} max={index + 1}/>
                                                </h1>
                                            </div>
                                        </div>
                                        <div className="col-xl-8">
                                            <div className="inner-service-1-text">
                                                <span>{service.title}</span>
                                                {service.text?.map((paragraph, idx) => (
                                                    <p key={idx}>{paragraph}</p>
                                                ))}
                                            </div>
                                            <div className="inner-service-1-category">
                                                {service?.categories?.map((category, idx) => (
                                                    <ServiceCategoryItem key={idx} name={category} link={service.link} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row gx-10">
                                    <div className="inner-service-1-thumb-text">
                                        <span>(Our recent Digital work)</span>
                                    </div>
                                    {service?.images?.map((image, idx) => (
                                        <div key={idx} className="col-xl-6">
                                            <div ref={addToRefs} className="inner-service-1-thumb tp--hover-item">
                                                <div className="tp--hover-img" data-displacement="assets/img/webgl/1.jpg" data-intensity="0.6" data-speedin="1" data-speedout="1">
                                                    <Image 
                                                        style={{width:"100%", height:"auto"}} 
                                                        className="w-100" 
                                                        src={image} 
                                                        priority
                                                        alt="service image" 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InnerService;