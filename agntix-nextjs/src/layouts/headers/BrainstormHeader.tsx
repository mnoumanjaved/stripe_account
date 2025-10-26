import MobileMenus from "@/layouts/subComponents/MobileMenus";
import MobileOffcanvas from "@/components/offcanvas/MobileOffcanvas";
import React, { useState } from 'react';
import Link from 'next/link';

const BrainstormHeader = () => {
    const [openOffCanvas, setOpenOffCanvas] = useState(false);

    return (
        <>
            <header>
                {/* -- header area start -- */}
                <div className="tp-header-5-area header-transparent pt-25 header-style-light">
                    <div className="container container-1830">
                        <div className="row align-items-center">
                            <div className="col-xl-12">
                                <div className="tp-header-5-box d-flex align-items-center justify-content-between">
                                    <div className="tp-header-5-logo">
                                        <Link href="/" style={{ textDecoration: 'none' }}>
                                            <span style={{
                                                fontSize: '24px',
                                                fontWeight: '700',
                                                color: '#ff0055',
                                                letterSpacing: '-0.5px'
                                            }}>
                                                Brainstorm.ai
                                            </span>
                                        </Link>
                                    </div>
                                    <div className="tp-header-5-menu-bar">
                                        <button onClick={() => setOpenOffCanvas(true)} className="tp-header-5-bar tp-offcanvas-open-btn">
                                            <span></span>
                                            <span></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <nav className="tp-mobile-menu-active d-none">
                    <ul>
                        <MobileMenus />
                    </ul>
                </nav>
            </header>

            {/* off canvas */}
            <MobileOffcanvas openOffcanvas={openOffCanvas} setOpenOffcanvas={setOpenOffCanvas} />
        </>
    );
};

export default BrainstormHeader;
