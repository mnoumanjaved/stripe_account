import { FacebookSvg, LinkedinSvg, TwitterSvg } from '@/svg';
import { useHoverEffectTwo } from '@/hooks/useHoverEffect';
import { TeamMember } from '@/types/team-d-t';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react';

interface TeamMemberPropsDT {
    member: TeamMember;
    index: number;
}

const DigitalMarketingTeamCard = ({ member, index }: TeamMemberPropsDT) => {
    const hoverContainerRef = useRef<HTMLDivElement>(null);

    // Pass the entire image object (can be string or StaticImageData)
    useHoverEffectTwo(hoverContainerRef, member.image);

    return (
        <div key={member.id} className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
            <div
                className="dgm-team-item mb-40 tp_fade_anim"
                data-delay={`0.${index + 3}`}
            >
                <div className="dgm-team-thumb tp--hover-item p-relative">
                    <Link href={member.link}>
                        <div
                            className="tp--hover-img"
                            ref={hoverContainerRef}
                        >
                            <Image
                                src={member.image}
                                alt={member.name}
                                className="img-fluid"
                                width={500}
                                height={500}
                                priority={index < 4}
                            />
                        </div>
                    </Link>
                </div>
                <div className="dgm-team-content">
                    <h4 className="dgm-team-title-sm">
                        <Link className="tp-line-black" href={member.link}>
                            {member.name}
                        </Link>
                    </h4>
                    <span>{member.position}</span>
                    <div className="dgm-team-social">
                        {member.socialLinks?.facebook && (
                            <Link href={member.socialLinks.facebook}>
                                <span><FacebookSvg /></span>
                            </Link>
                        )}{" "}
                        {member.socialLinks?.twitter && (
                            <Link href={member.socialLinks.twitter}>
                                <span><TwitterSvg /></span>
                            </Link>
                        )}{" "}
                        {member.socialLinks?.linkedin && (
                            <Link href={member.socialLinks.linkedin}>
                                <span><LinkedinSvg width={12} height={12} /></span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DigitalMarketingTeamCard;