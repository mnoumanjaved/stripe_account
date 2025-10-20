import SingleProductCard from './subComponents/SingleProductCard';
import { productData } from '@/data/productData';
import { ProductDT } from '@/types/product.d-t';
import React from 'react';

const ModernProductRelatedArea = ({ spacingCls = "pt-100" }) => {
    const displayProduct: ProductDT[] = productData.slice(0, 4);

    return (
        <div className={`tp-product-related-ptb ${spacingCls}`}>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-xl-8">
                        <div className="tp-shop-category-title-box mb-50 text-center">
                            <span className="tp-shop-section-subtitle mb-10 tp_fade_anim" data-delay=".3">
                                [HOT]
                            </span>
                            <h4 className="tp-shop-section-title tp_fade_anim" data-delay=".5">
                                Trending This Season
                            </h4>
                        </div>
                    </div>
                </div>
                <div className="tp-product-related-wrap">
                    <div className="row">
                        {displayProduct.map((product) => (
                            <div
                                key={product.id}
                                className="col-xl-3 col-lg-4 col-sm-6 tp_fade_anim"
                                data-delay={product.delay} >
                                <SingleProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};



export default ModernProductRelatedArea;