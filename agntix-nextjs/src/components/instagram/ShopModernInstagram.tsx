import thumb1 from "../../../public/assets/img/product/instragram/instragram-thumb-1.jpg";
import thumb2 from "../../../public/assets/img/product/instragram/instragram-thumb-2.jpg";
import thumb3 from "../../../public/assets/img/product/instragram/instragram-thumb-3.jpg";
import thumb4 from "../../../public/assets/img/product/instragram/instragram-thumb-4.jpg";
import thumb5 from "../../../public/assets/img/product/instragram/instragram-thumb-5.jpg";
import thumb6 from "../../../public/assets/img/product/instragram/instragram-thumb-6.jpg";
import thumb7 from "../../../public/assets/img/product/instragram/instragram-thumb-7.jpg";
import PhotoProviderWrapper from "../shared/PhotoProviderWrapper";
import { InstagramThree } from '@/svg/social-icons/Instagram';
import { Instagram_swiper_params } from "@/constants/swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { PhotoView } from "react-photo-view";
import Image from "next/image";
import React from 'react';

const ShopModernInstagram = () => {
    const instagramPosts = [
        { id: 1, image: thumb1, alt: "Instagram post 1" },
        { id: 2, image: thumb2, alt: "Instagram post 2" },
        { id: 3, image: thumb3, alt: "Instagram post 3" },
        { id: 4, image: thumb4, alt: "Instagram post 4" },
        { id: 5, image: thumb5, alt: "Instagram post 5" },
        { id: 6, image: thumb6, alt: "Instagram post 6" },
        { id: 7, image: thumb7, alt: "Instagram post 7" }
    ];

    return (
        <div className="tp-shop-instagram-area p-relative">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="tp-product-instagram-heading text-center mb-50">
                            <h4 className="tp-shop-section-title">Shop Gram</h4>
                            <p>{`Here's`} some of our most popular products people are in love with.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid p-0">
                <div className="row gx-0">
                    <div className="col-xl-12">
                        <PhotoProviderWrapper>
                            <Swiper
                                className='ai-instagram-active'
                                {...Instagram_swiper_params}
                            >
                                {instagramPosts.map((post) => (
                                    <SwiperSlide key={post.id}>
                                        <div className="tp-shop-instagram-item">
                                            <PhotoView src={post.image.src}>
                                                <Image priority style={{ width: "100%", height: "auto" }} src={post.image} alt={post.alt} />
                                            </PhotoView>
                                            <div className="tp-shop-instagram-icon">
                                                <InstagramThree />
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </PhotoProviderWrapper>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopModernInstagram;