"use client"
import { useCursorAndBackground } from '@/hooks/useCursorAndBackground';
import { charAnimation, fadeAnimation } from '@/hooks/useGsapAnimation';
import CheckoutBillForm from '@/components/forms/CheckoutBillForm';
import CheckoutPayment from '@/components/forms/CheckoutPayment';
import { useGSAP } from '@gsap/react';
import React, { useState } from 'react';

const CheckoutMain = () => {
    // state for payment
    const [selectedPayment, setSelectedPayment] = useState('stripe');
    const [isProcessing, setIsProcessing] = useState(false);
    const [billingDetails, setBillingDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: '',
    });

    // Coffee options state
    const [coffeeOptions, setCoffeeOptions] = useState({
        small: false,
        medium: false,
        large: false,
    });

    // Calculate total based on selected options
    const calculateTotal = () => {
        let total = 0;
        if (coffeeOptions.small) total += 5;
        if (coffeeOptions.medium) total += 10;
        if (coffeeOptions.large) total += 15;
        return total;
    };

    const handleCoffeeOptionChange = (option: 'small' | 'medium' | 'large') => {
        setCoffeeOptions(prev => ({
            ...prev,
            [option]: !prev[option]
        }));
    };

    // Initialize custom cursor and background styles
    useCursorAndBackground({ bgColor: "#F4F0EA" });

    useGSAP(() => {
        const timer = setTimeout(() => {
            fadeAnimation();
            charAnimation();
        }, 100)
        return () => clearTimeout(timer);
    });

    // Handle Stripe checkout
    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate payment method selection
        if (!selectedPayment) {
            alert('Please select a payment method');
            return;
        }

        // Check if at least one coffee option is selected
        const total = calculateTotal();
        if (total === 0) {
            alert('Please select at least one coffee option');
            return;
        }

        // For Stripe payment
        if (selectedPayment === 'stripe') {
            setIsProcessing(true);

            try {
                // Build cart items based on selected options
                const cartItems = [];
                if (coffeeOptions.small) {
                    cartItems.push({ id: 1, name: 'Buy me a coffee ☕ - Small', price: 5, quantity: 1 });
                }
                if (coffeeOptions.medium) {
                    cartItems.push({ id: 2, name: 'Buy me a coffee ☕ - Medium', price: 10, quantity: 1 });
                }
                if (coffeeOptions.large) {
                    cartItems.push({ id: 3, name: 'Buy me a coffee ☕ - Large', price: 15, quantity: 1 });
                }

                // Create checkout session
                const response = await fetch('/api/stripe/create-checkout-session', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        cartItems,
                        billingDetails,
                    }),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Failed to create checkout session');
                }

                // Redirect to Stripe Checkout using the URL
                if (data.url) {
                    window.location.href = data.url;
                } else {
                    throw new Error('No checkout URL received from server');
                }
            } catch (error: any) {
                console.error('Checkout error:', error);
                alert(error.message || 'An error occurred during checkout. Please try again.');
            } finally {
                setIsProcessing(false);
            }
        } else {
            // Handle other payment methods
            alert(`Processing ${selectedPayment} payment...`);
            // Implement other payment logic here
        }
    };

    return (
        <>
            <div id="magic-cursor" className="cursor-bg-red">
                <div id="ball"></div>
            </div>

            <main>
                        <section className="tp-checkout-area pb-120 pt-200">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-7">
                                        <div className="tp-checkout-bill-area">
                                            <h3 className="tp-checkout-bill-title">Billing Details</h3>
                                            <div className="tp-checkout-bill-form">
                                                <CheckoutBillForm />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-5">
                                        {/* -- checkout place order -- */}
                                        <div className="tp-checkout-place white-bg">
                                            <h3 className="tp-checkout-place-title">Buy Me a Coffee</h3>

                                            <div className="tp-order-info-list">
                                                <ul>

                                                    {/* -- header -- */}
                                                    <li className="tp-order-info-list-header">
                                                        <h4>Coffee Option</h4>
                                                        <h4>Amount</h4>
                                                    </li>

                                                    {/* -- item list with checkboxes -- */}
                                                    <li className="tp-order-info-list-desc">
                                                        <div className="d-flex align-items-center">
                                                            <input
                                                                type="checkbox"
                                                                id="coffee-small"
                                                                checked={coffeeOptions.small}
                                                                onChange={() => handleCoffeeOptionChange('small')}
                                                                className="me-2"
                                                            />
                                                            <label htmlFor="coffee-small" className="mb-0" style={{ cursor: 'pointer' }}>
                                                                Buy me a coffee ☕ - Small <span> x 1</span>
                                                            </label>
                                                        </div>
                                                        <span style={{ opacity: coffeeOptions.small ? 1 : 0.5 }}>$5.00</span>
                                                    </li>
                                                    <li className="tp-order-info-list-desc">
                                                        <div className="d-flex align-items-center">
                                                            <input
                                                                type="checkbox"
                                                                id="coffee-medium"
                                                                checked={coffeeOptions.medium}
                                                                onChange={() => handleCoffeeOptionChange('medium')}
                                                                className="me-2"
                                                            />
                                                            <label htmlFor="coffee-medium" className="mb-0" style={{ cursor: 'pointer' }}>
                                                                Buy me a coffee ☕ - Medium <span> x 1</span>
                                                            </label>
                                                        </div>
                                                        <span style={{ opacity: coffeeOptions.medium ? 1 : 0.5 }}>$10.00</span>
                                                    </li>
                                                    <li className="tp-order-info-list-desc">
                                                        <div className="d-flex align-items-center">
                                                            <input
                                                                type="checkbox"
                                                                id="coffee-large"
                                                                checked={coffeeOptions.large}
                                                                onChange={() => handleCoffeeOptionChange('large')}
                                                                className="me-2"
                                                            />
                                                            <label htmlFor="coffee-large" className="mb-0" style={{ cursor: 'pointer' }}>
                                                                Buy me a coffee ☕ - Large <span> x 1</span>
                                                            </label>
                                                        </div>
                                                        <span style={{ opacity: coffeeOptions.large ? 1 : 0.5 }}>$15.00</span>
                                                    </li>

                                                    {/* -- subtotal -- */}
                                                    <li className="tp-order-info-list-subtotal">
                                                        <span>Subtotal</span>
                                                        <span>${calculateTotal().toFixed(2)}</span>
                                                    </li>

                                                    {/* -- total -- */}
                                                    <li className="tp-order-info-list-total">
                                                        <span>Total</span>
                                                        <span>${calculateTotal().toFixed(2)}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            {/* checkout payment option */}
                                            <CheckoutPayment
                                                selectedPayment={selectedPayment}
                                                onPaymentChange={setSelectedPayment}
                                            />
                                            <div className="tp-checkout-agree">
                                                <div className="tp-checkout-option">
                                                    <input id="read_all" type="checkbox" />
                                                    <label htmlFor="read_all">I have read and agree to the website.</label>
                                                </div>
                                            </div>
                                            <div className="tp-checkout-btn-wrapper">
                                                <button
                                                    onClick={handlePlaceOrder}
                                                    disabled={isProcessing}
                                                    className="tp-checkout-btn w-100"
                                                    style={{
                                                        cursor: isProcessing ? 'not-allowed' : 'pointer',
                                                        opacity: isProcessing ? 0.7 : 1,
                                                    }}
                                                >
                                                    {isProcessing ? (
                                                        <>
                                                            <span
                                                                className="spinner-border spinner-border-sm me-2"
                                                                role="status"
                                                                aria-hidden="true"
                                                            ></span>
                                                            Processing...
                                                        </>
                                                    ) : (
                                                        'Place Order'
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
        </>
    );
};

export default CheckoutMain;