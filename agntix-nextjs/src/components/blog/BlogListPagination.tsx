import Link from 'next/link';
import React from 'react';

const BlogListPagination = () => {
    return (
            <div className="basic-pagination mb-0">
                <nav>
                    <ul>
                        <li>
                            <Link href="/blog-list">
                                <i className="fa-regular fa-angle-left"></i>
                            </Link>
                        </li>{" "}
                        <li>
                            <span className="current">1</span>
                        </li>{" "}
                        <li>
                            <Link href="/blog-list">2</Link>
                        </li>{" "}
                        <li>
                            <Link href="/blog-list">3</Link>
                        </li>{" "}
                        <li>
                            <Link href="/blog-list">
                                <i className="fa-regular fa-angle-right"></i>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
    );
};

export default BlogListPagination;