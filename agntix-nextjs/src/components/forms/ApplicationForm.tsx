import { ArrowFour } from '@/svg';
import React from 'react';

const ApplicationForm = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };
    return (
        <form onClick={handleSubmit} id="contact-form">
            <div className="row">
                <div className="col-lg-6">
                    <div className="tp-contact-form-input mb-20">
                        <label>Your Name*</label>
                        <input name="name" type="text" />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="tp-contact-form-input mb-20">
                        <label>Your Email address*</label>
                        <input name="email" type="email" />
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="tp-contact-form-input mb-20">
                        <label>why you decided to apply hare and why should we select you?*
                        </label>
                        <textarea name="message"></textarea>
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="tp-contact-form-input mb-20">
                        <label>Tell us About a project that you worked on and felt proud of IT.
                        </label>
                        <textarea name="message"></textarea>
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="tp-contact-form-input mb-20">
                        <label>share your portfolio. ( behance, dribble, etc)*
                        </label>
                        <textarea name="message"></textarea>
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="tp-contact-form-input mb-20">
                        <label>your current salary & what are your salary expectations?*
                        </label>
                        <textarea name="message"></textarea>
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="tp-application-form-btn d-flex justify-content-between">
                        <div className="tp-application-upload mb-15">
                            <span>Upload your CV *</span>
                            <input type="file" />
                        </div>
                        <div className="tp-application-btn mb-15 mt-10">
                            <button type="submit" className="tp-btn-yellow-green green-solid btn-60">
                                <span>
                                    <span className="text-1">Submit Now</span>
                                    <span className="text-2">Submit Now</span>
                                </span>
                                <i>
                                    <ArrowFour />
                                    <ArrowFour />
                                </i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ApplicationForm;