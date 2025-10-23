import { blogDT } from "@/types/blog-d-t";
import Image from "next/image";
import Link from 'next/link';
import React from 'react';

interface blogProps {
    blog: blogDT
}
const BlogListItem: React.FC<blogProps> = ({ blog }) => {
    return (
        <div className="tp-blog-list-item mb-40">
            <div className="row">
                {/* Left side (date, author, category) */}
                <div className="col-lg-3 col-md-6">
                    <div className="tp-blog-list-item-content">
                        <div className="tp-blog-list-item-tags">
                            <p>{blog.date}</p>
                            <span className="tp-blog-list-item-tags-name">{blog.author}</span>
                            <span className="tp-blog-list-item-meta">{blog.category}</span>
                        </div>
                    </div>
                </div>

                {/* Title */}
                <div className="col-lg-5 col-md-6">
                    <div className="tp-blog-list-item-title-box">
                        <h4 className="tp-blog-list-item-title">
                            <Link className="tp-line-white" href={blog.link} dangerouslySetInnerHTML={{ __html: blog.title }} />
                        </h4>
                    </div>
                </div>

                {/* Thumbnail */}
                <div className="col-lg-4">
                    <div className="tp-blog-list-item-thumb text-lg-end">
                        <Link href={blog.link}>
                            <Image style={{ width: "100%", height: "auto" }} src={blog.image} alt={blog.author || "Blog author"} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogListItem;

