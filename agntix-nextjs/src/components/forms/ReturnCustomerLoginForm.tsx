import Link from 'next/link';
import React from 'react';

const ReturnCustomerLoginForm = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };
    return (
        <form action="#" onSubmit={handleSubmit}>
            <div className="tp-return-customer-input">
                <label>Email</label>
                <input type="text" placeholder="Your Email" />
            </div>
            <div className="tp-return-customer-input">
                <label>Password</label>
                <input type="password" placeholder="Password" />
            </div>

            <div className="tp-return-customer-suggetions d-sm-flex align-items-center justify-content-between mb-20">
                <div className="tp-return-customer-remeber">
                    <input id="remeber" type="checkbox" />
                    <label htmlFor="remeber">Remember me</label>
                </div>
                <div className="tp-return-customer-forgot">
                    <Link href="#">Forgot Password?</Link>
                </div>
            </div>
            <button type="submit" className="tp-return-customer-btn tp-checkout-btn">Login</button>
        </form>
    );
};

export default ReturnCustomerLoginForm;