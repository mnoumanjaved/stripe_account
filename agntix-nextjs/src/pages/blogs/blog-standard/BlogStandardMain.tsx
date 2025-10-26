"use client"
import BlogStandardBreadcrumb from '@/components/breadcurmb/BlogStandardBreadCrumb';
import BlogSidebarSearchInput from '@/components/forms/BlogSidebarSearchInput';
import BlogSidebarAuthorInfo from '@/components/blog/BlogSidebarAuthorInfo';
import BlogSidebarCategory from '@/components/category/BlogSidebarCategory';
import CreativeStudioFooter from '@/layouts/footers/CreativeStudioFooter';
import { useCursorAndBackground } from '@/hooks/useCursorAndBackground';
import BlogStandardPost from '@/components/blog/BlogStandardPost';
import BasicPagination from '@/components/blog/BasicPagination';
import BlogSidebarPost from '@/components/blog/BlogSidebarPost';
import BlogSidebarTags from '@/components/blog/BlogSidebarTags';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import InnerPageHeader from '@/layouts/headers/InnerPageHeader';
import { fadeAnimation } from '@/hooks/useGsapAnimation';
import useScrollSmooth from '@/hooks/useScrollSmooth';
import { useGSAP } from '@gsap/react';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { useState } from 'react';

const BlogStandardMain = () => {
    // Initialize custom cursor and optional background styles
    useCursorAndBackground();

    // Enable smooth scroll animations
    useScrollSmooth();

    // Fetch blog posts from Supabase
    const [currentPage, setCurrentPage] = useState(0);
    const postsPerPage = 5;
    const { posts: supabasePosts, loading, error, total } = useBlogPosts({
        limit: postsPerPage,
        offset: currentPage * postsPerPage
    });

    // Calculate total pages
    const totalPages = Math.ceil(total / postsPerPage);

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Scroll to top of blog section
        const element = document.getElementById('postbox');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

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
                        <BlogStandardBreadcrumb />
                        <section id="postbox" className="postbox-area pt-110 pb-80">
                            <div className="container container-1330">
                                <div className="row">
                                    <div className="col-xxl-8 col-xl-8 col-lg-8">
                                        <div className="postbox-wrapper">
                                            {loading ? (
                                                <div className="text-center py-5">
                                                    <p>Loading blog posts...</p>
                                                </div>
                                            ) : error ? (
                                                <div className="text-center py-5">
                                                    <p>Error loading posts. Showing static content.</p>
                                                </div>
                                            ) : null}
                                            {/* post box */}
                                            <BlogStandardPost posts={supabasePosts} />
                                            <div className="basic-pagination-wrap">
                                                <div className="row">
                                                    <div className="col-xl-6">
                                                        {/* basic pagination */}
                                                        <BasicPagination
                                                            currentPage={currentPage}
                                                            totalPages={totalPages}
                                                            onPageChange={handlePageChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xxl-4 col-xl-4 col-lg-4">
                                        <div className="sidebar-wrapper">
                                            <div className="sidebar-widget mb-30">
                                                <div className="sidebar-search">
                                                    <BlogSidebarSearchInput />
                                                </div>
                                            </div>
                                            <div className="sidebar-widget mb-55">
                                                <BlogSidebarAuthorInfo />
                                            </div>
                                            <div className="sidebar-widget mb-55">
                                                <h3 className="sidebar-widget-title">Category</h3>
                                                <BlogSidebarCategory />
                                            </div>
                                            <div className="sidebar-widget mb-55">
                                                <h3 className="sidebar-widget-title">Latest Posts</h3>
                                                <BlogSidebarPost />
                                            </div>
                                            <div className="sidebar-widget">
                                                <h3 className="sidebar-widget-title">Tags</h3>
                                                <BlogSidebarTags />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                    <CreativeStudioFooter buttonCls="blog-footer-style" />
                </div>
            </div>
        </>
    );
};

export default BlogStandardMain;