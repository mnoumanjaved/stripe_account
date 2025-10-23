import authorImg from '../../../public/assets/img/blog/blog-standard/blog-av-2.jpg';
import { CommentIcon } from '@/svg/ContactIcons';
import ClockIcon from '@/svg/ClockIcon';
import Image from 'next/image';
import React from 'react';

const BlogDetailsPostbox = () => {
    return (
            <div className="tp-blog-details-without-ptb">
                <div className="container container-1230">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="tp-blog-details-without-heading text-center">
                                <article className="postbox-details-item mb-20">
                                    <div className="postbox-details-info-wrap">
                                        <div className="postbox-tag postbox-details-tag">
                                            <span>
                                                <i><ClockIcon /> </i>
                                                Inspiration
                                            </span>
                                            <span>4 min read</span>
                                        </div>
                                        <h4 className="postbox-title fs-80">Lessons learned from <br /> professional challenges</h4>
                                        <div className="postbox-details-meta d-flex align-items-center justify-content-center">
                                            <div className="postbox-author-box d-flex align-items-center ">
                                                <div className="postbox-author-img">
                                                    <Image src={authorImg} alt="author image" />
                                                </div>
                                                <div className="postbox-author-info">
                                                    <h4 className="postbox-author-name">Phil Martinez</h4>
                                                </div>
                                            </div>
                                            <div className="postbox-meta">
                                                <i><ClockIcon /></i>{" "}
                                                <span>April 15, 2025</span>
                                            </div>
                                            <div className="postbox-meta">
                                                <i><CommentIcon /></i>{" "}
                                                <span>0 comments</span>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default BlogDetailsPostbox;