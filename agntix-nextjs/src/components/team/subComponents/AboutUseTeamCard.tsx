import { TeamMember } from '@/types/team-d-t';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface TeamMemberCardProps {
    member: TeamMember;
}

const AboutUseTeamCard: React.FC<TeamMemberCardProps> = ({ member }) => {
    return (
        <div key={`team-member-${member.id}`} className="swiper-slide">
            <div className="tp-team-item">
                <div className="tp-team-item-thumb">
                    <Link href={member.link}>
                        <Image style={{ width: "100%", height: "auto" }} src={member.image} alt={member.name} />
                    </Link>
                    <div className="studio-team-content text-center">
                        <h4 className="studio-team-title-sm">
                            <Link href={member.link}>{member.name}</Link>
                        </h4>
                        <span>{member.position}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUseTeamCard;