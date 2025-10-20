import Link from 'next/link';
import React from 'react';

const BlogSidebarTags = () => {
    return (
        <div className="sidebar-widget-content">
            <div className="tagcloud">
                <Link href="#">Creative</Link>
                <Link href="#">Design Trends</Link>
                <Link href="#">Development</Link>
                <Link href="#">Lifestyle</Link>
                <Link href="#">Agntix</Link>
            </div>
        </div>
    );
};

export default BlogSidebarTags;