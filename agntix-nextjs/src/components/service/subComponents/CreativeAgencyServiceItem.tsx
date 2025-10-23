import servicesData from '@/data/serviceData';
import { ArrowSvg } from '@/svg';
import Link from 'next/link';
import React from 'react';

const CreativeAgencyServiceItem = () => {
    return (
        <div className="col-xl-12">
            <div className="studio-service-item-wrap">
                <div className="tp-award-item-wrap p-relative">
                    {servicesData.slice(15, 21).map((service) => (
                        <Link href="/service-details-2-light" key={service.id}>
                            <div className="tp-award-item hover-reveal-item p-relative">
                                <div className="row align-items-center">
                                    <div className="col-md-8">
                                        <div className="tp-award-box-left z-index-3">
                                            <span className="tp-award-year">{service.number}</span>
                                            <span className="tp-award-text">{service.title}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="tp-award-box-right z-index-3 d-flex justify-content-start justify-content-md-end">
                                            <span className="tp-award-icon">
                                                <ArrowSvg width='12' height='12' viewBox='0 0 12 12' pathValue="M1 11L11 1M11 1H1M11 1V11" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="studio-service-reveal-img" style={{ backgroundImage: `url(${service.image?.src})` }}></div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CreativeAgencyServiceItem;