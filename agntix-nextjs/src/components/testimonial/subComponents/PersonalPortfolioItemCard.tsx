import { TestimonialDT } from '@/types/testimonial-d-t';
import { StarIconFour } from '@/svg';
import React from 'react';

const PersonalPortfolioItemCard = ({ name, position, rating, quote }: TestimonialDT) => {
    return (
        <div className="design-testimonial-item">
            <div className="design-testimonial-author">
                <h4>{name}</h4>
                <span>{position}</span>
            </div>
            <div className="design-testimonial-review d-flex align-items-end">
                <h4>{rating}.0</h4>
                <div className="design-testimonial-review-icon">
                    {Array(rating).fill(null).map((_, index) => (
                        <span key={index}>
                            <StarIconFour width="24" height="24" />
                        </span>
                    ))}
                </div>
            </div>
            <div className="design-testimonial-text">
                <p>{quote}</p>
            </div>
        </div>
    );
};

export default PersonalPortfolioItemCard;