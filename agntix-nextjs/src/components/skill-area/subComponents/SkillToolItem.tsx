import { SkillToolDT } from '@/types/custom-d-t';
import Image from 'next/image';
import React from 'react';

const SkillToolItem = ({ name, icon, proficiency, delay }: SkillToolDT) => {
    return (
        <div className="col-xl-3 col-lg-4 col-md-6 tp_fade_anim"
            data-delay={delay}
            data-fade-from="top"
            data-ease="bounce">
            <div className="pp-skill-tools-item text-center">
                <div className="pp-skill-tools-item-icon">
                    <Image src={icon} alt={name} />
                </div>
                <h4 className="pp-skill-tools-item-title">{name}</h4>
                <span className="pp-skill-tools-item-persent">{proficiency}</span>
            </div>
        </div>
    );
};

export default SkillToolItem;