"use client"
import { Suspense } from 'react';
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

const BlogDetailsContent = () => {
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

    // Clean markdown code block syntax from content and remove duplicate title
    const cleanContent = (content: string) => {
        if (!content) return '';

        let cleaned = content;

        // Debug: Log original content (first 500 chars)
        console.log('Original content preview:', cleaned.substring(0, 500));

        // Remove the blog title if it appears in content
        if (post && post.title) {
            console.log('Looking for title:', post.title);

            const escapedTitle = escapeRegex(post.title);

            // Remove title in various HTML tag formats
            const patterns = [
                // H1-H6 tags
                new RegExp(`<h[1-6][^>]*>\\s*${escapedTitle}\\s*<\\/h[1-6]>`, 'gi'),
                // Paragraph tags
                new RegExp(`<p[^>]*>\\s*${escapedTitle}\\s*<\\/p>`, 'gi'),
                // Strong/Bold tags
                new RegExp(`<strong[^>]*>\\s*${escapedTitle}\\s*<\\/strong>`, 'gi'),
                new RegExp(`<b[^>]*>\\s*${escapedTitle}\\s*<\\/b>`, 'gi'),
                // Div tags
                new RegExp(`<div[^>]*>\\s*${escapedTitle}\\s*<\\/div>`, 'gi'),
                // Span tags
                new RegExp(`<span[^>]*>\\s*${escapedTitle}\\s*<\\/span>`, 'gi'),
            ];

            patterns.forEach(pattern => {
                const before = cleaned;
                cleaned = cleaned.replace(pattern, '');
                if (before !== cleaned) {
                    console.log('Removed title with pattern:', pattern);
                }
            });

            // Remove markdown heading format (# Title, ## Title, etc.)
            const markdownHeading = new RegExp(`^#+\\s*${escapedTitle}\\s*$`, 'gim');
            cleaned = cleaned.replace(markdownHeading, '');

            // Remove plain text title at the very beginning (more aggressive)
            const startPattern = new RegExp(`^[\\s\\n]*${escapedTitle}[\\s\\n]*(<br\\s*\\/?>)*`, 'i');
            cleaned = cleaned.replace(startPattern, '');
        }

        // Convert markdown image syntax to HTML img tags
        // Pattern: ![alt text](image_url)
        cleaned = cleaned.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');

        // Remove markdown code block syntax with language identifier (```html, ```javascript, etc.)
        cleaned = cleaned.replace(/```[a-zA-Z0-9+-]+\s*/g, '');

        // Remove standalone markdown code block markers (```)
        cleaned = cleaned.replace(/```\s*/g, '');

        // Remove any <p> tags containing only whitespace after backticks removal
        cleaned = cleaned.replace(/<p>\s*<\/p>/g, '');

        // Remove any standalone backticks that might remain
        cleaned = cleaned.replace(/`{3,}/g, '');

        // Remove extra line breaks at the beginning
        cleaned = cleaned.replace(/^(<br\s*\/?>|\n)+/gi, '');

        console.log('Cleaned content preview:', cleaned.substring(0, 500));

        return cleaned;
    };

    // Helper function to escape special regex characters
    const escapeRegex = (str: string) => {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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
                                                        className="blog-content-formatted"
                                                        dangerouslySetInnerHTML={{ __html: cleanContent(post.content) }}
                                                    />
                                                </div>
                                            </article>

                                            {/* Custom CSS for consistent blog styling */}
                                            <style jsx global>{`
                                                .blog-content-formatted {
                                                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif !important;
                                                    font-size: 18px !important;
                                                }

                                                /* Reset all heading and paragraph fonts to match */
                                                .blog-content-formatted h1,
                                                .blog-content-formatted h2,
                                                .blog-content-formatted h3,
                                                .blog-content-formatted h4,
                                                .blog-content-formatted h5,
                                                .blog-content-formatted h6,
                                                .blog-content-formatted p,
                                                .blog-content-formatted div,
                                                .blog-content-formatted span,
                                                .blog-content-formatted li,
                                                .blog-content-formatted ul,
                                                .blog-content-formatted ol {
                                                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif !important;
                                                }

                                                /* Set base font size for all content elements */
                                                .blog-content-formatted div,
                                                .blog-content-formatted span {
                                                    font-size: 18px !important;
                                                }

                                                /* Fix indentation and spacing */
                                                .blog-content-formatted h1,
                                                .blog-content-formatted h2,
                                                .blog-content-formatted h3,
                                                .blog-content-formatted h4,
                                                .blog-content-formatted h5,
                                                .blog-content-formatted h6 {
                                                    margin: 1.5em 0 0.75em 0 !important;
                                                    padding: 0 !important;
                                                    font-weight: 600 !important;
                                                    color: #1a1a1a !important;
                                                }

                                                .blog-content-formatted h1:first-child,
                                                .blog-content-formatted h2:first-child,
                                                .blog-content-formatted h3:first-child {
                                                    margin-top: 0 !important;
                                                }

                                                .blog-content-formatted h1 {
                                                    font-size: 2em !important;
                                                    line-height: 1.3 !important;
                                                }

                                                .blog-content-formatted h2 {
                                                    font-size: 1.75em !important;
                                                    line-height: 1.35 !important;
                                                }

                                                .blog-content-formatted h3 {
                                                    font-size: 1.5em !important;
                                                    line-height: 1.4 !important;
                                                }

                                                .blog-content-formatted h4 {
                                                    font-size: 1.25em !important;
                                                    line-height: 1.45 !important;
                                                }

                                                .blog-content-formatted p {
                                                    margin: 0 0 1em 0 !important;
                                                    padding: 0 !important;
                                                    line-height: 1.8 !important;
                                                    font-size: 18px !important;
                                                    color: #333 !important;
                                                }

                                                /* Enhanced List Styling */
                                                .blog-content-formatted ul,
                                                .blog-content-formatted ol {
                                                    margin: 1.5em 0 !important;
                                                    padding-left: 0 !important;
                                                    list-style-position: outside !important;
                                                }

                                                .blog-content-formatted ul {
                                                    list-style-type: none !important;
                                                }

                                                .blog-content-formatted ol {
                                                    list-style-type: decimal !important;
                                                    padding-left: 2em !important;
                                                }

                                                .blog-content-formatted li {
                                                    margin: 0.75em 0 !important;
                                                    padding-left: 2em !important;
                                                    line-height: 1.8 !important;
                                                    position: relative !important;
                                                    color: #333 !important;
                                                    font-size: 18px !important;
                                                }

                                                /* Custom bullet for unordered lists */
                                                .blog-content-formatted ul > li::before {
                                                    content: "•" !important;
                                                    position: absolute !important;
                                                    left: 0.5em !important;
                                                    color: #666 !important;
                                                    font-size: 1.2em !important;
                                                    font-weight: bold !important;
                                                }

                                                /* Nested list styling */
                                                .blog-content-formatted ul ul,
                                                .blog-content-formatted ol ul,
                                                .blog-content-formatted ul ol,
                                                .blog-content-formatted ol ol {
                                                    margin: 0.5em 0 !important;
                                                    padding-left: 2em !important;
                                                }

                                                .blog-content-formatted ul ul > li::before {
                                                    content: "◦" !important;
                                                    font-size: 1em !important;
                                                }

                                                /* Better spacing for list items with paragraphs */
                                                .blog-content-formatted li p {
                                                    margin: 0.5em 0 !important;
                                                }

                                                .blog-content-formatted li:first-child {
                                                    margin-top: 0 !important;
                                                }

                                                .blog-content-formatted li:last-child {
                                                    margin-bottom: 0 !important;
                                                }

                                                /* Ordered list items - remove custom bullet */
                                                .blog-content-formatted ol > li::before {
                                                    content: none !important;
                                                }

                                                .blog-content-formatted ol > li {
                                                    padding-left: 0.5em !important;
                                                }

                                                .blog-content-formatted strong,
                                                .blog-content-formatted b {
                                                    font-weight: 600 !important;
                                                }

                                                /* Remove any excessive indentation */
                                                .blog-content-formatted > * {
                                                    margin-left: 0 !important;
                                                    text-indent: 0 !important;
                                                }

                                                /* Fix any nested div indentation */
                                                .blog-content-formatted div {
                                                    margin-left: 0 !important;
                                                    text-indent: 0 !important;
                                                }

                                                /* Better spacing after lists */
                                                .blog-content-formatted ul + p,
                                                .blog-content-formatted ol + p {
                                                    margin-top: 1.5em !important;
                                                }

                                                /* Better spacing before lists when after paragraphs */
                                                .blog-content-formatted p + ul,
                                                .blog-content-formatted p + ol {
                                                    margin-top: 1em !important;
                                                }

                                                /* Hide any remaining markdown code block syntax */
                                                .blog-content-formatted code:only-child {
                                                    background: transparent !important;
                                                    padding: 0 !important;
                                                }

                                                /* Hide pre tags containing only code block markers */
                                                .blog-content-formatted pre:empty {
                                                    display: none !important;
                                                }

                                                /* Image styling for blog content */
                                                .blog-content-formatted img {
                                                    max-width: 100% !important;
                                                    height: auto !important;
                                                    display: block !important;
                                                    margin: 1.5em auto !important;
                                                    border-radius: 8px !important;
                                                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
                                                }

                                                /* Figure element for images with captions */
                                                .blog-content-formatted figure {
                                                    margin: 1.5em 0 !important;
                                                    text-align: center !important;
                                                }

                                                .blog-content-formatted figure img {
                                                    margin-bottom: 0.5em !important;
                                                }

                                                .blog-content-formatted figcaption {
                                                    font-size: 14px !important;
                                                    color: #666 !important;
                                                    font-style: italic !important;
                                                    margin-top: 0.5em !important;
                                                }

                                                /* Ensure images inside paragraphs display correctly */
                                                .blog-content-formatted p img {
                                                    display: block !important;
                                                    margin: 1em auto !important;
                                                }
                                            `}</style>

                                            {/* Tags - Removed as requested */}
                                            {/* <div className="postbox-tag-details pb-20">
                                                <span className="postbox-tag-details-title">Tags:</span>
                                                <Link href="#">{post.primary_keyword}</Link>
                                            </div> */}

                                            {/* Comments Section - Commented out as requested */}
                                            {/* <div className="postbox-comment pt-90 pb-45">
                                                <h4 className="postbox-comment-title mb-55 fs-48 lh-1">Comments (0)</h4>
                                                <PostboxComment />
                                            </div> */}

                                            {/* Comment Form - Commented out as requested */}
                                            {/* <div className="postbox-comment-form pb-45">
                                                <h4 className="postbox-comment-form-title mb-55 fs-48 lh-1">Leave a comment</h4>
                                                <PostboxDetailsForm />
                                            </div> */}
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

// Disable static generation for this dynamic page
export const dynamic = 'force-dynamic';

const BlogDetailsDynamic = () => {
    return (
        <Suspense fallback={
            <>
                <div id="magic-cursor">
                    <div id="ball"></div>
                </div>
                <BackToTop />
                <InnerPageHeader />
                <div id="smooth-wrapper">
                    <div id="smooth-content">
                        <main>
                            <section className="tp-postbox-area pt-80 pb-80">
                                <div className="container">
                                    <div className="text-center">
                                        <h3>Loading...</h3>
                                    </div>
                                </div>
                            </section>
                        </main>
                        <CreativeStudioFooter buttonCls="blog-footer-style" />
                    </div>
                </div>
            </>
        }>
            <BlogDetailsContent />
        </Suspense>
    );
};

export default BlogDetailsDynamic;
