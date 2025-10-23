"use client"
import bgShape from "../../../public/assets/img/home-03/testimonial/test-bg-shape.jpg"
import testiLogo from "../../../public/assets/img/home-03/testimonial/testi-logo.png";
import testBgImg from "../../../public/assets/img/home-03/testimonial/test-bg.jpg";
import authorImg from "../../../public/assets/img/home-03/avater/author-1.jpg";
import { useVideoModal } from "@/provider/VideoProvider";
import { Swiper, SwiperSlide } from "swiper/react";
import { QuoteIcon, VideoPlayIconTwo } from "@/svg";
import { Pagination } from "swiper/modules";
import Image from 'next/image';
import React from 'react';

const DigitalMarketingTestimonial = () => {
    const { playVideo } = useVideoModal();

    const testimonials = [
        {
            id: 1,
            quoteSvg: <QuoteIcon />,
            text: "We will help you identify your target market, develop a marketing plan, and grow your customer base. We are committed to helping you succeed, and we will work with you every step of the way.",
            authorImg: authorImg,
            logo: testiLogo,
            authorName: "Leslie Alexander",
            position: "CEO at Specter"
        },
        {
            id: 2,
            quoteSvg: <QuoteIcon />,
            text: "We will help you identify your target market, develop a marketing plan, and grow your customer base. We are committed to helping you succeed, and we will work with you every step of the way.",
            authorImg: authorImg,
            logo: testiLogo,
            authorName: "Leslie Alexander",
            position: "CEO at Specter"
        },
        {
            id: 3,
            quoteSvg: <QuoteIcon />,
            text: "We will help you identify your target market, develop a marketing plan, and grow your customer base. We are committed to helping you succeed, and we will work with you every step of the way.",
            authorImg: authorImg,
            logo: testiLogo,
            authorName: "Leslie Alexander",
            position: "CEO at Specter"
        }
    ];

    return (
        <div className="dgm-testimonial-area dgm-testimonial-radius dgm-testimonial-space grey-bg-2 pt-120 pb-120 p-relative">
            <div className="dgm-testimonial-bg" style={{ backgroundImage: `url(${bgShape.src})` }}></div>
            <div className="dgm-testimonial-thumb">
                <div className="anim-zoomin-wrap">
                    <Image style={{ width: "100%", height: "auto" }} className="anim-zoomin" src={testBgImg} alt="bg-image" />
                </div>
                <button onClick={() => playVideo("VCPGMjCW0is")}
                    className="dgm-testimonial-playbtn">
                    <span>
                        <VideoPlayIconTwo />
                    </span>
                </button>
            </div>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="offset-xl-6 col-xl-6 col-lg-8 col-md-9">
                        <div className="dgm-testimonial-title-box text-center z-index-1 mb-45">
                            <span className="tp-section-subtitle subtitle-grey mb-15 tp_fade_anim" data-delay=".3">Testimonials</span>
                            <h4 className="tp-section-title-grotesk tp_fade_anim" data-delay=".5">
                                What{" "}
                                <span className="p-relative">
                                    clients say
                                    <span className="tp-section-title-shape d-none d-md-block">
                                        <svg width="300" height="15" viewBox="0 0 300 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.18518 11.5148C3.94801 12.9925 5.3191 13.3157 14.525 14.0545C24.3185 14.8395 26.2772 14.8395 57.8124 14.1007C92.2856 13.2695 116.378 12.8539 195.509 11.6995C253.487 10.8222 275.62 10.2219 288.548 9.25216C297.754 8.51334 298.341 8.32863 299.517 6.6201C300.3 5.60422 300.104 4.72686 299.125 4.63451C298.145 4.54216 297.95 3.94186 298.537 3.34157C299.321 2.64892 298.929 2.23333 297.362 2.23333C296.187 2.23333 295.795 2.00245 296.383 1.77157C296.97 1.49451 296.383 1.21745 295.012 1.07892C289.527 0.66333 265.239 0.478624 261.322 0.848036C259.167 1.07892 202.952 1.49451 136.552 1.72539C24.7103 2.18715 1.98931 2.46421 6.29846 3.4801C6.88607 3.6648 6.29846 4.21892 4.73149 4.77304C1.20582 6.0198 0.226471 7.35892 2.18518 8.09775C3.16453 8.46716 2.96866 8.69804 1.79343 8.69804C-0.752881 8.69804 -0.557011 9.20598 2.18518 11.5148ZM98.7493 9.62157C110.893 9.15981 136.161 8.9751 134.594 9.39069C133.223 9.66775 77.3994 11.0069 68.7811 10.9607C63.2968 10.9145 64.6679 10.776 74.0696 10.4989C81.121 10.268 92.2856 9.89863 98.7493 9.62157ZM70.544 4.68069C71.9151 4.81922 70.9357 4.91157 68.1935 4.91157C65.4513 4.91157 64.472 4.81922 65.6472 4.68069C67.0183 4.58833 69.3687 4.58833 70.544 4.68069ZM85.2343 3.29539C87.193 3.43392 86.0177 3.52627 82.8838 3.52627C79.554 3.52627 78.1829 3.43392 79.3581 3.29539C80.7292 3.20304 83.4714 3.20304 85.2343 3.29539ZM115.986 3.61863C122.254 3.61863 128.717 3.80333 130.676 4.08039C132.831 4.35745 126.955 4.49598 112.264 4.49598C95.2236 4.4498 92.0897 4.35745 97.5741 4.03421C101.296 3.80333 109.522 3.61863 115.986 3.61863ZM144.975 4.21892C146.542 4.35745 145.954 4.49598 143.8 4.49598C141.645 4.54216 140.47 4.40363 141.253 4.2651C141.841 4.12657 143.604 4.08039 144.975 4.21892ZM274.249 4.68069C275.816 4.81922 275.229 4.95775 273.074 4.95775C270.919 5.00392 269.744 4.86539 270.528 4.72686C271.115 4.58833 272.878 4.54216 274.249 4.68069Z" fill="url(#paint0_linear_5013_169)" />
                                            <defs>
                                                <linearGradient id="paint0_linear_5013_169" x1="384.814" y1="11.9742" x2="384.849" y2="8.71733" gradientUnits="userSpaceOnUse">
                                                    <stop offset="1" stopColor="#43E508" />
                                                    <stop offset="1" stopColor="#F7EF33" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    </span>
                                </span> <br />
                                about us
                            </h4>
                        </div>
                        <div className="dgm-testimonial-slider-wrap z-index-1">
                            <div className="dgm-testimonial-active fix">
                                <Swiper
                                    slidesPerView={1}
                                    loop={true}
                                    autoplay={false}
                                    spaceBetween={0}
                                    speed={1000}
                                    pagination={{
                                        el: ".dgm-testimonial-dot",
                                        clickable: true,
                                    }}
                                    modules={[Pagination]}
                                >
                                    {testimonials.map((testimonial) => (
                                        <SwiperSlide key={testimonial.id}>
                                            <div className="dgm-testimonial-slider-item text-center">
                                                <div className="dgm-testimonial-quote">
                                                    <span>{testimonial.quoteSvg}</span>
                                                </div>
                                                <div className="dgm-testimonial-text">
                                                    <p>{testimonial.text}</p>
                                                </div>
                                                <div className="dgm-testimonial-author-wrap d-flex align-items-center justify-content-center">
                                                    <div className="dgm-testimonial-author p-relative">
                                                        <Image style={{ width: "100%", height: "auto" }} className="dgm-testimonial-author-img" src={testimonial.authorImg} alt={testimonial.authorName} />
                                                        <Image className="dgm-testimonial-author-logo" src={testimonial.logo} alt="company logo" />
                                                    </div>
                                                    <div className="dgm-testimonial-author-info">
                                                        <h4 className="dgm-testimonial-author-name">{testimonial.authorName}</h4>
                                                        <span>{testimonial.position}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                <div className="dgm-testimonial-dot text-center"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DigitalMarketingTestimonial;