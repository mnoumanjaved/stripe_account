import CareerDetailsSidebar from './subComponents/CareerDetailsSidebar';
import React from 'react';

const CareerDetails = () => {
    return (
        <section className="tp-career-details-ptb pt-120 pb-100">
            <div className="container container-1230">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="tp-career-details-wrapper pb-40">
                            <div className="tp-career-details-top pb-80">
                                <span className="tp-career-details-subtitle">Design</span>
                                <h4 className="tp-career-details-title">Product Designer</h4>
                                <div className="tp-career-details-info d-flex align-items-center">
                                    <div className="tp-career-details-info-item">
                                        <span>Location:</span>
                                        <h5>2600, Austin, New York</h5>
                                    </div>
                                    <div className="tp-career-details-info-item">
                                        <span>Date:</span>
                                        <h5>03 Feb 2025</h5>
                                    </div>
                                    <div className="tp-career-details-info-item">
                                        <span>Job Type</span>
                                        <h5>Full time (Remote)</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="tp-career-details-wrap">
                                <h4 className="tp-career-details-title-2">Job Summary</h4>
                                <p className="pb-50">We are seeking a Product Designer to join our team at Agntix. In this role, you will help craft
                                    the visual and interactive elements of our software products, ensuring a seamless and intuitive user experience. You will collaborate with our product and development teams to create innovative, user-centered designs.</p>

                                <h4 className="tp-career-details-title-2">Key Responsibilities</h4>
                                <div className="tp-career-details-list pb-50">
                                    <ul>
                                        <li>Design intuitive and user-friendly interfaces for our digital products..</li>
                                        <li>Develop wireframes, storyboards, and user flows to communicate design ideas.</li>
                                        <li>Conduct user research and evaluate feedback to refine UI/UX design.</li>
                                        <li>Apply and maintain design guidelines and standards across all products.</li>
                                        <li>Stay updated on the latest UI/UX design trends and technologies.</li>
                                        <li>Visualize complex user scenarios and provide effective design solutions.</li>
                                        <li>Participate in design reviews and be open to feedback.</li>
                                        <li>Contribute to a cohesive and consistent brand identity across interfaces.</li>
                                    </ul>
                                </div>

                                <h4 className="tp-career-details-title-2">Qualifications</h4>
                                <div className="tp-career-details-list pb-50">
                                    <ul>
                                        <li>Demonstrable UI/UX design skills with a strong portfolio.</li>
                                        <li>Proficiency in design tools such as Figma.</li>
                                        <li>Understanding of user-centered design and usability principles.</li>
                                        <li>Ability to translate product requirements into functional designs.</li>
                                        <li>Experience in user research and usability testing is a plus.</li>
                                        <li>Familiarity with UI/UX design trends and technologies.</li>
                                        <li>Strong problem-solving skills and ability to work collaboratively.</li>
                                        <li>Good communication and presentation skills.</li>
                                        <li>Basic understanding of front-end development (HTML5, CSS3) is a plus.</li>
                                        <li>Keen eye for aesthetics and detail.</li>
                                    </ul>
                                </div>

                                <h4 className="tp-career-details-title-2">Perks & Benefits</h4>
                                <p>We are seeking a Product Designer to join our team at Agntix. In this role, you will help craft <br />
                                    the visual and interactive elements of our software products.</p>
                                <div className="tp-career-details-list pb-20">
                                    <ul>
                                        <li>Flexible Spending Account (FSA) and Dependent Care Flexible Spending Account</li>
                                        <li>Healthcare reimbursement (for International employees)</li>
                                        <li>Life, AD&D, Short and Long Term Disability Insurance</li>
                                        <li>401(k) with 4% company matching</li>
                                        <li>Professional development reimbursement</li>
                                        <li>Wellness stipends</li>
                                        <li>Unlimited PTO</li>
                                    </ul>
                                </div>
                                <p>We’re committed to creating the happiest company working for and is proud to provide equal opportunity to all. All the qualified applicants will receive consideration for employment without regard to race, color, ancestry, religion.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        {/* sidebar */}
                        <CareerDetailsSidebar />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CareerDetails;