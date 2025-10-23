import servicesData from '@/data/serviceData';
import Link from 'next/link';
import React from 'react';

const ServiceSolutionTwo = () => {
    // Service data
    const displayService = servicesData.slice(51, 54);

    return (
        <div className="pp-service-details-solution-ptb pb-90">
            <div className="container container-1230">
                <div className="row">
                    {displayService.map((service) => (
                        <div className="col-lg-4 col-md-6" key={service.id}>
                            <div
                                className="tp-service-4-solution-item service-details mb-30 tp_fade_anim"
                                data-delay={service.delay}
                            >
                                <div className="tp-service-4-solution-item-icon">
                                    <span>{service.svgIcon && <service.svgIcon />}</span>
                                </div>
                                <div className="tp-service-4-solution-item-content">
                                    <h4 className="tp-service-4-solution-item-title">
                                        <Link href={service.link}>
                                            {service.titleBr ? (
                                                <>
                                                    {service.titleBr[0]} <br />
                                                    {service.titleBr[1]}
                                                </>
                                            ) : service.title}
                                        </Link>
                                    </h4>
                                    <ul>
                                        {service.categories?.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServiceSolutionTwo;