import { CartAddsIcon, CartMinusIcon } from '@/svg/ProductIcons';
import { CrossIconFive } from '@/svg/CrossIcons';
import { ProductDT } from '@/types/product.d-t';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface productDTProps {
  product: ProductDT;
  spacingCls?: string
}

const CartProductArea: React.FC<productDTProps> = ({ product, spacingCls = "" }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleInputChange = (value: string) => {
    const num = parseInt(value);
    setQuantity(!isNaN(num) && num >= 1 ? num : 1);
  };

  return (
    <tr>
      {/* -- img -- */}
      <td className="tp-cart-img">
        <Link href={product.link}>
          <Image src={product.image} alt={product.alt} width={80} height={80} />
        </Link>
      </td>
      {/* -- title -- */}
      <td className="tp-cart-title">
        <Link href={product.link}>{product.title}</Link>
      </td>
      {/* -- price -- */}
      <td className="tp-cart-price">
        <span>${product.price}.00</span>
      </td>
      {/* -- quantity -- */}
      <td className="tp-cart-quantity tp-product-details-quantity">
        <div className="tp-product-quantity mt-10 mb-10">
          <span
            className="tp-cart-minus"
            onClick={handleDecrement}
            role="button"
            aria-label="Decrease quantity"
          >
            <CartMinusIcon />
          </span>
          <input
            className="tp-cart-input"
            type="text"
            min="1"
            value={quantity}
            onChange={(e) => handleInputChange(e.target.value)}
            aria-label="Product quantity"
          />
          <span
            className="tp-cart-plus"
            onClick={handleIncrement}
            role="button"
            aria-label="Increase quantity"
          >
            <CartAddsIcon />
          </span>
        </div>
      </td>
      {/* -- action -- */}
      <td className={`tp-cart-action ${spacingCls}`}>
        <button className="tp-cart-action-btn">
          <CrossIconFive />{' '}
          <span>Remove</span>
        </button>
      </td>
    </tr>
  );
};

export default CartProductArea;
