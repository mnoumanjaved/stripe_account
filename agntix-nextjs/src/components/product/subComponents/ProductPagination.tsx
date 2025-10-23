import Link from 'next/link';
import React from 'react';

const ProductPagination = () => {
    return (
        <>
            <div className="tp-product-pagination-ptb pb-100">
                <div className="basic-pagination-wrap">
                    <div className="container container-1750">
                        <div className="row">
                            <div className="col-xl-6">
                                <div className="basic-pagination product-pagination mb-0">
                                    <nav>
                                        <ul>
                                            <li>
                                                <Link href="/shop">
                                                    <i className="fa-regular fa-angle-left"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <span className="current">1</span>
                                            </li>
                                            <li>
                                                <Link href="/shop">2</Link>
                                            </li>
                                            <li>
                                                <Link href="/shop">
                                                    <i className="fa-regular fa-angle-right"></i>
                                                </Link>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductPagination;