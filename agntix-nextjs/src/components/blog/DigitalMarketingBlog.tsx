import blogData from '@/data/blogData';
import { ArrowSvg } from '@/svg';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const DigitalMarketingBlog = () => {
    return (
        <div className="dgm-blog-area pt-120 pb-120">
            <div className="container container-1330">
                <div className="dgm-blog-title-wrap mb-60">
                    <div className="row align-items-end">
                        <div className="col-lg-6 col-md-8">
                            <div className="dgm-blog-title-box">
                                <h4 className="tp-section-title-grotesk tp_fade_anim" data-delay=".3">The latest <br /> industry trends</h4>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-4">
                            <div className="dgm-blog-btn text-start text-lg-end tp_fade_anim" data-delay=".3">
                                <Link className="tp-btn-yellow-green green-solid btn-60" href="/blog-grid-2-col-light">
                                    <span>
                                        <span className="text-1">Read all posts</span>
                                        <span className="text-2">Read all posts</span>
                                    </span>
                                    <i>
                                        <ArrowSvg width="12" height="12" viewBox="0 0 12 12" pathValue="M1 11L11 1M11 1H1M11 1V11" />
                                        <ArrowSvg width="12" height="12" viewBox="0 0 12 12" pathValue="M1 11L11 1M11 1H1M11 1V11" />
                                    </i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dgm-blog-main">
                    {blogData.slice(0, 3).map((blog) => (
                        <div key={blog.id} className="dgm-blog-item tp_fade_anim">
                            <div className="row">
                                <div className="col-xl-7 col-lg-8">
                                    <div className="dgm-blog-content-wrap d-flex">
                                        <div className="dgm-blog-content d-flex flex-column justify-content-between">
                                            <div className="dgm-blog-meta mb-30">
                                                <h4>{blog.author}</h4>
                                                <span>{blog.date}</span>
                                            </div>
                                            <div className="dgm-blog-category">
                                                <span>{blog.category}</span>
                                            </div>
                                        </div>
                                        <div className="dgm-blog-title-box">
                                            <h4 className="dgm-blog-title-sm">
                                                <Link className="tp-line-black" href={blog.link}>
                                                    {blog.title}
                                                </Link>
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 offset-xl-2 col-lg-4">
                                    <div className="dgm-blog-thumb-wrap text-start text-lg-end">
                                        <div className="dgm-blog-thumb">
                                            <Link href={blog.link}>
                                                <Image style={{ width: "100%", height: "auto" }} src={blog.image} alt="blog-image" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DigitalMarketingBlog;