import { useVideoModal } from '@/provider/VideoProvider';
import { EditIcon } from '@/svg/CategoriesIcons';
import { ArrowFour, VideoPlayIcon } from '@/svg';
import { blogDT } from '@/types/blog-d-t';
import ClockIcon from '@/svg/ClockIcon';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface blogProps {
    blog: blogDT;
    colClass?: string;
    titleFont?: string;
}
const BlogGridTwoItem: React.FC<blogProps> = ({ blog, colClass = "col-md-6", titleFont = "fs-30" }) => {
    const { playVideo } = useVideoModal();

    return (
        <div className={colClass}>
            <div className="tp-blog-masonry-item mb-30">
                <div className="tp-blog-masonry-item-top d-flex justify-content-between align-items-center mb-30">
                    <div className="tp-blog-masonry-item-user d-flex align-items-center">
                        <div className="tp-blog-masonry-item-user-thumb">{blog.authorImg && <Image src={blog.authorImg} alt="author image" />}</div>
                        <div className="tp-blog-masonry-item-user-content">
                            <span>{blog.author}</span>
                            <p>Administrator</p>
                        </div>
                    </div>
                    <div className="tp-blog-masonry-item-time">
                        <span><ClockIcon /> {blog.date}</span>
                    </div>
                </div>
                {
                    blog.videoUrl ? (
                        <div className="tp-blog-masonry-thumb p-relative mb-30">
                            <Link href={blog.link}>
                                <Image
                                    style={{ width: "100%", height: "auto" }}
                                    src={blog.image}
                                    alt="blog image"
                                />
                            </Link>
                            <div className="tp-blog-masonry-thumb-video">
                                <button className="popup-video"
                                    onClick={() => blog.videoUrl && playVideo(blog.videoUrl)}
                                >
                                    <span><VideoPlayIcon /></span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="tp-blog-masonry-thumb mb-30">
                            <Link href={blog.link}>
                                <Image
                                    style={{ width: "100%", height: "auto" }}
                                    src={blog.image}
                                    alt="blog image"
                                />
                            </Link>
                        </div>
                    )
                }
                <div className="tp-blog-masonry-content">
                    <div className="tp-blog-masonry-tag mb-15">
                        <span><EditIcon /> {blog.category}</span>
                    </div>
                    <h4 className={`tp-blog-masonry-title ${titleFont}`}>
                        <Link
                            className="tp-line-white"
                            href={blog.link}
                            dangerouslySetInnerHTML={{ __html: blog.title }}
                        />
                    </h4>
                    <div className="tp-blog-masonry-btn">
                        <Link href={blog.link}>Read More <span>
                            <ArrowFour strokeWidth={2} />
                            <ArrowFour strokeWidth={2} />
                        </span></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogGridTwoItem;