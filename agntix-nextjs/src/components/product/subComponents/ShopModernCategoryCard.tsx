import { productCategoryDT } from '@/types/custom-d-t';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Reusable Category Card Component
const ShopModernCategoryCard = ({ item }: { item: productCategoryDT }) => {

    return (
        <>
            <div className="tp-shop-category-2-item p-relative mb-15 fix">
                <Link href={item.link}>
                    <div className="tp-shop-category-2-thumb">
                        <Image
                            style={{ width: "100%", height: "auto" }}
                            src={item.image}
                            alt={item.alt}
                            className="w-100"
                        />
                        <div className="tp-shop-category-2-content">
                            <div className="tp-shop-category-2-content-wrap">
                                <h4 className={`tp-shop-category-2-title ${item.size}`}>
                                    {item.title}
                                </h4>
                                <span>{item.productCount}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    );
};

export default ShopModernCategoryCard;