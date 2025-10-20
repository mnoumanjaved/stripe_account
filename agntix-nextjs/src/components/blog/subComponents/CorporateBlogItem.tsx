
import { blogDT } from '@/types/blog-d-t';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CorporateBlogItem = ({ post }: { post: blogDT }) => {
    return (
        <div key={post.id} className="crp-blog-item mb-40 tp_fade_anim" data-delay={post.delay}>
            <div className="row">
                <div className="col-md-4">
                    <div className="crp-blog-thumb">
                        <Link href={post.link}>
                            <Image src={post.image} alt="blog" width={500} height={300} />
                        </Link>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="crp-blog-content mt-60">
                        <span className="crp-blog-meta">{post.date}</span>
                        <h4 className="crp-blog-title-sm">
                            <Link className="tp-line-white cream" href={post.link}>
                                {post.title.split('<br/>').map((line, i, arr) => (
                                    <React.Fragment key={i}>
                                        {line}
                                        {i !== arr.length - 1 && <br />}
                                    </React.Fragment>
                                ))}
                            </Link>
                        </h4>
                        <div className="crp-blog-category">
                            {post.categories?.map((category, index) => (
                                <span key={index}>{category}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CorporateBlogItem;