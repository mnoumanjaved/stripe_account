"use client";
import facebook from '../../../public/assets/img/login/facebook.svg';
import google from '../../../public/assets/img/login/google.svg';
import apple from '../../../public/assets/img/login/apple.svg';
import { CloseEyeIcon, OpenEyeIcon } from '@/svg/EyeIcons';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword((prev) => !prev);
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="tp-login-wrapper">
                {/* --- header --- */}
                <div className="tp-login-top text-center mb-30">
                    <h3 className="tp-login-title">Login to Agntix.</h3>
                    <p>
                        Don’t have an account?{" "}
                        <span>
                            <Link href="/register">Create a free account</Link>
                        </span>
                    </p>
                </div>

                {/* --- options --- */}
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
                        <p>
                            or Sign in with <Link href="#">Email</Link>
                        </p>
                    </div>

                    {/* --- inputs --- */}
                    <div className="tp-login-input-wrapper">
                        {/* email */}
                        <div className="tp-login-input-box">
                            <div className="tp-login-input-title">
                                <label htmlFor="email">Your Email</label>
                            </div>
                            <div className="tp-login-input">
                                <input id="email" type="email" placeholder="agntix@mail.com" />
                            </div>
                        </div>

                        {/* password */}
                        <div className="tp-login-input-box">
                            <div className="tp-login-input-title">
                                <label htmlFor="tp_password">Password</label>
                            </div>
                            <div className="tp-login-input p-relative">
                                <input
                                    id="tp_password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Min. 6 character"
                                />
                                <div
                                    className="tp-login-input-eye"
                                    id="password-show-toggle"
                                    onClick={togglePassword}
                                    role="button"
                                    aria-label="Toggle password visibility"
                                >
                                    <span
                                        id="open-eye"
                                        className="open-eye"
                                        style={{ display: showPassword ? "none" : "block" }}
                                    >
                                        <OpenEyeIcon />
                                    </span>
                                    <span
                                        id="close-eye"
                                        className="open-close"
                                        style={{ display: showPassword ? "block" : "none" }}
                                    >
                                        <CloseEyeIcon />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- remember + forgot --- */}
                    <div className="tp-login-suggetions d-sm-flex align-items-center justify-content-between mb-30">
                        <div className="tp-login-remeber">
                            <input id="remeber" type="checkbox" />
                            <label htmlFor="remeber">Remember me</label>
                        </div>
                        <div className="tp-login-forgot">
                            <Link href="#">Forgot Password?</Link>
                        </div>
                    </div>

                    {/* --- login button --- */}
                    <div className="tp-login-bottom">
                        <Link href="#" className="tp-login-btn w-100">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default LoginForm;
