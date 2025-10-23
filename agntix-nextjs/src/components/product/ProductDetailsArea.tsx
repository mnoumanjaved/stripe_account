import { CartAddsIcon, CartMinusIcon, CompareIcon, QuestionIcon, WishlistIcon } from '@/svg/ProductIcons';
import paymentImg from '../../../public/assets/img/product/product-details-main/payment-option.png';
import ProductDetailsThumb from './subComponents/ProductDetailsThumb';
import ColorVariations from '../modals/subComponents/ColorVariations';
import AdditionalInformation from './AdditionalInformation';
import React, { useState } from 'react';
import { TwitterTwo } from '@/svg';
import Image from 'next/image';
import Link from 'next/link';

const ProductDetailsArea = () => {
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => {
        setQuantity(prev => prev + 1);
    };

    const handleDecrement = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 1) {
            setQuantity(value);
        } else if (e.target.value === '') {
            setQuantity(1);
        }
    };
    return (
        <section className="tp-product-details-area">
            <div className="tp-product-details-top pb-115">
                <div className="container container-1750">
                    <div className="row">
                        <ProductDetailsThumb />
                        {/* -- col end -- */}
                        <div className="col-xl-5 col-lg-6">
                            <div className="tp-product-details-wrapper">
                                <div className="tp-product-details-category">
                                    <span>Tablets</span>
                                </div>
                                <h3 className="tp-product-details-title">Designer Glass Table</h3>

                                {/* -- inventory details -- */}
                                <div className="tp-product-details-inventory d-flex align-items-center mb-10">
                                    <div className="tp-product-details-stock mb-10">
                                        <span>In Stock</span>
                                    </div>
                                    <div className="tp-product-details-rating-wrapper d-flex align-items-center mb-10">
                                        <div className="tp-product-details-rating">
                                            {
                                                Array.from({ length: 5 }, (_, index) => (
                                                    <span key={index}>
                                                        <i className="fa-solid fa-star"></i>
                                                    </span>
                                                ))
                                            }
                                        </div>
                                        <div className="tp-product-details-reviews">
                                            <span>(36 Reviews)</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="tp-product-details-sort-desc">
                                    <p>A Screen Everyone Will Love: Whether your family is streaming or <br /> video chatting with friends tablet A8... <span>See more</span></p>
                                </div>

                                {/* -- price -- */}
                                <div className="tp-product-details-price-wrapper mb-20">
                                    <span className="tp-product-details-price old-price">$320.00</span>{" "}
                                    <span className="tp-product-details-price new-price">$236.00</span>
                                </div>

                                {/* -- variations -- */}
                                <div className="tp-product-details-variation">
                                    {/* -- single item -- */}
                                    <ColorVariations />
                                </div>

                                {/* -- actions -- */}
                                <div className="tp-product-details-action-wrapper">
                                    <h3 className="tp-product-details-action-title">Quantity</h3>
                                    <div className="tp-product-details-action-item-wrapper d-flex align-items-center">
                                        <div className="tp-product-details-quantity">
                                            <div className="tp-product-quantity mb-15 mr-15">
                                                <span className="tp-cart-minus" onClick={handleDecrement} role="button" aria-label="Decrease quantity">
                                                    <CartMinusIcon />
                                                </span>
                                                <input className="tp-cart-input" type="text" min="1" value={quantity} onChange={handleInputChange} aria-label="Product quantity" />
                                                <span className="tp-cart-plus" onClick={handleIncrement} role="button" aria-label="Increase quantity">
                                                    <CartAddsIcon />
                                                </span>
                                            </div>
                                        </div>
                                        <div className="tp-product-details-add-to-cart mb-15 w-100">
                                            <button className="tp-product-details-add-to-cart-btn w-100">Add To Cart</button>
                                        </div>
                                    </div>
                                    <button className="tp-product-details-buy-now-btn w-100">Buy Now</button>
                                </div>
                                <div className="tp-product-details-action-sm">
                                    <button type="button" className="tp-product-details-action-sm-btn">
                                        <CompareIcon />{" "}Compare
                                    </button>{" "}
                                    <button type="button" className="tp-product-details-action-sm-btn">
                                        <WishlistIcon />{" "}Add Wishlist
                                    </button>{" "}
                                    <button type="button" className="tp-product-details-action-sm-btn">
                                        <QuestionIcon />{" "}Ask a question
                                    </button>
                                </div>
                                <div className="tp-product-details-query">
                                    <div className="tp-product-details-query-item d-flex align-items-center">
                                        <span>SKU: </span>
                                        <p>NTB7SDVX44</p>
                                    </div>
                                    <div className="tp-product-details-query-item d-flex align-items-center">
                                        <span>Category: </span>
                                        <p>Computers & Tablets</p>
                                    </div>
                                    <div className="tp-product-details-query-item d-flex align-items-center">
                                        <span>Tag: </span>
                                        <p>Android</p>
                                    </div>
                                </div>
                                <div className="tp-product-details-social">
                                    <span>Share: </span>
                                    <Link href="#"><i className="fa-brands fa-facebook-f"></i></Link>{" "}
                                    <Link href="#"><TwitterTwo /></Link>{" "}
                                    <Link href="#"><i className="fa-brands fa-linkedin-in"></i></Link>{" "}
                                    <Link href="#"><i className="fa-brands fa-vimeo-v"></i></Link>
                                </div>
                                <div className="tp-product-details-msg mb-15">
                                    <ul>
                                        <li>30 days easy returns</li>
                                        <li>Order yours before 2.30pm for same day dispatch</li>
                                    </ul>
                                </div>
                                <div className="tp-product-details-payment d-inline-flex align-items-center flex-wrap justify-content-between">
                                    <p>Guaranteed safe <br /> & secure checkout</p>
                                    <Image src={paymentImg} alt="payment image" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Description, Additional information & Reviews */}
            <AdditionalInformation />
        </section>
    );
};

export default ProductDetailsArea;