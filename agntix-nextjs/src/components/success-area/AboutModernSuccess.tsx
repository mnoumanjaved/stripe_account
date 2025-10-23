import aboutThumb1 from '../../../public/assets/img/about-us/about-us-thumb-1.jpg';
import aboutThumb2 from '../../../public/assets/img/about-us/about-us-thumb-2.jpg';
import aboutThumb3 from '../../../public/assets/img/about-us/about-us-thumb-4.png';
import aboutUsThumb from '../../../public/assets/img/about-us/about-us-thumb-3.png';
import { CrpIcon } from '@/svg/ServiesIcons';
import { ArrowSvg } from '@/svg';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface IAboutModernSuccess {
    bgColor?: string;
    spacingCls?: string;
}

const AboutModernSuccess: React.FC<IAboutModernSuccess> = ({ bgColor = "#1B1B1D", spacingCls = "mb-70" }) => {
    return (
        <div className={`crp-success-area ${spacingCls} p-relative`}>
            <div className="container-fluid p-0">
                <div className="row gx-10">
                    <div className="col-xl-6">
                        <div className="row gx-10">
                            <div className="col-xl-6 col-lg-6 col-md-6 mb-10">
                                <div className="crp-success-item about-us p-relative" style={{ backgroundColor: bgColor, backgroundImage: `url(${aboutUsThumb.src})` }}>
                                    <div className="crp-about-us-item-wrap">
                                        <div className="crp-about-us-item-icon">
                                            <span><CrpIcon /></span>
                                        </div>
                                        <h4 className="crp-about-us-item-title">Unique and <br />
                                            New Business Tips</h4>
                                        <div className="crp-about-us-item-btn-box">
                                            <span>42k people</span>
                                            <Link href="#"><span>Explore <ArrowSvg /></span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 mb-10">
                                <div className="crp-success-item">
                                    <div className="crp-success-img anim-zoomin-wrap">
                                        <Image className="w-100 anim-zoomin" src={aboutThumb2} alt="about thumb" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 mb-10">
                                <div className="crp-success-item about-us">
                                    <div className="crp-success-video anim-zoomin-wrap">
                                        <video
                                            loop
                                            muted
                                            autoPlay
                                            playsInline
                                            src="/assets/img/about-us/about-us-3.mp4"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 mb-10">
                                <div className="crp-success-item about-us-img p-relative" style={{ backgroundColor: "#1B1B1D" }}>
                                    <div className="crp-about-us-item-img">
                                        <Image src={aboutThumb3} alt="abut thumb" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="crp-success-about-us-big-img anim-zoomin-wrap">
                <Image className="w-100 anim-zoomin" src={aboutThumb1} alt="about thumb" />
            </div>
        </div>
    );
};

export default AboutModernSuccess;