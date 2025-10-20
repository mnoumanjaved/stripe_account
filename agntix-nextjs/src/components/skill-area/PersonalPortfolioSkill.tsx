import lineImg from '../../../public/assets/img/home-14/slider/pp-line.png';
import SkillCategoryItem from './subComponents/SkillCategoryItem';
import { skillCategories, skillTools } from '@/data/skillData';
import SkillToolItem from './subComponents/SkillToolItem';
import Image from 'next/image';
import React from 'react';

const PersonalPortfolioSkill = () => {
    return (
        <div className="pp-skill-area pp-skill-ptb pb-150" style={{ backgroundColor: "#FFF669" }}>
            {/* Big Title Section */}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="pp-skill-big-text text-center">
                            <h2 className="pp-skill-big-text-title tp-split-text tp-split-right">
                                Tools & Skills
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* Skills Content Section */}
            <div className="container container-1230">
                <div className="pp-skill-list-wrapper pb-60">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="pp-skill-heading d-flex align-items-center mb-50">
                                <span className="pp-skill-subtitle">About</span>
                                <Image src={lineImg} alt="Divider line" />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-4">
                            <div className="pp-skill-heading">
                                <h3 className="pp-skill-title">
                                    Tools <br />& Skills
                                </h3>
                            </div>
                        </div>

                        <div className="col-lg-8">
                            <div className="pp-skill-list-wrap">
                                <div className="row">
                                    {skillCategories.map((category, index) => (
                                        <SkillCategoryItem key={index} {...category} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tools Section */}
                <div className="pp-skill-tools">
                    <div className="row gx-0 justify-content-center">
                        {skillTools.map((tool, index) => (
                            <SkillToolItem key={index} {...tool} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalPortfolioSkill;