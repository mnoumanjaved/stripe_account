import { useImageHoverReveal } from '@/hooks/useRevealOnHover';
import { TeamMember } from '@/types/team-d-t';
import Link from 'next/link';
import React from 'react';

interface TeamMemberCardProps {
  member: TeamMember;
  activeCard: number | null;
  setActiveCard: (index: number | null) => void;
  index: number;
  className?:string
}

const DesignStudioTeamCard: React.FC<TeamMemberCardProps> = ({ 
  member, 
  activeCard,
  setActiveCard,
  index,
  className="" 
}) => {
  useImageHoverReveal();

  // All cards are active by default unless another card is hovered
  const isActive = activeCard === null || activeCard === index;

  return (
    <div 
      className={`des-team-item-box ${className} hover-reveal-item p-relative ${
        isActive ? 'active' : ''
      }`}
      onMouseEnter={() => setActiveCard(index)}
      onMouseLeave={() => setActiveCard(null)}
    >
      <Link 
        href={member.link} 
        className="des-team-item d-flex align-items-center justify-content-between"
      >
        <span>{member.since}</span>
        <h4 className="des-team-title">{member.name}</h4>
        <span>{member.position}</span>
      </Link>
      <div
        className="des-team-reveal-img"
        style={{
          backgroundImage: `url(${
            typeof member.image === 'string'
              ? member.image
              : member.image.src
          })`
        }}
      />
    </div>
  );
};

export default DesignStudioTeamCard;