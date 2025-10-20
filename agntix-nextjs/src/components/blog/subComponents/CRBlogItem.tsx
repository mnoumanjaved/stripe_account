import { blogDT } from '@/types/blog-d-t';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface propsBlogDT {
    post: blogDT,
}
const CRBlogItem = ({ post }: propsBlogDT) => {
    return (
        <div className="col-lg-4 col-md-6">
            <div className="cr-blog-item mb-30">
                <div className="cr-blog-item-thumb">
                    <Link href={post.link}>
                        <Image src={post.image} alt={post.title} className="img-fluid" />
                    </Link>
                </div>
                <div className="cr-blog-item-content">
                    <span className="cr-blog-item-category">{post.category}</span>
                    <h4 className="cr-blog-item-title">
                        <Link className="tp-line-white" href={post.link}>
                            {post.title}
                        </Link>
                    </h4>
                    <p className="cr-blog-item-meta">
                        {post.date} . {post.commentCount}Comments
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CRBlogItem;