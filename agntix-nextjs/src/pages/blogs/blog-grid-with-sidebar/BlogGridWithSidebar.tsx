
"use client"
import BlogSidebarSearchInput from '@/components/forms/BlogSidebarSearchInput';
import BlogGridTwoItem from '@/components/blog/subComponents/BlogGridTwoItem';
import BlogListBreadCrumb from '@/components/breadcurmb/BlogListBreadCrumb';
import BlogSidebarAuthorInfo from '@/components/blog/BlogSidebarAuthorInfo';
import BlogSidebarCategory from '@/components/category/BlogSidebarCategory';
import CreativeStudioFooter from '@/layouts/footers/CreativeStudioFooter';
import { useCursorAndBackground } from '@/hooks/useCursorAndBackground';
import BlogListPagination from '@/components/blog/BlogListPagination';
import BlogSidebarPost from '@/components/blog/BlogSidebarPost';
import BlogSidebarTags from '@/components/blog/BlogSidebarTags';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import InnerPageHeader from '@/layouts/headers/InnerPageHeader';
import { fadeAnimation } from '@/hooks/useGsapAnimation';
import useScrollSmooth from '@/hooks/useScrollSmooth';
import { useGSAP } from '@gsap/react';
import blogData from '@/data/blogData';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { useState } from 'react';

const BlogGridWithSidebar = () => {
    // Initialize custom cursor and optional background styles
    useCursorAndBackground();

    // Enable smooth scroll animations
    useScrollSmooth();

    // Fetch blog posts from Supabase
    const [currentPage, setCurrentPage] = useState(0);
    const postsPerPage = 8;
    const { posts: supabasePosts, loading, error, total } = useBlogPosts({
        limit: postsPerPage,
        offset: currentPage * postsPerPage
    });

    // Combine Supabase posts with static fallback data
    const displayPosts = supabasePosts.length > 0 ? supabasePosts : blogData.slice(35, 43);

    // Calculate total pages
    const totalPages = Math.ceil(total / postsPerPage);

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Scroll to top of blog section
        const element = document.getElementById('down');
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
                        <BlogListBreadCrumb containerCls='container-1330' />
                        <div id="down" className="tp-blog-gird-sidebar-ptb pb-80">
                            <div className="container container-1330">
                                <div className="row">
                                    <div className="col-lg-8">
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
                                                    <BlogGridTwoItem key={blog.id} blog={blog} colClass='col-md-6' titleFont='' />
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className='sidebar-blog-grid-wrap'>
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
                                    <div className="col-lg-12">
                                        <div className="basic-pagination-wrap pt-30">
                                            <div className="row">
                                                <div className="col-xl-6">
                                                    <BlogListPagination
                                                        currentPage={currentPage}
                                                        totalPages={totalPages}
                                                        onPageChange={handlePageChange}
                                                    />
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

export default BlogGridWithSidebar;