import PricePlanThreeCard from './subComponents/PriceAreaThreeCard';
import useTabIndicator from '@/hooks/useTabIndicator';
import pricePlans from '@/data/priceData';
import React from 'react';

const InnerPriceArea = () => {
    const lineMarkerRef = useTabIndicator();
    // Define the tab values explicitly for each section
    const desktopPlans = pricePlans.slice(6, 12).filter(plan => plan.tab === 'desktop');
    const mobilePlans = pricePlans.slice(6, 12).filter(plan => plan.tab === 'mobile');

    return (
        <div className="app-price-area p-relative pb-130">
            <div className="container container-1230">
                <div className="row align-items-end">
                    <div className="col-lg-12">
                        <div className="app-price-tab-wrap mb-30 tp_fade_anim" data-delay=".7">
                            <div className="ai-price-tab tp-marker-tab d-inline-flex justify-content-center p-relative">
                                <ul className="nav nav-tab" id="myTab" role="tablist">
                                    <li className="nav-items" role="presentation">
                                        <button className="nav-links active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Monthly</button>
                                    </li>
                                    <li className="nav-items" role="presentation">
                                        <button className="nav-links" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Yearly</button>
                                    </li>
                                </ul>
                                <span id="lineMarker" ref={lineMarkerRef}></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex={0}>
                        <div className="app-price-box app-price-inner-style">
                            <div className="row">
                                {desktopPlans.map(plan => (
                                    <PricePlanThreeCard plan={plan} key={plan.id} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex={0}>
                        <div className="app-price-box app-price-inner-style">
                            <div className="row">
                                {mobilePlans.map(plan => (
                                    <PricePlanThreeCard plan={plan} key={plan.id} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InnerPriceArea;