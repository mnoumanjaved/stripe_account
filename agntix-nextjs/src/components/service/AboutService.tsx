import Image from 'next/image';
import React from 'react';

// Import all images with proper typing
import aboutShape from '../../../public/assets/img/home-14/about/about-shape-2.png';
import aboutMeLine from '../../../public/assets/img/about-me/about-me-line.png';
import aboutMeTool1 from '../../../public/assets/img/about-me/about-me-tool-1.svg';
import aboutMeTool2 from '../../../public/assets/img/about-me/about-me-tool-2.svg';
import aboutMeTool3 from '../../../public/assets/img/about-me/about-me-tool-3.svg';
import aboutMeTool4 from '../../../public/assets/img/about-me/about-me-tool-4.svg';
import aboutMeTool5 from '../../../public/assets/img/about-me/about-me-tool-5.svg';
import aboutMeTool6 from '../../../public/assets/img/about-me/about-me-tool-6.svg';
import aboutMeTool7 from '../../../public/assets/img/about-me/about-me-tool-7.svg';
import aboutMeTool8 from '../../../public/assets/img/about-me/about-me-tool-8.svg';
import award1 from '../../../public/assets/img/home-06/award/award-1.png';
import award2 from '../../../public/assets/img/home-06/award/award-2.png';
import award3 from '../../../public/assets/img/home-06/award/award-3.png';

const AboutService: React.FC = () => {
    // Data for skills section
    const skills = [
        {
            title: 'Product Design',
            items: ['UX/UI Design', 'Prototyping', 'Design System', 'Developer Handoff'],
        },
        {
            title: 'Brand Design',
            items: ['Logo Design', 'Brand Guidelines', 'Presentations', 'Digital & Print assets'],
        },
        {
            title: 'Motion Design',
            items: ['UI Animations', 'Logo Animations', 'Illustration Animations', 'Explainer Videos'],
        },
        {
            title: 'Web Development',
            items: ['Front-End Development', 'WordPress Theme', 'SEO'],
        },
    ];

    // Data for tools section
    const tools = [
        { icon: aboutMeTool1, percentage: '94%', name: 'Figma' },
        { icon: aboutMeTool2, percentage: '85%', name: 'Sketch' },
        { icon: aboutMeTool3, percentage: '74%', name: 'Photoshop' },
        { icon: aboutMeTool4, percentage: '63%', name: 'Invision' },
        { icon: aboutMeTool5, percentage: '69%', name: 'Invision' },
        { icon: aboutMeTool6, percentage: '55%', name: 'Invision' },
        { icon: aboutMeTool7, percentage: '40%', name: 'HTML' },
        { icon: aboutMeTool8, percentage: '49%', name: 'WordPress' },
    ];

    // Data for experience section
    const experiences = [
        { period: 'Aug. 2025 - Present', title: 'Motion Designer', company: 'BarberShop Studio' },
        { period: 'Nov. 2018- Mar. 2022', title: 'UI/UX Lead Designer', company: 'Amazon INC' },
        { period: 'Nov. 2018- Mar. 2023', title: 'Digital Art Director', company: 'BarberShop Studio' },
        { period: 'Nov. 2018- Mar. 2025', title: 'Product Designer', company: '(internship)' },
    ];

    // Data for recognitions section
    const recognitions = [
        { icon: award1, text: '3x Site of the Day' },
        { icon: award2, text: 'Site of the year' },
        { icon: award3, text: '2x Site of the Day' },
    ];

    // Reusable section header component
    const SectionHeader = () => (
        <div className="pp-about-me-service-heading d-flex align-items-center mb-50">
            <span className="pp-about-me-service-subtitle">About</span>
            <Image src={aboutMeLine} alt="" />
        </div>
    );

    return (
        <div id="down" className="pp-about-me-service-area pp-about-me-service-ptb z-index-3 p-relative pb-170">
            <div className="pp-service-shape">
                <Image data-speed="1.1" src={aboutShape} alt="about shape" />
            </div>

            <div className="container container-1430">
                {/* Skills Section */}
                <div className="pp-about-me-service-item pb-60">
                    <SectionHeader />
                    <div className="row">
                        <div className="col-lg-5">
                            <h3 className="pp-about-me-service-title">Skills</h3>
                        </div>
                        <div className="col-lg-7">
                            <div className="pp-skill-list-wrap pp-about-me-skill">
                                <div className="row">
                                    {skills.map((skill, index) => (
                                        <div key={index} className="col-sm-6 tp_fade_anim" data-delay={index % 2 === 0 ? '.3' : '.5'}>
                                            <div className="pp-skill-list mb-60">
                                                <h4 className="pp-skill-list-title">{skill.title}</h4>
                                                <ul>
                                                    {skill.items.map((item, itemIndex) => (
                                                        <li key={itemIndex}>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tools Section */}
                <div className="pp-about-me-service-item pb-110">
                    <SectionHeader />
                    <div className="row">
                        <div className="col-xxl-5 col-xl-3">
                            <h3 className="pp-about-me-service-title">Toolbox</h3>
                        </div>
                        <div className="col-xxl-7 col-xl-9">
                            <div className="pp-about-me-tool-warp">
                                <div className="row row-cols-xl-3 gx-20">
                                    {tools.map((tool, index) => (
                                        <div key={index} className="col">
                                            <div className="pp-about-me-tool-item d-flex align-items-center mb-20 tp_fade_anim"
                                                data-delay={`.${3 + (index % 3) * 2}`}>
                                                <div className="pp-about-me-tool-item-icon">
                                                    <span><Image src={tool.icon} alt="" /></span>
                                                </div>
                                                <div className="pp-about-me-tool-item-content">
                                                    <span>{tool.percentage}</span>
                                                    <p>{tool.name}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Experience Section */}
                <div className="pp-about-me-service-item pb-50">
                    <SectionHeader />
                    <div className="row">
                        <div className="col-lg-5">
                            <h3 className="pp-about-me-service-title">Experience</h3>
                        </div>
                        <div className="col-lg-7">
                            <div className="pp-about-me-experience-wrap">
                                <div className="row">
                                    {experiences.map((exp, index) => (
                                        <div key={index} className="col-sm-6">
                                            <div className="pp-about-me-experience-item pb-75 tp_fade_anim"
                                                data-delay={index % 2 === 0 ? '.3' : '.5'}>
                                                <p>{exp.period}</p>
                                                <h4 className="pp-about-me-experience-title">{exp.title}</h4>
                                                <p>{exp.company}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recognitions Section */}
                <div className="pp-about-me-service-item">
                    <SectionHeader />
                    <div className="row">
                        <div className="col-lg-5">
                            <h3 className="pp-about-me-service-title">Recognitions</h3>
                        </div>
                        <div className="col-lg-7">
                            <div className="pp-about-me-recognitions">
                                <div className="row gx-55">
                                    {recognitions.map((recognition, index) => (
                                        <div key={index} className="col-md-4 mb-30">
                                            <div className="studio-award-item tp_fade_anim"
                                                data-delay={`.${3 + index * 2}`}>
                                                <div className="studio-award-icon">
                                                    <Image src={recognition.icon} alt="icon" />
                                                </div>
                                                <span>{recognition.text}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutService;