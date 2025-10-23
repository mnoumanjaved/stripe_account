import { AchievementIcon, CustomerIcon, ExperienceIcon, ProjectIcon } from '@/svg/TeamIcons';
import AnimatedCounter from '../counter/AnimatedCounter';
import React from 'react';

const TeamFunfact = ({ spacing = "mb-30" }: { spacing?: string }) => {
    const couterData = [
        { end: 2, suffix: "k", text: 'Project Completed', icon: <ProjectIcon /> },
        { end: 6, suffix: "", text: 'My Achievement', icon: <AchievementIcon /> },
        { end: 12, suffix: "+", text: 'Year of Experience', icon: <ExperienceIcon /> },
        { end: 98, suffix: "%", text: 'Happy Customer', icon: <CustomerIcon /> },
    ]
    return (
        <>
            {
                couterData.map((data, index) => (
                    <div className="col-lg-3 col-sm-6" key={index}>
                        <div className={`tp-team-part-item ${spacing}`}>
                            <div className="tp-team-part-item-title">
                                <h4><AnimatedCounter min={0} max={data.end} />{data.suffix}</h4>
                            </div> 
                            <div className="tp-team-part-item-content">
                                <p>{data.text}</p>
                                <span>{data.icon}</span>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    );
};

export default TeamFunfact;