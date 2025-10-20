import servicesData from '@/data/serviceData';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const DesignAgencyService = () => {
    return (
        <div className="design-service-area pt-100 pb-140">
            <div className="container container-1680">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="design-service-big-text text-center mb-120">
                            <h4 className="tp_text_invert_2">services</h4>
                        </div>
                    </div>
                </div>
                <div className="row gx-20">
                    <div className="col-xxl-5 col-xl-3">
                        <div className="design-service-left d-none d-xl-block">
                            <span>services we offer</span>
                        </div>
                    </div>
                    <div className="col-xxl-7 col-xl-9">
                        <div className="design-service-right">
                            <div className="accordion design-service-accordion" id="accordionExample">
                                {servicesData.slice(11, 15).map((service) => (
                                    <div className="accordion-items" key={service.id}>
                                        <h2 className="accordion-header">
                                            <button
                                                className={`accordion-buttons ${service.isExpanded ? '' : 'collapsed'}`}
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#${service.slug}`}
                                                aria-expanded={service.isExpanded ? 'true' : 'false'}
                                                aria-controls={service.slug}
                                            >
                                                <span>[ {service.number} ]</span>
                                                <i>{service.title}</i>
                                                {service.image && <Image
                                                    className="design-service-img d-none d-md-block"
                                                    src={service.image}
                                                    alt={service.title}
                                                />}
                                            </button>
                                        </h2>
                                        <div
                                            id={service.slug}
                                            className={`accordion-collapse collapse ${service.isExpanded ? 'show' : ''}`}
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-body">
                                                <p>{service.description?.split('and')[0]} <br /> and{service.description?.split('and')[1]}</p>
                                                <div className="design-service-category">
                                                    {service.categories?.map((category, linkIndex) => (
                                                        <Link href="#" key={linkIndex}>{category}</Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DesignAgencyService;