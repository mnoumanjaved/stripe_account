import React from 'react';

interface StatItem {
  value: string;
  suffix: string;
  text: string;
  bgColor?: string;
  className: string;
  mt?: boolean;
}

const DesignAgencyChoose = () => {
    // Main stats data
    const mainStats = [
        {
            value: "3",
            suffix: "m+",
            text: "In funding clients raised owing <br> to our design work",
            className: "design-choose-item design-choose-item-1 mb-30",
        },
        {
            value: "60",
            suffix: "+",
            text: "World's biggest international design <br> awards won",
            className: "design-choose-item design-choose-item-2 mb-30",
        },
        {
            value: "260",
            suffix: "+",
            text: "Crafted responsive, user-centered <br> website & app",
            className: "design-choose-item design-choose-item-1 mb-30",
        },
        {
            value: "12",
            suffix: "+",
            text: "We have had quite a run in our <br> 12+ years of working",
            className: "design-choose-item design-choose-item-2 mb-30",
        }
    ];
    // Render a single stat item
    const renderStatItem = (item: StatItem, index: number) => (
        <div key={index} className={`col-xl-6 ${item.mt ? 'mt-30' : ''}`}>
            <div 
                className={item.className} 
                style={item.bgColor ? { backgroundColor: item.bgColor } : {}}
            >
                <span>{item.value}<i>{item.suffix}</i></span>
                <p dangerouslySetInnerHTML={{ __html: item.text }}/>
            </div>
        </div>
    );

    // Render a row of stats
    const renderStatsRow = (stats: StatItem[]) => (
        <div className="row">
            {stats.map((stat, index) => renderStatItem(stat, index))}
        </div>
    );

    return (
        <div className="design-choose-area design-choose-2-style title-box pt-160 pb-120">
            <div className="container container-1680">
                <div className="row justify-content-center">
                    <div className="col-xl-5">
                        <div className="design-choose-title-box text-center mb-80">
                            <p>
                                We proved, design, implement, and market
                                your idea with absolute transparency and efficiency
                                in its core
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main stats section */}
                <div className="design-choose-item-wrap">
                    <div className="row justify-content-center">
                        <div className="col-xl-9">
                            {renderStatsRow(mainStats.slice(0, 2))}
                        </div>
                    </div>
                </div>
                
                <div className="design-choose-item-wrap">
                    <div className="row justify-content-center">
                        <div className="col-xl-9">
                            {renderStatsRow(mainStats.slice(2, 4))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DesignAgencyChoose;