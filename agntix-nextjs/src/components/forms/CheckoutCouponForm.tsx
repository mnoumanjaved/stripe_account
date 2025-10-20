import React from 'react';

const CheckoutCouponForm = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };
    return (
        <form action="#" onSubmit={handleSubmit}>
            <div className="tp-return-customer-input">
                <label>Coupon Code :</label>
                <input type="text" placeholder="Coupon" />
            </div>
            <button type="submit" className="tp-return-customer-btn tp-checkout-btn">Apply</button>
        </form>
    );
};

export default CheckoutCouponForm;