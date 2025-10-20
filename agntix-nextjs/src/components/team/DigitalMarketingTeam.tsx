import DigitalMarketingTeamCard from './subComponents/DigitalMarketingTeamCard';
import { TeamTitleUnderline } from '@/svg/TeamTitleUnderline';
import teamMembersData from '@/data/teamData';
import { ArrowSvg } from '@/svg';
import Link from 'next/link';
import React from 'react';

const DigitalMarketingTeam = () => {
    return (
        <div className="dgm-team-area pt-120 pb-80">
            <div className="container container-1330">
                <div className="dgm-team-top-wrap mb-60">
                    <div className="row align-items-end">
                        <div className="col-md-8">
                            <div className="dgm-team-title-box z-index-">
                                <span className="tp-section-subtitle subtitle-black mb-15 tp_fade_anim" data-delay=".3">Team member</span>
                                <h4 className="tp-section-title-grotesk mb-0 tp_fade_anim" data-delay=".5">
                                    Meet the <br /> talented {" "}
                                    <span className="p-relative">
                                        team
                                        <span className="tp-section-title-shape d-none d-md-block">
                                            <TeamTitleUnderline />
                                        </span>
                                    </span>
                                </h4>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="dgm-team-btn-box text-start text-md-end tp_fade_anim" data-delay=".3">
                                <Link className="tp-btn-yellow-green green-solid btn-60" href="/team-light">
                                    <span>
                                        <span className="text-1">All team member</span>
                                        <span className="text-2">All team member</span>
                                    </span>
                                    <i>
                                        <ArrowSvg width={12} height={12} />
                                        <ArrowSvg width={12} height={12} />
                                    </i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dgm-team-wrap">
                    <div className="row">
                        {/* Render team member cards */}
                        {teamMembersData.slice(5, 9).map((member, index) => (
                            <DigitalMarketingTeamCard member={member} key={index} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DigitalMarketingTeam;