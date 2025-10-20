import image from '../../../public/assets/img/team/team-details.jpg';
import { DribbleTwo, FacebookTwo, TwitterTwo } from '@/svg';
import AnimatedCounter from '../counter/AnimatedCounter';
import { EmailIconFive } from '@/svg/EmailIcons';
import { PhoneIcon } from '@/svg/PhoneIcon';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const TeamDetails = () => {
    return (
        <section className="tp-team-details-area tp-team-details-ptb pb-70">
            <div className="container container-1230">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="tp-team-details-wrap">
                            <div className="tp-team-details-thumb mb-40">
                                <Image style={{ width: "100%", height: "auto" }} src={image} alt="team image" />
                            </div>
                            <div className="tp-team-details-info d-flex justify-content-between">
                                <div className="tp-team-details-info-contact">
                                    <Link href="tel:0123456789"><PhoneIcon /> +(302) 555-0107</Link>
                                    <Link href="mailto:agntix@studio.com"><EmailIconFive /> agntixs@studio.com</Link>
                                </div>
                                <div className="tp-team-details-info-social">
                                    <div className="tp-footer-widget-social">
                                        <Link href="#">
                                            <span><FacebookTwo /></span>
                                        </Link>
                                        <Link href="#">
                                            <span><TwitterTwo /></span>
                                        </Link>
                                        <Link href="#">
                                            <span><DribbleTwo /></span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="tp-team-details-wrapper">
                            <div className="tp-team-details-text">
                                <span className="tp-team-details-text-sub">Founder & CEO</span>
                                <h4 className="tp-team-details-text-title">Logan Dang</h4>
                                <p>As an artist here to solve such issues, we successfully filed several mandamus cases on behalf of more than 250 artwork and their family members and had approved green cards within several months after filing a complaint.</p>
                            </div>
                            <div className="tp-team-details-more mb-50">
                                <h4 className="tp-team-details-more-title">More details</h4>
                                <ul>
                                    <li><span>Location:</span>Germany</li>
                                    <li><span>Position:</span>Founder & CEO</li>
                                    <li><span>Email:</span>info@example.com</li>
                                    <li><span>Age:</span>34</li>
                                    <li><span>Qualification:</span>Master Degree</li>
                                    <li><span>Gender:</span>Male</li>
                                </ul>
                            </div>
                            <div className="tp-team-details-more mb-50">
                                <h4 className="tp-team-details-more-title">Experience</h4>
                                <ul>
                                    <li>Legal employee business law firm (2019-2023)</li>
                                    <li>Research Assistant University of St.Gallen (2017-2019)</li>
                                    <li>Corporate Finance & Management (2013-2017)</li>
                                </ul>
                            </div>
                            <div className="tp-team-details-progress mb-50">
                                <h4 className="tp-team-details-more-title mb-35">My Skills</h4>
                                <div className="tp-team-details-progress mb-35">
                                    <h6 className="tp-team-details-progress-title">UX Design</h6>
                                    <div className="tp-team-details-progress-inner">
                                        <div className="tp-team-details-progress-bar" role="progressbar" style={{ width: "75%" }} aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}>
                                            <h6 className="tp-team-details-progress-counter"><AnimatedCounter min={0} max={75} />%</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="tp-team-details-progress mb-35">
                                    <h6 className="tp-team-details-progress-title">API Development</h6>
                                    <div className="tp-team-details-progress-inner">
                                        <div className="tp-team-details-progress-bar" role="progressbar" style={{ width: "82%" }} aria-valuenow={82} aria-valuemin={0} aria-valuemax={100}>
                                            <h6 className="tp-team-details-progress-counter"><AnimatedCounter min={0} max={82} />%</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tp-team-details-input mb-50">
                                <h4 className="tp-team-details-more-title mb-35">Think I can help?</h4>
                                <div className="tp-team-details-input-content">
                                    <div className="row gx-20">
                                        <div className="col-lg-6">
                                            <input type="text" placeholder="Your name" />
                                        </div>
                                        <div className="col-lg-6">
                                            <input type="text" placeholder="Your email" />
                                        </div>
                                        <div className="col-lg-12">
                                            <input type="text" placeholder="Your website url" />
                                        </div>
                                        <div className="col-lg-12">
                                            <textarea placeholder="Message"></textarea>
                                        </div>
                                    </div>
                                    <div className="tp-team-details-input-btn">
                                        <button>Send Message </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TeamDetails;