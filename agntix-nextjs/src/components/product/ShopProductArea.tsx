import SingleProductCard from './subComponents/SingleProductCard';
import { productData } from '@/data/productData';
import React, { useState } from 'react';
import Link from 'next/link';

const ShopProductArea = () => {
    //show product data
    const displayProduct = productData.slice(4, 16);

    // dropdown toggle state
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="tp-product-ptb pt-200 pb-30">
            <div className="container container-1750">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="tp-product-heading mb-50">
                            <div className="tp-shop-category-title-box">
                                <span className="tp-shop-section-subtitle mb-10">[ Shop ]</span>
                                <h4 className="tp-shop-section-title">Our products</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="tp-product-cats pb-40">
                            <Link href="#">All (17)</Link>{" "}
                            <Link href="#">Chairs (2)</Link>{" "}
                            <Link href="#">Sofas (4)</Link>{" "}
                            <Link href="#">Tables (6)</Link>{" "}
                            <Link href="#">Floor Lamps (5)</Link>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="tp-product-filter-wrap d-flex justify-content-lg-end align-items-center pb-40">
                            <div className="tp-product-filter-select">
                                <div id="customSelect" className={`custom-select ${isOpen ? "active" : ""}`}>
                                    <div
                                        className={`selected ${isOpen ? "open" : ""}`}
                                        onClick={() => setIsOpen(!isOpen)}
                                    >
                                        Sort by newest<span className="arrow"></span>
                                    </div>
                                    {isOpen && (
                                        <ul className="options">
                                            <li data-value="1">Low to High</li>
                                            <li data-value="2">High to Low</li>
                                            <li data-value="3">New Added</li>
                                            <li data-value="4">On Sale</li>
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {displayProduct.map((product) => (
                        <div
                            key={product.id}
                            className="col-xl-3 col-lg-4 col-sm-6"
                            data-delay={product.delay} >
                            <SingleProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShopProductArea;
