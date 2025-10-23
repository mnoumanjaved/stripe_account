import { SkillCategoryDT } from '@/types/custom-d-t';
import React from 'react';

const SkillCategoryItem = ({ title, items, delay }: SkillCategoryDT) => {
    return (
        <div className="col-sm-6 tp_fade_anim" data-delay={delay}>
            <div className="pp-skill-list mb-60">
                <h4 className="pp-skill-list-title">{title}</h4>
                <ul>
                    {items.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SkillCategoryItem;