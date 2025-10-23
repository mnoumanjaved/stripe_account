import { ProfileEmailIcon, ProfileLocationIcon, ProfilePhoneIcon, ProfileTwitorlIcon, UserIcon } from '@/svg/ProfileIcons';
import React, { useState } from 'react';

const ProfileInfo = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <div className="profile__info">
            <h3 className="profile__info-title">Personal Details</h3>
            <div className="profile__info-content">
                <form action="#" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-xxl-6 col-md-6">
                            <div className="profile__input-box">
                                <div className="profile__input">
                                    <input type="text" placeholder="Enter your username" defaultValue="Md Shagor" />
                                    <span><UserIcon /></span>
                                </div>
                            </div>
                        </div>

                        <div className="col-xxl-6 col-md-6">
                            <div className="profile__input-box">
                                <div className="profile__input">
                                    <input type="email" placeholder="Enter your email" defaultValue="example@mail.com" />
                                    <span><ProfileEmailIcon /></span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-6 col-md-6">
                            <div className="profile__input-box">
                                <div className="profile__input">
                                    <input type="text" placeholder="Enter username" defaultValue="Md Shagor" />
                                    <span>
                                        <i className="fa-brands fa-facebook-f"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-6 col-md-6">
                            <div className="profile__input-box">
                                <div className="profile__input">
                                    <input type="text" placeholder="Enter username" defaultValue="Md Shagor" />
                                    <span><ProfileTwitorlIcon /></span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-6 col-md-6">
                            <div className="profile__input-box">
                                <div className="profile__input">
                                    <input type="text" placeholder="Enter your number" defaultValue="0123 456 7889" />
                                    <span><ProfilePhoneIcon /></span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-6 col-md-6">
                            <div className="profile__input-box">
                                <div className="profile__input tp-checkout-input">
                                    <div id="customSelect" className="custom-select">
                                        <div
                                            className={`selected ${isOpen ? 'open' : ''}`}
                                            onClick={() => setIsOpen((prev) => !prev)}
                                        >
                                            Gender <span className="arrow"></span>
                                        </div>
                                        <ul className="options">
                                            <li>Male</li>
                                            <li>Female</li>
                                            <li>Others</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-12">
                            <div className="profile__input-box">
                                <div className="profile__input">
                                    <input type="text" placeholder="Enter your address" defaultValue="3304 Randall Drive" />
                                    <span><ProfileLocationIcon /></span>
                                </div>
                            </div>
                        </div>

                        <div className="col-xxl-12">
                            <div className="profile__input-box">
                                <div className="profile__input">
                                    <textarea placeholder="Enter your bio" defaultValue="Hi there, this is my bio..." />
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-12">
                            <div className="profile__btn">
                                <button type="submit" className="tp-btn-cart sm">Update
                                    Profile</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileInfo;