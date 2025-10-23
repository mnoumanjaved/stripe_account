
import ProfileNotification from './subComponents/ProfileNotification';
import ProfilePassword from './subComponents/ProfilePassword';
import ProfileAddress from './subComponents/ProfileAddress';
import ProfileTicket from './subComponents/ProfileTicket';
import ProfileMain from './subComponents/ProfileMain';
import ProfileInfo from './subComponents/ProfileInfo';
import React from 'react';

const MyAccountProfile = () => {
    return (
        <section className="profile__area pt-200 pb-120">
            <div className="container">
                <div className="profile__inner p-relative">
                    <div className="row">
                        <div className="col-xxl-4 col-lg-4">
                            <div className="profile__tab mr-40">
                                <nav>
                                    <div className="nav nav-tabs tp-tab-menu flex-column" id="profile-tab" role="tablist">
                                        <button className="nav-link active" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false"><span><i className="fa-regular fa-user-pen"></i></span>Profile</button>
                                        <button className="nav-link" id="nav-information-tab" data-bs-toggle="tab" data-bs-target="#nav-information" type="button" role="tab" aria-controls="nav-information" aria-selected="false"><span><i className="fa-regular fa-circle-info"></i></span>
                                            {" "}Information</button>
                                        <button className="nav-link" id="nav-address-tab" data-bs-toggle="tab" data-bs-target="#nav-address" type="button" role="tab" aria-controls="nav-address" aria-selected="false"><span><i className="fa-light fa-location-dot"></i></span> Address
                                        </button>
                                        <button className="nav-link" id="nav-order-tab" data-bs-toggle="tab" data-bs-target="#nav-order" type="button" role="tab" aria-controls="nav-order" aria-selected="false"><span><i className="fa-light fa-clipboard-list-check"></i></span> My
                                            Orders </button>
                                        <button className="nav-link" id="nav-notification-tab" data-bs-toggle="tab" data-bs-target="#nav-notification" type="button" role="tab" aria-controls="nav-notification" aria-selected="false"><span><i className="fa-regular fa-bell"></i></span> Notification</button>
                                        <button className="nav-link" id="nav-password-tab" data-bs-toggle="tab" data-bs-target="#nav-password" type="button" role="tab" aria-controls="nav-password" aria-selected="false"><span><i className="fa-regular fa-lock"></i></span> Change
                                            Password</button>
                                    </div>
                                </nav>
                            </div>
                        </div>
                        <div className="col-xxl-8 col-lg-8">
                            <div className="profile__tab-content">
                                <div className="tab-content" id="profile-tabContent">
                                    <div className="tab-pane fade show active" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                        <ProfileMain />
                                    </div>
                                    <div className="tab-pane fade" id="nav-information" role="tabpanel" aria-labelledby="nav-information-tab">
                                        <ProfileInfo />
                                    </div>
                                    <div className="tab-pane fade" id="nav-password" role="tabpanel" aria-labelledby="nav-password-tab">
                                        <ProfilePassword />
                                    </div>
                                    <div className="tab-pane fade" id="nav-address" role="tabpanel" aria-labelledby="nav-address-tab">
                                        <ProfileAddress />
                                    </div>
                                    <div className="tab-pane fade" id="nav-order" role="tabpanel" aria-labelledby="nav-order-tab">
                                        <ProfileTicket />
                                    </div>
                                    <div className="tab-pane fade" id="nav-notification" role="tabpanel" aria-labelledby="nav-notification-tab">
                                        <ProfileNotification />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyAccountProfile;