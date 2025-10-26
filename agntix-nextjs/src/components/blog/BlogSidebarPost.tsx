"use client";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const BlogSidebarPost = () => {
    // Fetch 3 most recent published blogs
    const { posts, loading, error } = useBlogPosts({ limit: 3, status: 'published' });
    const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});

    const handleImageError = (postId: number) => {
        setImageErrors(prev => ({ ...prev, [postId]: true }));
    };

    const getImageSrc = (post: any) => {
        if (imageErrors[post.id]) {
            return '/assets/img/blog/blog-list/blog-list-1.jpg'; // Fallback image
        }
        return typeof post.image === 'string' ? post.image : post.image.src;
    };

    if (loading) {
        return (
            <div className="rc-post-wrap">
                <div className="text-center py-3">
                    <p style={{ color: '#999', fontSize: '14px' }}>Loading recent posts...</p>
                </div>
            </div>
        );
    }

    if (error || posts.length === 0) {
        return (
            <div className="rc-post-wrap">
                <div className="text-center py-3">
                    <p style={{ color: '#999', fontSize: '14px' }}>No recent posts available</p>
                </div>
            </div>
        );
    }

    return (
        <div className="rc-post-wrap">
            {posts.map((post) => (
                <div key={post.id} className="rc-post d-flex align-items-center">
                    <div className="rc-post-thumb">
                        <Link href={post.link}>
                            <img
                                src={getImageSrc(post)}
                                alt={post.title}
                                width={80}
                                height={80}
                                style={{ objectFit: 'cover', borderRadius: '8px' }}
                                onError={() => handleImageError(post.id)}
                            />
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
