import projectsData from '@/data/projectData';
import { ArrowSvg } from '@/svg';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface CreativeAgencyProjectProps {
    showDataCursor?: boolean;
    subtitleTextColor?: string;
}

const CreativeAgencyProject: React.FC<CreativeAgencyProjectProps> = (
    {
        showDataCursor = true,
        subtitleTextColor = "color-red",
    }
) => {
    return (
        <div className="studio-project-area studio-project-ptb pb-60">
            <div className="container container-1830">
                <div className="studio-project-top-wrap mb-70">
                    <div className="row">
                        <div className="col-xxl-4 col-xl-2">
                            <div className="studio-project-subtitle-box">
                                <h3 className={`tp-section-subtitle-clash ${subtitleTextColor} mb-0`}>
                                    Use <br /> Cases
                                    <i><ArrowSvg width='102' height='9' viewBox='0 0 102 9' pathValue='M98 8L101.5 4.5L98 1M1 4H101V5H1V4Z' /></i>
                                </h3>
                            </div>
                        </div>
                        <div className="col-xxl-8 col-xl-10">
                            <div className="studio-project-title-wrap">
                                <div className="row align-items-end">
                                    <div className="col-xl-8 col-lg-9">
                                        <div className="studio-project-title-box"> <h3 className="tp-section-title-clash mb-0 tp-text-revel-anim">WHERE BRAINSTORM.AI SHINES</h3></div>
                                    </div>
                                    <div className="col-xl-4 col-lg-3">
                                        <div className="studio-project-btn text-start text-lg-end">
                                            <Link className="tp-btn-red-border" href="/portfolio-col-3-light">View All Examples</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="studio-project-wrap">
                    {projectsData.slice(19, 23).map((project) => (
                        <div className="studio-project-item mb-80" key={project.id}>
                            <div className="row">
                                <div className="col-xl-4">
                                    <div className="studio-project-content-wrap d-flex align-items-start">
                                        <div className="studio-project-number">
                                            <span>{project.number}</span>
                                            <i><ArrowSvg width='202' height='9' viewBox='0 0 202 9' pathValue='M198 8L201.5 4.5L198 1M1 4H201V5H1V4Z' /></i>
                                        </div>
                                        <div className="studio-project-content">
                                            <h4 className="studio-project-title-sm">
                                                <Link href={project.link}>{project.title}</Link>
                                            </h4>
                                            <span>{project.services}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-8">
                                    <div className="not-hide-cursor" {...(showDataCursor === true ? { 'data-cursor': 'View<br>Demo' } : "")}>
                                        <Link className="cursor-hide" href={project.link}>
                                            <div className="studio-project-thumb">
                                                <Image style={{ width: "100%", height: "auto" }} src={project.image} alt={project.title} />
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CreativeAgencyProject;