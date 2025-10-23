import { LeftArrowIcon, RightArrowIcon, VideoPlayIcon } from '@/svg';
import { useVideoModal } from '@/provider/VideoProvider';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { blogPosts } from '@/data/blogPost';
import ClockIcon from '@/svg/ClockIcon';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const BlogStandardPost = () => {
    const { playVideo } = useVideoModal();

    return (
        <>
            {blogPosts.map((post) => (
                <article key={post.id} className="postbox-item mb-30">
                    {/* --- Author --- */}
                    <div className="postbox-author-wrap d-flex align-items-center justify-content-between mb-30">
                        <div className="postbox-author-box d-flex align-items-center">
                            <div className="postbox-author-img">
                                <Image src={post.authorImg} alt={post.authorName} />
                            </div>
                            <div className="postbox-author-info">
                                <h4 className="postbox-author-name">{post.authorName}</h4>
                                <span>{post.authorRole}</span>
                            </div>
                        </div>
                        <div className="postbox-meta">
                            <i><ClockIcon/></i>{" "}
                            <span>{post.date}</span>
                        </div>
                    </div>

                    {/* --- Thumbnail / Video / Quote / Slider --- */}
                    {post.thumb && !post.videoUrl && !post.slider && (
                        <div className="postbox-thumb mb-35">
                            <Link href={post.link || "#"}>
                                <Image style={{width:"100%", height:"auto"}} className="w-100" src={post.thumb} alt={post.title} />
                            </Link>
                        </div>
                    )}

                    {post.videoUrl && (
                        <div className="postbox-thumb postbox-thumb-overlay p-relative mb-35">
                            <Link href={post.link || "#"}>
                                <Image style={{width:"100%", height:"auto"}} className="w-100" src={post.thumb} alt={post.title} />
                            </Link>
                            <div className="postbox-play-btn z-index-1">
                                <button onClick={() => playVideo(post.videoUrl)} className="popup-video">
                                    <span><VideoPlayIcon /></span>
                                </button>
                            </div>
                        </div>
                    )}

                    {post.quote && (
                        <div className="postbox-blockquote mb-35">
                            <blockquote>
                                <div className="postbox-blockquote-post">
                                    <div className="postbox-blockquote-paragraph">
                                        <p>{post.quote}</p>
                                    </div>
                                </div>
                            </blockquote>
                        </div>
                    )}

                    {post.slider && (
                        <div className="postbox-slider-thumb mb-35">
                            <div className="postbox-slider p-relative">
                                <Swiper
                                    modules={[Navigation]}
                                    slidesPerView={1}
                                    loop={true}
                                    autoplay={false}
                                    spaceBetween={0}
                                    speed={1000}
                                    breakpoints={{
                                        '1400': { slidesPerView: 1 }
                                    }}
                                    navigation={{
                                        prevEl: '.postbox-arrow-prev',
                                        nextEl: '.postbox-arrow-next',
                                    }}
                                    className='postbox-slider-active fix'
                                >
                                    {post.slider.map((img, i) => (
                                        <SwiperSlide key={i}>
                                            <div className="postbox-slider-item">
                                                <Image style={{width:"100%", height:"auto"}} className="w-100" src={img} alt="slide" />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                <div className="postbox-arrow">
                                    <button className="postbox-arrow-prev">
                                        <span>
                                            <LeftArrowIcon width='14' height='14' strokeWidth={2} />
                                        </span>
                                    </button>
                                    <button className="postbox-arrow-next">
                                        <span>
                                            <RightArrowIcon width='14' height='14' strokeWidth={2} />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- Content --- */}
                    <div className="postbox-content">
                        <span className="postbox-tag">{post.tag}</span>
                        <h3 className="postbox-title">
                            <Link href={post.link || "#"}>{post.title}</Link>
                        </h3>
                        {post.excerpt && <p>{post.excerpt}</p>}
                        {post.link && (
                            <Link className="tp-btn-yellow-border postbox-btn" href={post.link}>
                                <span>
                                    <span className="text-1">View More</span>
                                    <span className="text-2">View More</span>
                                </span>
                            </Link>
                        )}
                    </div>
                </article>
            ))}
        </>
    );
};

export default BlogStandardPost;