'use client';

import Link from 'next/link';
import ShopModernHeader from '@/layouts/headers/ShopModernHeader';
import ShopModernFooter from '@/layouts/footers/ShopModernFooter';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import CartOffcanvas from '@/components/offcanvas/CartOffcanvas';
import SearchArea from '@/components/search-area/SearchArea';

const CheckoutCancelPage = () => {
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
                      <div className="mb-4">
                        <svg
                          className="text-warning"
                          width="80"
                          height="80"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="8" x2="12" y2="12"></line>
                          <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                      </div>

                      <h2 className="mb-3">Payment Cancelled</h2>
                      <p className="mb-4">
                        Your payment was cancelled. No charges were made to your account.
                      </p>

                      <p className="mb-4">
                        If you experienced any issues during checkout, please contact our
                        support team.
                      </p>

                      <div className="d-flex gap-3 justify-content-center flex-wrap">
                        <Link href="/checkout" className="tp-cart-checkout-btn">
                          Try Again
                        </Link>
                        <Link
                          href="/shop"
                          className="tp-cart-checkout-btn"
                          style={{ backgroundColor: '#6c757d' }}
                        >
                          Continue Shopping
                        </Link>
                      </div>
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

export default CheckoutCancelPage;
