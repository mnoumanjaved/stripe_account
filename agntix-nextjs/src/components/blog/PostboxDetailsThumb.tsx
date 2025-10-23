import detailsImg from '../../../public/assets/img/blog/blog-details/blog-details-2.jpg';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const PostboxDetailsThumb = () => {
    return (
        <Link href="#">
            <div className="postbox-details-nevigation-wrap p-relative">
                <div className="postbox-details-nevigation-thumb-bg">
                    <div className="postbox-details-nevigation-thumb">
                        <Image style={{ width: "100%", height: "auto" }} data-speed=".8" src={detailsImg} alt="blog details" />
                    </div>
                </div>
                <div className="postbox-details-nevigation-content">
                    <span>Next Post</span>
                    <h4 className="postbox-details-nevigation-title">Tips for thriving in our <br /> virtual world</h4>
                </div>
            </div>
        </Link>
    );
};

export default PostboxDetailsThumb;