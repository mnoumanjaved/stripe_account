/* eslint-disable @next/next/no-img-element */
import teamMembersData from '@/data/teamData';
import Link from 'next/link';
import React from 'react';

const CreativeAgencyTeam = ({ spacingCls }: { spacingCls?: string }) => {
  const teamSliceData = teamMembersData.slice(9, 15);

  // Group team members into pairs for row layout
  const groupedTeamMembers = [];
  for (let i = 0; i < teamSliceData.length; i += 2) {
    groupedTeamMembers.push(teamSliceData.slice(i, i + 2));
  }

  return (
    <div className={`studio-team-area ${spacingCls} mb-60`}>
      <div className="container container-1460">
        <div className="row justify-content-center">
          <div className="col-xl-8">
            <div className="studio-team-title-box tp_text_anim text-center mb-80">
              <h3 className="tp-section-title-clash tp-text-revel-anim fs-200 mb-20">Our Team Member</h3>
              <p>
                Our ability to combine expertise and systems <br />
                thinking is what fuels us as a team.
              </p>
            </div>
          </div>
        </div>

        <div className="studio-team-wrap z-index-5">
          {groupedTeamMembers.map((pair, index) => (
            <div className="row" key={`row-${index}`}>
              {pair.map((member) => (
                <div className={member.colClass} key={member.id}>
                  <div className={`studio-team-thumb-wrap ${member.wrapClass}`}>
                    <div className={`studio-team-thumb ${member.className} p-relative ${member.mbClass}`}>
                      <img
                        src={typeof member.image === "string" ? member.image : member.image.src}
                        alt={member.name}
                      />
                      <div className="studio-team-content text-center">
                        <h4 className="studio-team-title-sm">
                          <Link href={member.link}>
                            {member.name}
                          </Link>
                        </h4>
                        <span>{member.position}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreativeAgencyTeam;