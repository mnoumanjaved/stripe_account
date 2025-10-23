import product1 from '../../../public/assets/img/shop-home/product/product-1.jpg';
import SingleProductCard from './subComponents/SingleProductCard';
import { productData } from '@/data/productData';
import { ProductDT } from '@/types/product.d-t';
import Image from 'next/image';
import React from 'react';

const ShopModernProductTwo = () => {
    const displayProduct: ProductDT[] = productData.slice(4, 12);
    
    return (
        <>
            <div className="tp-shop-product-area">
                <div className="container-fluid">
                    <div className="row gx-15">
                        <div className="col-xl-6">
                            <div className="tp-shop-product-banner">
                                <Image style={{ width: "100%", height: "auto" }} className="w-100" src={product1} alt="product" />
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="row gx-15">
                                {displayProduct.map((product) => (
                                    <div key={product.id} className="col-md-6">
                                        <SingleProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShopModernProductTwo;