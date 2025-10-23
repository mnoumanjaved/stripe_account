import React, { useState } from "react";

const ContactMeArea = () => {
    const categories = [
        "Branding",
        "Design Concept",
        "App Design",
        "Web Design",
        "Android Development",
        "iOS Development",
        "Logo",
    ];

    const [activeCategories, setActiveCategories] = useState(["App Design"]);

    const handleCategoryClick = (item: string) => {
        if (activeCategories.includes(item)) {
            setActiveCategories(activeCategories.filter((cat) => cat !== item));
        } else {
            setActiveCategories([...activeCategories, item]);
        }
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <div className="tp-contact-me-interest-ptb p-relative">
            <div className="container container-1230">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="tp-contact-me-interest-wrapper pb-100">
                            <h3 className="tp-contact-me-interest-title">{`I'm`} Interested in...</h3>
                            <div className="tp-contact-me-interest-category">
                                {categories.map((item) => (
                                    <span
                                        key={item}
                                        className={`tp-contact-category-btn ${activeCategories.includes(item) ? "active" : ""
                                            }`}
                                        onClick={() => handleCategoryClick(item)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="tp-contact-me-interest-form">
                            <h3 className="tp-contact-me-interest-title">Request a Quote</h3>

                            <div className="tp-contact-me-interest-form-wrap">
                                <form id="contact-form" onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="tp-contact-form-input mb-20">
                                                <label>Full name*</label>
                                                <input name="name" type="text" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="tp-contact-form-input mb-20">
                                                <label>Email address*</label>
                                                <input name="email" type="email" />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="tp-contact-form-input mb-20">
                                                <label>Website link</label>
                                                <input name="subject" type="text" />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="tp-contact-form-input mb-20">
                                                <label>How Can We Help You*</label>
                                                <textarea name="message"></textarea>
                                            </div>
                                            <div className="tp-contact-form-btn">
                                                <button className="w-100" type="submit">
                                                    <span>
                                                        <span className="text-1">Send Message</span>
                                                        <span className="text-2">Send Message</span>
                                                    </span>
                                                </button>
                                                <p className="ajax-response mt-5"></p>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactMeArea;

