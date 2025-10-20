import React from 'react';

const PostboxDetailsForm = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };
    return (
        <form onClick={handleSubmit}>
            <div className="postbox-details-form-inner">
                <div className="row">
                    <div className="col-xl-6">
                        <div className="postbox-details-input-box">
                            <div className="postbox-details-input">
                                <label>Name *</label>
                                <input type="text" />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="postbox-details-input-box">
                            <div className="postbox-details-input">
                                <label>Email *</label>
                                <input type="email" />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-12">
                        <div className="postbox-details-input-box">
                            <div className="postbox-details-input">
                                <label>Website</label>
                                <input type="text" />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-12">
                        <div className="postbox-details-input-box">
                            <div className="postbox-details-input">
                                <label>Comment *</label>
                                <textarea id="msg"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="postbox-details-suggetions mb-20">
                <div className="postbox-details-remeber">
                    <input id="remeber" type="checkbox" />
                    <label htmlFor="remeber">Save my name, email, and website in this browser for the next time I comment.</label>
                </div>
            </div>
            <div className="postbox-details-input-box">
                <button className="tp-btn-yellow-green sidebar-btn-style sidebar-btn" type="submit">
                    <span>
                        <span className="text-1">Post Comment</span>
                        <span className="text-2">Post Comment</span>
                    </span>
                </button>
            </div>
        </form>
    );
};

export default PostboxDetailsForm;