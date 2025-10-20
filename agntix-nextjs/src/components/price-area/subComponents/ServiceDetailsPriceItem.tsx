import { CheckIconTwo } from '@/svg';
import { PricePlanDT } from '@/types/custom-d-t';
import React from 'react';

interface priceItemProps {
    item: PricePlanDT
}

const ServiceDetailsPriceItem: React.FC<priceItemProps> = ({ item }) => {
    return (
        <div className="tp-service-5-price-item tp_fade_anim">
            <div className="row">
                <div className="col-lg-3">
                    <div className="tp-service-5-price-item-heading">
                        <h4 className="tp-service-5-price-item-title">{item.name}</h4>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="tp-service-5-price-item-list">
                        <ul>
                            {item.features.map((feature, index) => (
                                <li key={index}>
                                    <span><CheckIconTwo /></span>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="tp-service-5-price-item-head text-lg-end">
                        <h4>{item.price}</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetailsPriceItem;