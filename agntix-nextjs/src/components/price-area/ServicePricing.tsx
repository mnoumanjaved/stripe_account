import priceShape from '../../../public/assets/img/service/service-4-price-shape.png';
import { CheckIcon } from '@/svg';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface PricingPlan {
    id: number;
    name: string;
    price: string;
    description: string;
    features: string[];
    isActive?: boolean;
    buttonVariant: 'black-border' | 'gradient';
}

const ServicePricing = () => {
    const pricingPlans: PricingPlan[] = [
        {
            id: 1,
            name: 'Free',
            price: '$0',
            description: 'Organize your daily task for free',
            features: [
                'Unlimited cards',
                'Automated management',
                'SOX compliance',
                'Local video issuance',
                'Limited tools'
            ],
            buttonVariant: 'black-border'
        },
        {
            id: 2,
            name: 'Pro',
            price: '$48',
            description: 'Organize your daily task for free',
            features: [
                'Unlimited cards',
                'Automated management',
                'SOX compliance',
                'Local video issuance',
                'Limited tools'
            ],
            isActive: true,
            buttonVariant: 'gradient'
        },
        {
            id: 3,
            name: 'Business',
            price: '$140',
            description: 'Organize your daily task for free',
            features: [
                'Unlimited cards',
                'Automated management',
                'SOX compliance',
                'Local video issuance',
                'Limited tools'
            ],
            buttonVariant: 'black-border'
        }
    ];

    const PricingCard = ({ plan }: { plan: PricingPlan }) => (
        <div className="col-xl-4 col-lg-6 col-md-6">
            <div className={`crp-price-item ${plan.isActive ? 'active' : ''}`}>
                <div className="crp-price-head">
                    <span>{plan.name}</span>
                    <h4>{plan.price} <i>/ month</i></h4>
                    <p>{plan.description}</p>
                </div>
                <div className="crp-price-list">
                    <ul>
                        {plan.features.map((feature, index) => (
                            <li key={index}>
                                <span><CheckIcon /></span>
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="app-price-btn-box">
                    <div className={`animated-border-box ${plan.buttonVariant === 'gradient' ? 'radius-style-2' : ''} w-100`}>
                        <Link
                            className={`${plan.buttonVariant === 'gradient' ? 'tp-btn-gradient sm' : 'tp-btn-black-border'} w-100 text-center`}
                            href="/contact"
                        >
                            Join this plan
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <section className="tp-service-4-price-ptb z-index-1 pb-140">
            <div className="tp-service-4-price-shape">
                <Image src={priceShape} alt="price shape" />
            </div>
            <div className="container container-1230">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="dgm-service-title-box text-center z-index-1 mb-60">
                            <span className="tp-section-subtitle subtitle-grey mb-15 text-black tp_fade_anim" data-delay=".3">
                                Affordable pricing
                            </span>
                            <h4 className="tp-section-title-grotesk text-black tp_fade_anim" data-delay=".5">
                                Special offer! choose <br />
                                your pack today
                            </h4>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="app-price-box app-price-service">
                        <div className="row">
                            {pricingPlans.map((plan) => (
                                <PricingCard key={plan.id} plan={plan} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicePricing;