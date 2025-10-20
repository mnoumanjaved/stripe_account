import { CalenderIcon, CategoryIcon, ExperienceIcon, TimingIcon } from '@/svg/CareerIcons';
import Link from 'next/link';
import React from 'react';

const CareerDetailsSidebar = () => {
    // Career details data
    const careerDetails = {
        salary: {
            label: "Avg. Salary",
            value: "$50k - 60k (Yearly)"
        },
        items: [
            {
                id: 1,
                icon: <ExperienceIcon />,
                label: "Experience",
                value: "4+ Years Experience"
            },
            {
                id: 2,
                icon: <TimingIcon />,
                label: "Working Hours",
                value: "08 AM to 05 PM"
            },
            {
                id: 3,
                icon: <CategoryIcon />,
                label: "Job Category",
                value: "Product Designer"
            },
            {
                id: 4,
                icon: <CalenderIcon />,
                label: "Working Days",
                value: "Weekly 5 days (Sun to Thur)"
            },
            {
                id: 5,
                icon: <TimingIcon />,
                label: "Deadline",
                value: "03 Feb 2025"
            }
        ],
        applyLink: "/job-application-form"
    };

    return (
        <div className="tp-career-details-sidebar">
            <div className="tp-career-details-sidebar-box">
                {/* Salary Section */}
                <div className="tp-career-details-sidebar-heading">
                    <span>{careerDetails.salary.label}</span>
                    <h4 className="tp-career-details-sidebar-title">{careerDetails.salary.value}</h4>
                </div>

                {/* Dynamic Career Items */}
                {careerDetails.items.map((item) => (
                    <div className="tp-career-details-sidebar-item d-flex" key={item.id}>
                        <div className="tp-career-details-sidebar-item-icon">
                            <span>{item.icon}</span>
                        </div>
                        <div className="tp-career-details-sidebar-item-content">
                            <span>{item.label}</span>
                            <h5>{item.value}</h5>
                        </div>
                    </div>
                ))}

                {/* Apply Button */}
                <div className="tp-career-details-sidebar-btn">
                    <Link href={careerDetails.applyLink}>Apply for the Job</Link>
                </div>
            </div>
        </div>
    );
};

export default CareerDetailsSidebar;