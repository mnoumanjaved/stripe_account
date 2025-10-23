import React from 'react';

const BlogSidebarSearchInput = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };
    return (
        <form action="#" onClick={handleSubmit}>
            <div className="sidebar-search-input">
                <input type="text" placeholder="Search..." />
                <button type="submit">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.9999 19L14.6499 14.65M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z" stroke="currentcolor" strokeOpacity="0.8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </form>
    );
};

export default BlogSidebarSearchInput;