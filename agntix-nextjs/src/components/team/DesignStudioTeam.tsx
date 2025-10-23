"use client"
import DesignStudioTeamCard from './subComponents/DesignStudioTeamCard';
import teamMembersData from '@/data/teamData';
import React, { useState } from 'react';

interface DesignStudioTeamProps {
  wrapClass?: string;
  spacingCls?: string;
  className?: string;
}

const DesignStudioTeam: React.FC<DesignStudioTeamProps> = ({ 
  wrapClass = "", 
  spacingCls = "pb-200" ,
  className = ""
}) => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <div className={`des-team-area ${spacingCls}`}>
      <div className="container container-1750">
        <div className="row">
          <div className="col-xl-12">
            <div className={`des-team-wrap ${wrapClass}`}>
              {teamMembersData.slice(0, 5).map((member, index) => (
                <DesignStudioTeamCard
                  key={member.id}
                  member={member}
                  index={index}
                  activeCard={activeCard}
                  setActiveCard={setActiveCard}
                  className={className}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignStudioTeam;