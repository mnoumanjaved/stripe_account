import React from 'react';

const CartCouponForm = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };
    return (
        <form action="#" onSubmit={handleSubmit}>
            <div className="tp-cart-coupon-input-box">
                <label>Coupon Code:</label>
                <div className="tp-cart-coupon-input d-flex align-items-center">
                    <input type="text" placeholder="Enter Coupon Code" />
                    <button type="submit">Apply</button>
                </div>
            </div>
        </form>
    );
};

export default CartCouponForm;