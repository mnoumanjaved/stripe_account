"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const BlogSidebarTags = () => {
    const [tags, setTags] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTags() {
            try {
                // Fetch all published blogs to extract tags (from primary_keyword)
                const response = await fetch('/api/blogs?limit=100&status=published');
                const data = await response.json();

                // Extract unique tags from primary_keyword
                const tagSet = new Set<string>();

                data.posts.forEach((post: any) => {
                    if (post.primary_keyword) {
                        // Split by common separators and add each tag
                        const keywords = post.primary_keyword.split(/[,;|]/).map((k: string) => k.trim());
                        keywords.forEach((keyword: string) => {
                            if (keyword) tagSet.add(keyword);
                        });
                    }
                });

                // Convert to array and limit to 10 most recent tags
                const tagArray = Array.from(tagSet).slice(0, 10);
                setTags(tagArray);
            } catch (error) {
                console.error('Error fetching tags:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchTags();
    }, []);

    if (loading) {
        return (
            <div className="sidebar-widget-content">
                <div className="text-center py-3">
                    <p style={{ color: '#999', fontSize: '14px' }}>Loading tags...</p>
                </div>
            </div>
        );
    }

    if (tags.length === 0) {
        return (
            <div className="sidebar-widget-content">
                <div className="text-center py-3">
                    <p style={{ color: '#999', fontSize: '14px' }}>No tags available</p>
                </div>
            </div>
        );
    }

    return (
        <div className="sidebar-widget-content">
            <div className="tagcloud">
                {tags.map((tag, index) => (
                    <Link key={index} href="/blog-grid-light">
                        {tag}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default BlogSidebarTags;