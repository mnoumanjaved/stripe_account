import mapIcon from '../../../public/assets/img/contact/map-icon.svg';
import Image from 'next/image';
import React from 'react';

const ContactUsForm = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };
    return (
        <div id="down" className="tp-contact-us-form-ptb pt-60 pb-120">
            <div className="container container-1750">
                <div className="tp-contact-us-form-wrapper">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="tp-contact-us-map p-relative">
                                <div className="tp-contact-map-icon-box">
                                    <div className="tp-contact-map-icon">
                                        <span><Image src={mapIcon} alt="map icon" /></span>
                                    </div>
                                </div>
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193596.26002818075!2d-74.1443121872927!3d40.69728463485858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1745055504744!5m2!1sen!2sbd" width="600" height="450" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="tp-contact-us-wrap">
                                <h4 className="tp-contact-us-title mb-55">Send a Message</h4>
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
                                                <label>How Can We Help You*
                                                </label>
                                                <textarea name="message"></textarea>
                                            </div>
                                            <div className="tp-contact-form-btn">
                                                <button className="w-100" type="submit"><span>
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

export default ContactUsForm;