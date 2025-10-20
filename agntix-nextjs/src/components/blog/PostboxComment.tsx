import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

// Import images
import commentAvatar1 from '../../../public/assets/img/blog/blog-details/blog-details-sm-2.jpg';
import commentAvatar2 from '../../../public/assets/img/blog/blog-details/blog-details-sm-1.jpg';
import { ArrowSvg } from '@/svg';

// Create comment data
const commentData = [
    {
        id: 1,
        avatar: commentAvatar1,
        name: "By Farhan Firoz",
        date: "January 2, 2025",
        comment: "I love this theme. Sometimes it's difficult to work with some themes, because even if they are created with Elementor, you can't edit all the things with Elementor.",
        isChild: false
    },
    {
        id: 2,
        avatar: commentAvatar2,
        name: "By Harun Rashid",
        date: "January 2, 2025",
        comment: "They have really taken their time to work appearance of the theme, also, they have a very interactive client assistance service, I like()!",
        isChild: true
    },
    {
        id: 3,
        avatar: commentAvatar1,
        name: "By James Taylor",
        date: "January 2, 2025",
        comment: "They have really taken their time to work appearance of the theme, also, they have a very interactive client assistance service, I like()!",
        isChild: false
    }
];

const PostboxComment = () => {
    return (
        <ul>
            {commentData.map((comment) => (
                <li key={comment.id} className={comment.isChild ? "children" : ""}>
                    <div className="postbox__comment-box d-flex">
                        <div className="postbox__comment-info">
                            <div className="postbox__comment-avater mr-30">
                                <Image
                                    src={comment.avatar}
                                    alt="comment author"
                                />
                            </div>
                        </div>
                        <div className="postbox__comment-text">
                            <div className="postbox__comment-name d-flex justify-content-between align-items-center">
                                <h5>{comment.name}</h5>
                                <span className="post-meta">{comment.date}</span>
                            </div>
                            <p>{comment.comment}</p>
                            <div className="postbox__comment-reply">
                                <Link href="#">
                                    Reply
                                    <span>
                                        <ArrowSvg strokeWidth={2} />
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default PostboxComment;