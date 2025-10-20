import blogData from "@/data/blogData";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogSidebarPost = () => {
    const displayBlogData = blogData.slice(22, 25);
    return (
        <div className="rc-post-wrap">
            {displayBlogData.map((post) => (
                <div key={post.id} className="rc-post d-flex align-items-center">
                    <div className="rc-post-thumb">
                        <Link href={post.link}>
                            <Image src={post.image} alt={post.title} />
                        </Link>
                    </div>
                    <div className="rc-post-content">
                        <div className="rc-post-category">
                            <Link href="#">{post.category}</Link>
                        </div>
                        <h3 className="rc-post-title">
                            <Link href={post.link}>{post.title}</Link>
                        </h3>
                        <div className="rc-post-meta">
                            <span>{post.date}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BlogSidebarPost;
