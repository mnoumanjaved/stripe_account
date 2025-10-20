import { EasyReturnIcon, FastShippingIcon, SecurePaymentIcon } from '@/svg/FeaturesIcons';
import React from 'react';

const ShopModernFeature = () => {
    const features = [
        {
            id: 1,
            title: "Fast & free shipping",
            description: "Every single order ships for free. No minimums, no tiers, no fine print whatsoever.",
            icon: <FastShippingIcon />,
            delay: ".3"
        },
        {
            id: 2,
            title: "Secure payment",
            description: "Pay with the world's most popular and secure payment methods.",
            icon: <SecurePaymentIcon />,
            delay: ".5"
        },
        {
            id: 3,
            title: "Flexible & Easy Return",
            description: "Not happy? Return it within 30 days for a full refund.",
            icon: <EasyReturnIcon />,
            delay: ".7"
        }
    ];

    return (
        <div className="tp-shop-feature-ptb pb-120">
            <div className="container container-1200">
                <div className="tp-shop-feature-wrap">
                    <div className="row">
                        {features.map((feature) => (
                            <div
                                key={feature.id}
                                className="col-xl-4 col-md-6 tp_fade_anim"
                                data-delay={feature.delay}
                            >
                                <div className="tp-shop-feature-item mb-30 text-center">
                                    <span>{feature.icon}</span>
                                    <h4>{feature.title}</h4>
                                    <p>{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopModernFeature;