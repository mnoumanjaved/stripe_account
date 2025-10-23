import CreativeAgencyCopyright from './subComponents/CreativeAgencyCopyright';
import { FooterSocialIcons } from './subComponents/FooterSocialIcons';
import Link from 'next/link';
import React from 'react';

interface FooterProps {
    bgColor?: string;
    className?: string;
    Zindex?:string;
}

const CreativeAgencyFooter: React.FC<FooterProps> = ({ bgColor = "#1b1b1d", className="", Zindex="" }) => {
    return (
        <>
            <div className={`tp-footer-area tp-footer-style-6 ${className} ${Zindex} pt-120 pb-35`} style={{ backgroundColor: bgColor }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xl-4 col-lg-4 col-md-12">
                            <div className="tp-footer-widget tp-footer-col-1 pb-40 tp_fade_anim" data-delay=".3">
                                <h4 className="tp-footer-widget-title" style={{ fontSize: '28px', lineHeight: '1.4' }}>Breaking creative blocks <br /> with AI-powered questions.</h4>
                                <div className="tp-footer-widget-social">
                                    {/* footer social icons */}
                                    <FooterSocialIcons className="tp-footer-widget-social" />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-4 col-md-6">
                            <div className="tp-footer-widget tp-footer-col-2 pb-40 tp_fade_anim" data-delay=".5">
                                <h4 className="tp-footer-widget-title-sm pre mb-25">Quick links</h4>
                                <div className="tp-footer-widget-menu">
                                    <ul style={{ fontSize: '16px' }}>
                                        <li><Link href="#">How It Works</Link></li>{" "}
                                        <li><Link href="#">Features</Link></li>{" "}
                                        <li><Link href="#">Use Cases</Link></li>{" "}
                                        <li><Link href="#">Pricing</Link></li>{" "}
                                        <li><Link href="#">FAQ</Link></li>{" "}
                                        <li><Link href="#">Blog</Link></li>{" "}
                                        <li><Link href="#">Contact Us</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6">
                            <div className="tp-footer-widget tp-footer-col-3 pb-40 mb-30 tp_fade_anim" data-delay=".7">
                                <h4 className="tp-footer-widget-title-sm pre mb-20" style={{ fontSize: '18px' }}>Contact</h4>
                                <div className="tp-footer-widget-info" style={{ fontSize: '16px' }}>
                                    <Link href="mailto:hello@brainstorm.ai">hello@brainstorm.ai</Link>
                                    <Link href="mailto:support@brainstorm.ai">support@brainstorm.ai</Link>
                                </div>
                                <div className="tp-footer-widget-info">
                                    <p style={{ fontSize: '15px', lineHeight: '1.6' }}>Available 24/7 for<br />AI-powered brainstorming</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* footer copyright */}
            <CreativeAgencyCopyright bgColor={bgColor} Zindex={Zindex}/>
        </>
    );
};

export default CreativeAgencyFooter;