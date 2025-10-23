import paymentImg from '../../../public/assets/img/login/payment-option.png';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface CheckoutPaymentProps {
    selectedPayment: string;
    onPaymentChange: (paymentMethod: string) => void;
}

const CheckoutPayment: React.FC<CheckoutPaymentProps> = ({
    selectedPayment,
    onPaymentChange,
}) => {
    return (
        <div className="tp-checkout-payment">
            {/* Stripe Payment - Primary Option */}
            <div className="tp-checkout-payment-item">
                <input
                    type="radio"
                    id="stripe"
                    name="payment"
                    checked={selectedPayment === 'stripe'}
                    onChange={() => onPaymentChange('stripe')}
                />
                <label htmlFor="stripe">
                    Credit/Debit Card (Stripe)
                    <span className="ms-2 badge bg-primary">Recommended</span>
                </label>
                <div
                    className="tp-checkout-payment-desc"
                    style={{ display: selectedPayment === 'stripe' ? 'block' : 'none' }}
                >
                    <p>
                        Pay securely with your credit or debit card. Your payment information is
                        encrypted and processed by Stripe, a trusted payment processor.
                    </p>
                </div>
            </div>

            {/* Other Payment Options */}
            <div className="tp-checkout-payment-item">
                <input
                    type="radio"
                    id="back_transfer"
                    name="payment"
                    checked={selectedPayment === 'back_transfer'}
                    onChange={() => onPaymentChange('back_transfer')}
                />
                <label htmlFor="back_transfer">Direct Bank Transfer</label>
                <div
                    className="tp-checkout-payment-desc direct-bank-transfer"
                    style={{ display: selectedPayment === 'back_transfer' ? 'block' : 'none' }}
                >
                    <p>
                        Make your payment directly into our bank account. Please use your Order ID
                        as the payment reference. Your order will not be shipped until the funds
                        have cleared in our account.
                    </p>
                </div>
            </div>

            <div className="tp-checkout-payment-item">
                <input
                    type="radio"
                    id="cheque_payment"
                    name="payment"
                    checked={selectedPayment === 'cheque_payment'}
                    onChange={() => onPaymentChange('cheque_payment')}
                />
                <label htmlFor="cheque_payment">Cheque Payment</label>
                <div
                    className="tp-checkout-payment-desc cheque-payment"
                    style={{ display: selectedPayment === 'cheque_payment' ? 'block' : 'none' }}
                >
                    <p>
                        Make your payment directly into our bank account. Please use your Order ID
                        as the payment reference. Your order will not be shipped until the funds
                        have cleared in our account.
                    </p>
                </div>
            </div>

            <div className="tp-checkout-payment-item">
                <input
                    type="radio"
                    id="cod"
                    name="payment"
                    checked={selectedPayment === 'cod'}
                    onChange={() => onPaymentChange('cod')}
                />
                <label htmlFor="cod">Cash on Delivery</label>
                <div
                    className="tp-checkout-payment-desc cash-on-delivery"
                    style={{ display: selectedPayment === 'cod' ? 'block' : 'none' }}
                >
                    <p>
                        Pay with cash when your order is delivered. A small fee may apply for this
                        payment method.
                    </p>
                </div>
            </div>

            <div className="tp-checkout-payment-item paypal-payment">
                <input
                    type="radio"
                    id="paypal"
                    name="payment"
                    checked={selectedPayment === 'paypal'}
                    onChange={() => onPaymentChange('paypal')}
                />
                <label htmlFor="paypal">
                    PayPal <Image src={paymentImg} alt="payment option" />{' '}
                    <Link href="#">What is PayPal?</Link>
                </label>
            </div>
        </div>
    );
};

export default CheckoutPayment;