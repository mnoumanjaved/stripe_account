import { HomeIcon } from '@/svg/BreadcrumbIcon';
import Link from 'next/link';
import React from 'react';

const ShopBreadcurmb = () => {
    return (
        <div className="breadcrumb__area breadcrumb__style-2 pt-150 pb-20">
            <div className="container container-1750">
                <div className="row">
                    <div className="col-xxl-12">
                        <div className="breadcrumb__content p-relative z-index-1">
                            <div className="breadcrumb__list has-icon">
                                <span className="breadcrumb-icon">
                                    <HomeIcon />
                                </span>{" "}
                                <span><Link href="#">Home</Link></span>{" "}
                                <span><Link href="#">Tablets</Link></span>{" "}
                                <span>Round Table</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopBreadcurmb;