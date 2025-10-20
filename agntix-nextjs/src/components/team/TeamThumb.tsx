import teamThumb from '../../../public/assets/img/team/team-thumb-1.jpg';
import Image from 'next/image';
import React from 'react';

const TeamThumb = () => {
    return (
        <div className="tp-team-inner-thumb-box mb-150">
            <div className="container container-1750">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="tp-team-inner-thumb-wrap">
                            <div className="tp-team-inner-thumb">
                                <Image style={{ width: "100%", height: "auto" }} data-speed=".7" src={teamThumb} alt="team thumb" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamThumb;