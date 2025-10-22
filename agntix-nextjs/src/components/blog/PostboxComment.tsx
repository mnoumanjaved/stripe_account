/**
 * PostboxComment Component
 *
 * Displays a list of comments for blog posts with support for nested (child) comments.
 * Currently uses hardcoded mock data - should be replaced with dynamic data from an API.
 *
 * Features:
 * - Avatar display for comment authors
 * - Comment metadata (author name, date)
 * - Reply functionality (UI only, not yet functional)
 * - Support for threaded/nested comments via isChild flag
 */

import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

// Import avatar images for comment authors
import commentAvatar1 from '../../../public/assets/img/blog/blog-details/blog-details-sm-2.jpg';
import commentAvatar2 from '../../../public/assets/img/blog/blog-details/blog-details-sm-1.jpg';
import { ArrowSvg } from '@/svg';

/**
 * Comment data structure
 *
 * @typedef {Object} Comment
 * @property {number} id - Unique identifier for the comment
 * @property {StaticImageData} avatar - Avatar image for the comment author
 * @property {string} name - Author's display name (includes "By" prefix)
 * @property {string} date - Comment publication date
 * @property {string} comment - The actual comment text content
 * @property {boolean} isChild - Whether this is a reply/child comment (for nesting/indentation)
 */

// Mock comment data - TODO: Replace with dynamic data from API endpoint
const commentData = [
    {
        id: 1,
        avatar: commentAvatar1,
        name: "By Farhan Firoz",
        date: "January 2, 2025",
        comment: "I love this theme. Sometimes it's difficult to work with some themes, because even if they are created with Elementor, you can't edit all the things with Elementor.",
        isChild: false // Top-level comment
    },
    {
        id: 2,
        avatar: commentAvatar2,
        name: "By Harun Rashid",
        date: "January 2, 2025",
        comment: "They have really taken their time to work appearance of the theme, also, they have a very interactive client assistance service, I like()!",
        isChild: true // This is a reply/nested comment
    },
    {
        id: 3,
        avatar: commentAvatar1,
        name: "By James Taylor",
        date: "January 2, 2025",
        comment: "They have really taken their time to work appearance of the theme, also, they have a very interactive client assistance service, I like()!",
        isChild: false // Top-level comment
    }
];

/**
 * PostboxComment Component
 *
 * Renders a list of comments with proper styling and layout.
 * Child comments (replies) receive the "children" CSS class for indentation.
 *
 * @returns {JSX.Element} An unordered list of comments
 */
const PostboxComment = () => {
    return (
        <ul>
            {/* Map through comment data and render each comment */}
            {commentData.map((comment) => (
                <li key={comment.id} className={comment.isChild ? "children" : ""}>
                    {/* Main comment container with flexbox layout */}
                    <div className="postbox__comment-box d-flex">
                        {/* Left section: Author avatar */}
                        <div className="postbox__comment-info">
                            <div className="postbox__comment-avater mr-30">
                                <Image
                                    src={comment.avatar}
                                    alt="comment author"
                                />
                            </div>
                        </div>

                        {/* Right section: Comment content */}
                        <div className="postbox__comment-text">
                            {/* Header: Author name and date */}
                            <div className="postbox__comment-name d-flex justify-content-between align-items-center">
                                <h5>{comment.name}</h5>
                                <span className="post-meta">{comment.date}</span>
                            </div>

                            {/* Comment text content */}
                            <p>{comment.comment}</p>

                            {/* Reply button (currently non-functional) */}
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