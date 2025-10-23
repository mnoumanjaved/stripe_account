import facebook from '../../../public/assets/img/login/facebook.svg';
import google from '../../../public/assets/img/login/google.svg';
import apple from '../../../public/assets/img/login/apple.svg';
import { CloseEyeIcon, OpenEyeIcon } from '@/svg/EyeIcons';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };
    const togglePassword = () => {
        setShowPassword((prev) => !prev);
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="tp-login-wrapper">
                <div className="tp-login-top text-center mb-30">
                    <h3 className="tp-login-title">Sign Up Agntix.</h3>
                    <p>Don’t have an account? <span><Link href="/login">Sign In</Link></span></p>
                </div>
                <div className="tp-login-option">
                    <div className="tp-login-social mb-10 d-flex flex-wrap align-items-center justify-content-center">
                        <div className="tp-login-option-item has-google">
                            <Link href="#">
                                <Image src={google} alt="google" />{" "}
                                Sign in with google
                            </Link>
                        </div>
                        <div className="tp-login-option-item">
                            <Link href="#">
                                <Image src={facebook} alt="facebook" />
                            </Link>
                        </div>
                        <div className="tp-login-option-item">
                            <Link href="#">
                                <Image className="apple" src={apple} alt="apple" />
                            </Link>
                        </div>
                    </div>
                    <div className="tp-login-mail text-center mb-40">
                        <p>or Sign in with <Link href="#">Email</Link></p>
                    </div>
                    <div className="tp-login-input-wrapper">
                        <div className="tp-login-input-box">
                            <div className="tp-login-input-title">
                                <label htmlFor="text">Your Name</label>
                            </div>
                            <div className="tp-login-input">
                                <input id="text" type="text" placeholder="Your Name" />
                            </div>
                        </div>
                        <div className="tp-login-input-box">
                            <div className="tp-login-input-title">
                                <label htmlFor="email">Your Email</label>
                            </div>
                            <div className="tp-login-input">
                                <input id="email" type="email" placeholder="agntix@mail.com" />
                            </div>
                        </div>
                        <div className="tp-login-input-box">
                            <div className="tp-login-input-title">
                                <label htmlFor="tp_password">Password</label>
                            </div>
                            <div className="tp-login-input p-relative">
                                <input id="tp_password" type="password" placeholder="Min. 6 character" />
                                <div onClick={togglePassword} className="tp-login-input-eye" id="password-show-toggle">
                                    <span id="open-eye" className="open-eye" style={{ display: showPassword ? "none" : "block" }}>
                                        <OpenEyeIcon />
                                    </span>
                                    <span id="close-eye" className="open-close" style={{ display: showPassword ? "block" : "none" }}>
                                        <CloseEyeIcon />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tp-login-suggetions d-sm-flex align-items-center justify-content-between mb-20">
                        <div className="tp-login-remeber">
                            <input id="remeber" type="checkbox" />
                            <label htmlFor="remeber">I accept the terms of the Service & Privacy Policy.</label>
                        </div>
                    </div>
                    <div className="tp-login-bottom">
                        <Link href="#" className="tp-login-btn w-100">Sign Up</Link>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default RegisterForm;