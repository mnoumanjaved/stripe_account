import { StarIconFour } from '@/svg';
import React from 'react';

interface RatingBox {
    score: string;
    reviewCount: string;
    description: string;
}

const StartupRatingBox = ({ score, reviewCount, description }: RatingBox) => (
    <div className="st-testimonial-box text-center mb-30">
        <div className="st-testimonial-box-top">
            <h4 className="st-testimonial-box-rating">{score}</h4>
            <span className="st-testimonial-box-star">
                {Array(5).fill(null).map((_, index) => (
                    <StarIconFour key={index} width="24" height="24" />
                ))}
            </span>
            <i>{reviewCount}</i>
        </div>
        <div className="st-testimonial-box-content">
            <p dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, '<br />') }} />
        </div>
    </div>
);
export default StartupRatingBox;