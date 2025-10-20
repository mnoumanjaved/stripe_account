import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Link from 'next/link';
import React from 'react';
import gsap from 'gsap';

gsap.registerPlugin(ScrollToPlugin);

const BlogStandardBreadCrumb = ({ title = "Blog Classic", subTitle = "" }) => {
    return (
        <div className="tp-breadcrumb-area tp-breadcrumb-ptb">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xxl-12">
                        <div className="tp-breadcrumb-content text-center">
                            <h3 className="tp-breadcrumb-title">{title}</h3>
                            <div className="tp-breadcrumb-list mb-35">
                                <span><Link href="/">Home</Link></span>
                                <span className="dvdr"><i>|</i></span>
                                <span>Blog Classic</span>
                                {subTitle &&
                                    <>
                                        <span className="dvdr"><i>|</i></span>
                                        <span>{title}</span>
                                    </>
                                }
                            </div>
                            <div className="tp-breadcrumb-scrolldown smooth">
                                <Link href="#" onClick={(e) => {
                                    e.preventDefault();
                                    gsap.to(window, { duration: 1, scrollTo: "#postbox" });
                                }}>
                                    <span>
                                        <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1L8 8L15 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogStandardBreadCrumb;