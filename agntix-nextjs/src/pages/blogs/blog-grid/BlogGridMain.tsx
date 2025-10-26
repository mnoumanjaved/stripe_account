"use client"
import BlogGridTwoItem from '@/components/blog/subComponents/BlogGridTwoItem';
import BlogListBreadCrumb from '@/components/breadcurmb/BlogListBreadCrumb';
import CreativeStudioFooter from '@/layouts/footers/CreativeStudioFooter';
import { useCursorAndBackground } from '@/hooks/useCursorAndBackground';
import BlogListPagination from '@/components/blog/BlogListPagination';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import InnerPageHeader from '@/layouts/headers/InnerPageHeader';
import { fadeAnimation } from '@/hooks/useGsapAnimation';
import useScrollSmooth from '@/hooks/useScrollSmooth';
import blogData from '@/data/blogData';
import { useGSAP } from '@gsap/react';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { useState } from 'react';

const BlogGridMain = () => {
    // Initialize custom cursor and optional background styles
    useCursorAndBackground();

    // Enable smooth scroll animations
    useScrollSmooth();

    // Fetch blog posts from Supabase
    const [currentPage, setCurrentPage] = useState(0);
    const postsPerPage = 6;
    const { posts: supabasePosts, loading, error } = useBlogPosts({
        limit: postsPerPage,
        offset: currentPage * postsPerPage
    });

    // Combine Supabase posts with static fallback data
    const displayPosts = supabasePosts.length > 0 ? supabasePosts : blogData.slice(35, 41);

    useGSAP(() => {
        const timer = setTimeout(() => {
            fadeAnimation();
        }, 100)
        return () => clearTimeout(timer);
    });
    return (
        <>
            <div id="magic-cursor" className="cursor-white-bg">
                <div id="ball"></div>
            </div>

            {/* Global Components */}
            <BackToTop />
            <InnerPageHeader />

            <div id="smooth-wrapper">
                <div id="smooth-content">
                    {/* Main Content Sections */}
                    <main>
                        <BlogListBreadCrumb containerCls='container-1330' />
                        <div id="down" className="tp-blog-gird-sidebar-ptb pb-80">
                            <div className="container container-1330">
                                <div className="row">
                                    {loading ? (
                                        <div className="col-12 text-center py-5">
                                            <p>Loading blog posts...</p>
                                        </div>
                                    ) : error ? (
                                        <div className="col-12 text-center py-5">
                                            <p>Error loading posts. Showing static content.</p>
                                        </div>
                                    ) : null}
                                    {
                                        displayPosts.map((blog) => (
                                            <BlogGridTwoItem key={blog.id} blog={blog} colClass='col-lg-4 col-md-6' titleFont='' />
                                        ))
                                    }
                                    <div className="col-lg-12">
                                        <div className="basic-pagination-wrap text-center pt-20">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <BlogListPagination />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                    <CreativeStudioFooter buttonCls="blog-footer-style" />
                </div>
            </div>
        </>
    );
};

export default BlogGridMain;