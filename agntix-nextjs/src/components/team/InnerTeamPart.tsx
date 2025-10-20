import teamShape from '../../../public/assets/img/team/team-shape-1.png';
import { ArrowSvg, ArrowTwenty } from '@/svg/ArrowIcons';
import TeamFunfact from '../funfact/TeamFunfact';
import { ButtonBlurFilter } from '@/svg';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const InnerTeamPart = () => {
    return (
        <section className="tp-team-part-ptb pt-20 pb-120">
            <div className="container container-1230">
                <div className="tp-team-part-top tp-bounce-trigger pb-140">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="tp-team-part-shape tp-bounce">
                                <Image src={teamShape} alt="team shape" />
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="tp-team-part-heading">
                                <div className="ar-hero-title-box tp_fade_anim" data-delay=".3">
                                    <div className="ar-about-us-4-title-box d-flex align-items-center mb-20">
                                        <span className="tp-section-subtitle pre tp_fade_anim">Team</span>
                                        <div className="ar-about-us-4-icon">
                                            <ArrowTwenty />
                                        </div>
                                    </div>
                                    <h3 className="tp-career-title fs-100 pb-40">{`Wan't`} to be a <br />
                                        part of our team?</h3>
                                    <p className="pb-30">Our journey has been marked by countless successful <br />
                                        projects that not only achieved but surpassed our {`clients'`} <br />
                                        goals, reinforcing their trust in us as a leading innovator <br />
                                        in the digital landscape.</p>
                                    <div className="tp-team-part-btn">
                                        <Link href="/career-light" className="tp-btn-black btn-red-bg">
                                            <span className="tp-btn-black-filter-blur">
                                                <ButtonBlurFilter filterId='buttonFilter' />
                                            </span>
                                            <span className="tp-btn-black-filter d-inline-flex align-items-center" style={{ filter: 'url(#buttonFilter)' }}>
                                                <span className="tp-btn-black-text">Open Positions</span>
                                                <span className="tp-btn-black-circle">
                                                    <ArrowSvg />
                                                </span>
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <TeamFunfact />
                </div>
            </div>
        </section>
    );
};

export default InnerTeamPart;