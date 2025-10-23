import SingleProductCard from './subComponents/SingleProductCard';
import { productData } from '@/data/productData';
import { ProductDT } from '@/types/product.d-t';
import React from 'react';

const ProductRelatedArea = () => {
    const displayProduct: ProductDT[] = productData.slice(8, 12);
    
    return (
        <div className="tp-product-related-ptb pt-100 pb-90">
            <div className="container container-1750">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="tp-product-related-heading mb-40">
                            <h4 className="tp-product-related-title">Related Product</h4>
                        </div>
                    </div>
                </div>
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
    );
};

export default ProductRelatedArea;