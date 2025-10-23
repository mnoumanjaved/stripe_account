import blogImg from '../../../public/assets/img/blog/blog-standard/blog-av-1.jpg';
import { DribbleThree } from '@/svg/social-icons/Dribbble';
import { TwitterFour } from '@/svg/social-icons/Twitter';
import CamaraIcon from '@/svg/social-icons/Camara';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const BlogSidebarAuthorInfo = () => {
    return (
            <div className="sidebar-widget-author text-center">
                <div className="sidebar-widget-author-img">
                    <Image src={blogImg} alt="blog" />
                </div>
                <div className="sidebar-widget-author-content">
                    <h4 className="sidebar-widget-author-name">Richard Scott</h4>
                    <span>Content writer at Kanik</span>
                    <p>Crafting Digital Experiences <br /> with Purpose!</p>
                </div>
                <div className="sidebar-widget-author-social mb-30">
                    <Link href="#">
                        <span><TwitterFour /></span>
                    </Link>
                    <Link href="#">
                        <span> <DribbleThree /></span>
                    </Link>
                    <Link href="#">
                        <span><CamaraIcon /></span>
                    </Link>
                </div>
                <div className="sidebar-widget-author-btn">
                    <Link className="tp-btn-yellow-green sidebar-btn w-100" href="#">
                        <span>
                            <span className="text-1">Agntix Theme</span>
                            <span className="text-2">Agntix Theme</span>
                        </span>
                    </Link>
                </div>
            </div>
    );
};

export default BlogSidebarAuthorInfo;