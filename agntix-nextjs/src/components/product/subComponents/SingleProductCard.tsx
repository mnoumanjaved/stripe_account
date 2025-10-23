import { ProductDT } from "@/types/product.d-t";
import { EyeIcon } from "@/svg/EyeIcons";
import Image from "next/image";
import Link from "next/link";

// Reusable Product Card Component
const SingleProductCard = ({ product }: { product: ProductDT }) => {
    return (
        <>
            <div className="tp-product-item mb-30">
                <div className="tp-product-item-thumb">
                    <Link href={product.link}>
                        <Image style={{ width: "100%", height: "auto" }} src={product.image} alt={product.alt} className="w-100" />
                    </Link>

                    <div className="tp-product-quick-view-wrapper">
                        <button className="tp-quick-view-btn" data-bs-toggle="modal" data-bs-target="#producQuickViewModal">
                            <EyeIcon />
                        </button>
                    </div>
                    <div className="tp-product-item-btn">
                        <button className="tp-action-btn" type="button">
                            Add to cart
                        </button>
                    </div>
                </div>
                <div className="tp-product-item-content d-flex justify-content-between align-content-center">
                    <h4 className="tp-product-item-title">
                        <Link className="tp-line-black" href={product.link}>
                            {product.title}
                        </Link>
                    </h4>
                    <span className="tp-product-item-price">${product.price}</span>
                </div>
            </div>
        </>

    );
};

export default SingleProductCard;