import { useVideoModal } from "@/provider/VideoProvider";
import { VideoPlayIconThree } from "@/svg/VideoPlayIcons";
import { LinkedIcon, BlogQuoteIcon } from "@/svg/BlogsIcons";
import { EditIcon } from "@/svg/CategoriesIcons";
import ClockIcon from "@/svg/ClockIcon";
import { ArrowFour } from "@/svg";
import Link from "next/link";
import Image from "next/image";

// Import images (you can keep your existing imports)
import authorImg1 from "../../../../public/assets/img/blog/blog-masonry/blog-masonry-user-1.jpg";
import authorImg2 from "../../../../public/assets/img/blog/blog-masonry/blog-masonry-user-3.jpg";
import authorImg3 from "../../../../public/assets/img/blog/blog-masonry/blog-masonry-user-2.jpg";
import authorImg4 from "../../../../public/assets/img/blog/blog-masonry/blog-masonry-user-4.jpg";
import authorImg5 from "../../../../public/assets/img/blog/blog-masonry/blog-masonry-user-5.jpg";
import authorImg6 from "../../../../public/assets/img/blog/blog-masonry/blog-masonry-user-6.jpg";
import authorImg7 from "../../../../public/assets/img/blog/blog-masonry/blog-masonry-user-7.jpg";
import blog1 from "../../../../public/assets/img/blog/blog-masonry/blog-masonry-thumb-1.jpg";
import blog2 from "../../../../public/assets/img/blog/blog-masonry/blog-masonry-thumb-3.jpg";
import blog3 from "../../../../public/assets/img/blog/blog-masonry/blog-masonry-thumb-2.jpg";
import blog4 from "../../../../public/assets/img/blog/blog-masonry/blog-masonry-thumb-4.jpg";
import blog5 from "../../../../public/assets/img/blog/blog-masonry/blog-masonry-thumb-5.jpg";
import blog6 from "../../../../public/assets/img/blog/blog-masonry/blog-masonry-thumb-6.jpg";
import { BlogPost } from "@/types/blog-d-t";
import React from "react";

// Create blog data array with 3 types
const blogData: BlogPost[] = [
    // Type 1: Standard blog post with image
    {
        id: 1,
        type: "standard",
        author: {
            name: "wpuser",
            role: "Administrator",
            image: authorImg1
        },
        date: "April 15, 2025",
        image: blog1,
        category: "Inspiration",
        title: "Understanding the process of 3D modeling.",
        excerpt: "Learn about the intricate process of 3D modeling and how it transforms ideas into digital reality.",
        videoId: null
    },
    // Type 2: Text-only blog post
    {
        id: 2,
        type: "text-only",
        author: {
            name: "Ronald Lara",
            role: "Administrator",
            image: authorImg2
        },
        date: "April 15, 2025",
        category: "Branding",
        title: "The role of social media in shaping society",
        excerpt: "Explore how social media platforms have become powerful tools that influence cultural norms and societal values."
    },
    // Type 3: Video blog post
    {
        id: 3,
        type: "video",
        author: {
            name: "Eric Young",
            role: "Administrator",
            image: authorImg3
        },
        date: "April 15, 2025",
        image: blog3,
        category: "UX Design",
        title: "8 Tips to Design Better Text Input Controls",
        excerpt: "Discover practical tips to improve user experience with text input controls in your designs.",
        videoId: "VCPGMjCW0is"
    },
    // Additional posts to demonstrate all types
    {
        id: 4,
        type: "standard",
        author: {
            name: "Abbas",
            role: "Administrator",
            image: authorImg4
        },
        date: "April 15, 2025",
        image: blog2,
        category: "UX Design",
        title: "21 Web Design Mistakes to Avoid Right Now",
        excerpt: "Common pitfalls in web design and how to avoid them for better user engagement."
    },
    // Type 4: Quote post
    {
        id: 5,
        type: "quote",
        category: "Branding",
        content: "A small river named Duden flows by their place & supplies it with the necessary regelialia. It is...",
        authorName: "Damien Cabral"
    },
    // Type 5: Link post
    {
        id: 6,
        type: "link",
        category: "Branding",
        content: "The rise of video marketing: engaging your audience with visual content",
        authorName: "Damien Cabral"
    },
    {
        id: 7,
        type: "standard",
        author: {
            name: "Elvin Bond",
            role: "Administrator",
            image: authorImg5
        },
        date: "April 15, 2025",
        image: blog5,
        category: "UX Design",
        title: "6 Big Commerce Design Tips For Big Results",
        excerpt: "Maximize your e-commerce potential with these design strategies that drive conversions."
    },
    {
        id: 8,
        type: "standard",
        author: {
            name: "Koen Chegg",
            role: "Administrator",
            image: authorImg6
        },
        date: "April 15, 2025",
        image: blog6,
        category: "UX Design",
        title: "21 Web Design Mistakes to Avoid Right Now",
        excerpt: "Learn from common design errors to create more effective and user-friendly websites."
    },
    {
        id: 9,
        type: "standard",
        author: {
            name: "Albert Juan",
            role: "Administrator",
            image: authorImg7
        },
        date: "April 15, 2025",
        image: blog4,
        category: "Inspiration",
        title: "Everything You Should Know About Return",
        excerpt: "Understanding the importance of return policies in e-commerce and customer satisfaction."
    }
];

const BlogMasonryItem = () => {
    const { playVideo } = useVideoModal();

    // Render different post types based on the data
    const renderBlogPost = (post: BlogPost, index: number) => {
        switch (post.type) {
            case "text-only":
                return (
                    <div className="col-lg-4 col-md-6 grid-item" key={index}>
                        <div className="tp-blog-masonry-item-2 mb-30">
                            <div className="tp-blog-masonry-item-top d-flex justify-content-between align-items-center mb-30">
                                <div className="tp-blog-masonry-item-user d-flex align-items-center">
                                    <div className="tp-blog-masonry-item-user-thumb">
                                        <Image style={{ width: "100%", height: "auto" }} src={post.author.image} alt="author image" />
                                    </div>
                                    <div className="tp-blog-masonry-item-user-content">
                                        <span>{post.author.name}</span>
                                        <p>{post.author.role}</p>
                                    </div>
                                </div>
                                <div className="tp-blog-masonry-item-time">
                                    <span><ClockIcon /> {post.date}</span>
                                </div>
                            </div>
                            <div className="tp-blog-masonry-content">
                                <div className="tp-blog-masonry-tag mb-15">
                                    <span><EditIcon /> {post.category}</span>
                                </div>
                                <h4 className="tp-blog-masonry-title">
                                    <Link className="tp-line-white" href="blog-details-light.html">
                                        {post.title}
                                    </Link>
                                </h4>
                                <div className="tp-blog-masonry-btn">
                                    <Link href="blog-details-light.html">
                                        Read More
                                        <span>
                                            <ArrowFour strokeWidth={2} />
                                            <ArrowFour strokeWidth={2} />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case "video":
                return (
                    <div className="col-lg-4 col-md-6 grid-item">
                        <div className="tp-blog-masonry-item mb-30">
                            <div className="tp-blog-masonry-item-top d-flex justify-content-between align-items-center mb-30">
                                <div className="tp-blog-masonry-item-user d-flex align-items-center">
                                    <div className="tp-blog-masonry-item-user-thumb">
                                        <Image style={{ width: "100%", height: "auto" }} src={post.author.image} alt="author image" />
                                    </div>
                                    <div className="tp-blog-masonry-item-user-content">
                                        <span>{post.author.name}</span>
                                        <p>{post.author.role}</p>
                                    </div>
                                </div>
                                <div className="tp-blog-masonry-item-time">
                                    <span><ClockIcon /> {post.date}</span>
                                </div>
                            </div>
                            <div className="tp-blog-masonry-thumb p-relative mb-30">
                                <div className="tp-blog-masonry-thumb-video">
                                    <button className="popup-video" onClick={() => playVideo(post.videoId)}>
                                        <span><VideoPlayIconThree /></span>
                                    </button>
                                </div>
                                <Link href="blog-details-light.html">
                                    <Image style={{ width: "100%", height: "auto" }} src={post.image} alt="blog image" />
                                </Link>
                            </div>
                            <div className="tp-blog-masonry-content">
                                <div className="tp-blog-masonry-tag mb-15">
                                    <span><EditIcon /> {post.category}</span>
                                </div>
                                <h4 className="tp-blog-masonry-title">
                                    <Link className="tp-line-white" href="blog-details-light.html">
                                        {post.title}
                                    </Link>
                                </h4>
                                <div className="tp-blog-masonry-btn">
                                    <Link href="blog-details-light.html">
                                        Read More
                                        <span>
                                            <ArrowFour strokeWidth={2} />
                                            <ArrowFour strokeWidth={2} />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case "quote":
                return (
                    <div className="col-lg-4 col-md-6 grid-item">
                        <div className="tp-blog-masonry-item-3 mb-30">
                            <div className="tp-blog-masonry-item-icon">
                                <span><BlogQuoteIcon /></span>
                            </div>
                            <div className="tp-blog-masonry-tag mb-15">
                                <span><EditIcon /> {post.category}</span>
                            </div>
                            <div className="tp-blog-masonry-item-text">
                                <span>{post.content}</span>
                                <p>{post.authorName}</p>
                            </div>
                        </div>
                    </div>
                );

            case "link":
                return (
                    <div className="col-lg-4 col-md-6 grid-item">
                        <div className="tp-blog-masonry-item-3 mb-30">
                            <div className="tp-blog-masonry-item-icon">
                                <span><LinkedIcon /></span>
                            </div>
                            <div className="tp-blog-masonry-tag mb-15">
                                <span><EditIcon /> {post.category}</span>
                            </div>
                            <div className="tp-blog-masonry-item-text">
                                <span>{post.content}</span>
                                <p>{post.authorName}</p>
                            </div>
                        </div>
                    </div>
                );

            default: // standard post
                return (
                    <div className="col-lg-4 col-md-6 grid-item">
                        <div className="tp-blog-masonry-item mb-30">
                            <div className="tp-blog-masonry-item-top d-flex justify-content-between align-items-center mb-30">
                                <div className="tp-blog-masonry-item-user d-flex align-items-center">
                                    <div className="tp-blog-masonry-item-user-thumb">
                                        <Image style={{ width: "100%", height: "auto" }} src={post.author.image} alt="author image" />
                                    </div>
                                    <div className="tp-blog-masonry-item-user-content">
                                        <span>{post.author.name}</span>
                                        <p>{post.author.role}</p>
                                    </div>
                                </div>
                                <div className="tp-blog-masonry-item-time">
                                    <span><ClockIcon /> {post.date}</span>
                                </div>
                            </div>
                            <div className="tp-blog-masonry-thumb mb-30">
                                <Link href="blog-details-light.html">
                                    <Image style={{ width: "100%", height: "auto" }} src={post.image} alt="blog image" />
                                </Link>
                            </div>
                            <div className="tp-blog-masonry-content">
                                <div className="tp-blog-masonry-tag mb-15">
                                    <span><EditIcon /> {post.category}</span>
                                </div>
                                <h4 className="tp-blog-masonry-title">
                                    <Link className="tp-line-white" href="blog-details-light.html">
                                        {post.title}
                                    </Link>
                                </h4>
                                <div className="tp-blog-masonry-btn">
                                    <Link href="blog-details-light.html">
                                        Read More
                                        <span>
                                            <ArrowFour strokeWidth={2} />
                                            <ArrowFour strokeWidth={2} />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <>
            {blogData.map((post, index) => (
                <React.Fragment key={index}>
                    {renderBlogPost(post, index)}
                </React.Fragment>
            ))}
        </>
    );
};

export default BlogMasonryItem;