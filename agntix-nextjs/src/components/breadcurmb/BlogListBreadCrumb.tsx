import aboutShape from '../../../public/assets/img/about-us/about-us-4/about-us-4-shape-1.png';
import aboutBg from '../../../public/assets/img/about-us/about-us-4/about-us-4-bg.png';
import { ArrowTwenty, DownArrowTwo } from '@/svg/ArrowIcons';
import { CareerShapeThree } from '@/svg/HeroShape';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import gsap from 'gsap';

gsap.registerPlugin(ScrollToPlugin);

const BlogListBreadCrumb = ({ containerCls = "container-1230" }) => {
    return (
        <div className="tp-breadcrumb-area tp-breadcrumb-ptb include-bg" style={{ backgroundImage: `url(${aboutBg.src})` }}>
            <div className={`container ${containerCls}`}>
                <div className="row justify-content-center">
                    <div className="col-xxl-12">
                        <div className="tp-blog-heading-wrap p-relative pb-130">
                            <span className="tp-section-subtitle pre tp_fade_anim">Blog Post{" "}
                                <ArrowTwenty />
                            </span>

                            <h3 className="tp-blog-title tp_fade_anim smooth">Best blog <Image src={aboutShape} alt="about shape" /> <br />
                                <Link href="#" onClick={(e) => {
                                    e.preventDefault();
                                    gsap.to(window, { duration: 1, scrollTo: "#down" });
                                }}>
                                    <DownArrowTwo />
                                </Link> of the week...</h3>

                            <div className="tp-blog-shape">
                                <span>
                                    <CareerShapeThree />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogListBreadCrumb;