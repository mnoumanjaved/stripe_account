import { PricePlanDT } from '@/types/custom-d-t';
import { CheckIcon } from '@/svg';
import Link from 'next/link';
import React from 'react';

const PricePlanThreeCard = ({ plan }: { plan: PricePlanDT }) => {
    return (
        <div className="col-xl-4 col-lg-6 col-md-6">
            <div className={`crp-price-item ${plan.isPopular ? 'active' : ''}`}>
                <div className="crp-price-head">
                    <span>{plan.name}</span>
                    <h4>{plan.price} <i>/ month</i></h4>
                    <p>Organize your daily task for free</p>
                </div>


                <div className="crp-price-list">
                    <ul>
                        {plan.features.map((feature, index) => (
                            <li key={index}><span><CheckIcon color="currentColor" /></span>{feature}</li>
                        ))}
                    </ul>
                </div>
                <div className="app-price-btn-box">
                    <div className="animated-border-box w-100">
                        <Link className={`tp-btn-${plan.buttonVariant} sm w-100 text-center`} href="/contact">
                            Join this plan
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricePlanThreeCard;