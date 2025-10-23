import Image from 'next/image';
import productNav1 from '../../../../public/assets/img/product/product-details-main/nav/product-details-nav-1.png';
import productNav2 from '../../../../public/assets/img/product/product-details-main/nav/product-details-nav-2.png';
import productNav3 from '../../../../public/assets/img/product/product-details-main/nav/product-details-nav-3.png';
import productNav4 from '../../../../public/assets/img/product/product-details-main/nav/product-details-nav-4.png';

import product1 from '../../../../public/assets/img/product/product-details-main/product-thumb-1.png';
import product2 from '../../../../public/assets/img/product/product-details-main/product-thumb-2.png';
import product3 from '../../../../public/assets/img/product/product-details-main/product-thumb-3.png';
import product4 from '../../../../public/assets/img/product/product-details-main/product-thumb-4.png';

import React from 'react';

const productThumbs = [
  { id: 1, navImg: productNav1, mainImg: product1 },
  { id: 2, navImg: productNav2, mainImg: product2 },
  { id: 3, navImg: productNav3, mainImg: product3 },
  { id: 4, navImg: productNav4, mainImg: product4 },
];

const ProductDetailsThumb = () => {
  return (
    <div className="col-xl-7 col-lg-6">
      <div className="tp-product-details-thumb-wrapper tp-tab d-md-flex">
        
        {/* Main Product Images */}
        <div className="tab-content m-img" id="productDetailsNavContent2">
          {productThumbs.map((item, index) => (
            <div
              key={item.id}
              className={`tab-pane fade ${index === 0 ? "show active" : ""}`}
              id={`nav-${item.id}`}
              role="tabpanel"
              aria-labelledby={`nav-${item.id}-tab`}
              tabIndex={0}
            >
              <div className="tp-product-details-nav-main-thumb">
                <Image style={{width:"100%", height:"auto"}} src={item.mainImg} alt={`product-${item.id}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Nav Thumbnails */}
        <nav>
          <div
            className="nav nav-tab flex-md-column"
            id="productDetailsNavThumb2"
            role="tablist"
          >
            {productThumbs.map((item, index) => (
              <button
                key={item.id}
                className={`nav-links ${index === 0 ? "active" : ""}`}
                id={`nav-${item.id}-tab`}
                data-bs-toggle="tab"
                data-bs-target={`#nav-${item.id}`}
                type="button"
                role="tab"
                aria-controls={`nav-${item.id}`}
                aria-selected={index === 0 ? "true" : "false"}
              >
                <Image style={{width:"100%", height:"auto"}} src={item.navImg} alt={`nav-${item.id}`} />
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default ProductDetailsThumb;
