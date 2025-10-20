'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ShopModernHeader from '@/layouts/headers/ShopModernHeader';
import ShopModernFooter from '@/layouts/footers/ShopModernFooter';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import CartOffcanvas from '@/components/offcanvas/CartOffcanvas';
import SearchArea from '@/components/search-area/SearchArea';

const CheckoutSuccessPage = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    if (sessionId) {
      // Optional: Fetch order details from your API
      // For now, we'll just show success message
      setLoading(false);

      // Clear cart from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('cart');
      }
    }
  }, [sessionId]);

  return (
    <>
      <div id="magic-cursor" className="cursor-bg-red">
        <div id="ball"></div>
      </div>

      <BackToTop />
      <CartOffcanvas />
      <SearchArea />
      <ShopModernHeader />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <section className="tp-cart-area pb-120 pt-200">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-xl-8 col-lg-10">
                    <div className="tp-checkout-place white-bg text-center p-5">
                      {loading ? (
                        <div>
                          <h3 className="mb-4">Processing your order...</h3>
                          <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="mb-4">
                            <svg
                              className="text-success"
                              width="80"
                              height="80"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                              <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                          </div>

                          <h2 className="mb-3">Payment Successful!</h2>
                          <p className="mb-4">
                            Thank you for your purchase. Your order has been confirmed.
                          </p>

                          {sessionId && (
                            <div className="alert alert-info mb-4">
                              <strong>Order Reference:</strong>{' '}
                              <span className="text-break">{sessionId}</span>
                            </div>
                          )}

                          <p className="mb-4">
                            You will receive an email confirmation shortly with your order
                            details.
                          </p>

                          <div className="d-flex gap-3 justify-content-center flex-wrap">
                            <Link href="/shop" className="tp-cart-checkout-btn">
                              Continue Shopping
                            </Link>
                            <Link
                              href="/my-account"
                              className="tp-cart-checkout-btn"
                              style={{ backgroundColor: '#6c757d' }}
                            >
                              View My Orders
                            </Link>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
          <ShopModernFooter />
        </div>
      </div>
    </>
  );
};

export default CheckoutSuccessPage;
