"use client"
import { useSearchParams } from 'next/navigation';
import { useBlogPost } from '@/hooks/useBlogPosts';
import authorImg from '../../../../public/assets/img/blog/blog-standard/blog-av-2.jpg';
import BlogStandardBreadcrumb from '@/components/breadcurmb/BlogStandardBreadCrumb';
import BlogSidebarSearchInput from '@/components/forms/BlogSidebarSearchInput';
import BlogSidebarAuthorInfo from '@/components/blog/BlogSidebarAuthorInfo';
import BlogSidebarCategory from '@/components/category/BlogSidebarCategory';
import CreativeStudioFooter from '@/layouts/footers/CreativeStudioFooter';
import { useCursorAndBackground } from '@/hooks/useCursorAndBackground';
import PostboxDetailsForm from '@/components/forms/PostboxDetailsForm';
import BlogSidebarPost from '@/components/blog/BlogSidebarPost';
import BlogSidebarTags from '@/components/blog/BlogSidebarTags';
import InnerPageHeader from '@/layouts/headers/InnerPageHeader';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import PostboxComment from '@/components/blog/PostboxComment';
import { fadeAnimation } from '@/hooks/useGsapAnimation';
import useScrollSmooth from '@/hooks/useScrollSmooth';
import { EditIcon } from '@/svg/CategoriesIcons';
import { CommentIcon } from '@/svg/ContactIcons';
import ClockIcon from '@/svg/ClockIcon';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import Link from 'next/link';

const BlogDetailsDynamic = () => {
    // Initialize custom cursor and optional background styles
    useCursorAndBackground();

    // Enable smooth scroll animations
    useScrollSmooth();

    // Get slug from URL
    const searchParams = useSearchParams();
    const slug = searchParams.get('slug') || '';

    // Fetch blog post
    const { post, loading, error } = useBlogPost(slug);

    useGSAP(() => {
        const timer = setTimeout(() => {
            fadeAnimation();
        }, 100)
        return () => clearTimeout(timer);
    });

    // Format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    // Calculate reading time (rough estimate: 200 words per minute)
    const calculateReadingTime = (content: string) => {
        const words = content.split(/\s+/).length;
        const minutes = Math.ceil(words / 200);
        return `${minutes} min read`;
    };

    if (loading) {
        return (
            <>
                <div id="magic-cursor" className="cursor-white-bg">
                    <div id="ball"></div>
                </div>
                <BackToTop />
                <InnerPageHeader />
                <div id="smooth-wrapper">
                    <div id="smooth-content">
                        <main>
                            <div className="container pt-110 pb-110">
                                <div className="text-center">
                                    <p>Loading blog post...</p>
                                </div>
                            </div>
                        </main>
                        <CreativeStudioFooter buttonCls="blog-footer-style" />
                    </div>
                </div>
            </>
        );
    }

    if (error || !post) {
        return (
            <>
                <div id="magic-cursor" className="cursor-white-bg">
                    <div id="ball"></div>
                </div>
                <BackToTop />
                <InnerPageHeader />
                <div id="smooth-wrapper">
                    <div id="smooth-content">
                        <main>
                            <div className="container pt-110 pb-110">
                                <div className="text-center">
                                    <h2>Blog Post Not Found</h2>
                                    <p className="mt-3">{error || 'The blog post you are looking for does not exist.'}</p>
                                    <Link href="/blog-grid-light" className="btn btn-primary mt-4">
                                        Back to Blog
                                    </Link>
                                </div>
                            </div>
                        </main>
                        <CreativeStudioFooter buttonCls="blog-footer-style" />
                    </div>
                </div>
            </>
        );
    }

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
                        <BlogStandardBreadcrumb title={post.title} subTitle='Blog Details' />

                        <section id="postbox" className="postbox-area pt-110 pb-80">
                            <div className="container container-1330">
                                <div className="row">
                                    <div className="col-xxl-8 col-xl-8 col-lg-8">
                                        <div className="postbox-wrapper mb-115">
                                            <article className="postbox-details-item item-border mb-20">
                                                <div className="postbox-details-info-wrap">
                                                    <div className="postbox-tag postbox-details-tag">
                                                        <span>
                                                            <i><EditIcon /></i>{" "}
                                                            {post.primary_keyword || 'Article'}
                                                        </span>
                                                        <span>{calculateReadingTime(post.content)}</span>
                                                    </div>
                                                    <h1 className="postbox-title fs-54">{post.title}</h1>
                                                    <div className="postbox-details-meta d-flex align-items-center">
                                                        <div className="postbox-author-box d-flex align-items-center ">
                                                            <div className="postbox-author-img">
                                                                <Image style={{ width: "100%", height: "auto" }} className="w-100" src={authorImg} alt="Author image" />
                                                            </div>
                                                            <div className="postbox-author-info">
                                                                <h4 className="postbox-author-name">Admin</h4>
                                                            </div>
                                                        </div>
                                                        <div className="postbox-meta">
                                                            <i><ClockIcon /></i>{" "}
                                                            <span>{formatDate(post.created_at)}</span>
                                                        </div>
                                                        <div className="postbox-meta">
                                                            <i><CommentIcon /></i>
                                                            <span>0 comments</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </article>

                                            {/* Featured Image */}
                                            {post.webviewlink && (
                                                <div className="postbox-details-thumb mb-45">
                                                    <img
                                                        src={post.webviewlink}
                                                        alt={post.title}
                                                        style={{ width: "100%", height: "auto" }}
                                                        className="w-100"
                                                    />
                                                </div>
                                            )}

                                            {/* Blog Content */}
                                            <article className="postbox-details-item pb-50">
                                                <div className="postbox-details-content">
                                                    <div
                                                        className="blog-content"
                                                        dangerouslySetInnerHTML={{ __html: post.content }}
                                                        style={{
                                                            lineHeight: '1.8',
                                                            fontSize: '16px',
                                                        }}
                                                    />
                                                </div>
                                            </article>

                                            {/* Tags */}
                                            <div className="postbox-tag-details pb-20">
                                                <span className="postbox-tag-details-title">Tags:</span>
                                                <Link href="#">{post.primary_keyword}</Link>
                                            </div>

                                            {/* Comments Section */}
                                            <div className="postbox-comment pt-90 pb-45">
                                                <h4 className="postbox-comment-title mb-55 fs-48 lh-1">Comments (0)</h4>
                                                <PostboxComment />
                                            </div>

                                            {/* Comment Form */}
                                            <div className="postbox-comment-form pb-45">
                                                <h4 className="postbox-comment-form-title mb-55 fs-48 lh-1">Leave a comment</h4>
                                                <PostboxDetailsForm />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sidebar */}
                                    <div className="col-xxl-4 col-xl-4 col-lg-4">
                                        <div className="sidebar-wrapper tp-sidebar-border">
                                            {/* Search */}
                                            <div className="sidebar-search mb-40">
                                                <BlogSidebarSearchInput />
                                            </div>

                                            {/* Author Info */}
                                            <div className="sidebar-widget mb-40">
                                                <BlogSidebarAuthorInfo />
                                            </div>

                                            {/* Recent Posts */}
                                            <div className="sidebar-widget mb-40">
                                                <BlogSidebarPost />
                                            </div>

                                            {/* Categories */}
                                            <div className="sidebar-widget mb-40">
                                                <BlogSidebarCategory />
                                            </div>

                                            {/* Tags */}
                                            <div className="sidebar-widget">
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

export default BlogDetailsDynamic;
