import user1 from "../../../../public/assets/img/product/product-details-main/desc/user-1.jpg";
import user2 from "../../../../public/assets/img/product/product-details-main/desc/user-2.jpg";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// reusable star rating
const StarRating = ({ count = 5 }: { count?: number }) => (
    <>
        {Array.from({ length: count }, (_, i) => (
            <span key={i}>
                <i className="fa-solid fa-star"></i>
            </span>
        ))}
    </>
);

// rating bar data
const ratingsData = [
    { label: "5 Star", percent: 82 },
    { label: "4 Star", percent: 30 },
    { label: "3 Star", percent: 15 },
    { label: "2 Star", percent: 6 },
    { label: "1 Star", percent: 10 },
];

// ⭐ review list data
const reviewList = [
    {
        id: 1,
        name: "Eleanor Fant",
        date: "06 March, 2025",
        avatar: user1,
        comment:
            "Designed very similarly to the nearly double priced Galaxy tab S6, with the only removal being.",
    },
    {
        id: 2,
        name: "Md Pranta",
        date: "06 March, 2025",
        avatar: user2,
        comment:
            "This review is for the Samsung Tab S6 Lite, 64gb wifi in blue. purchased this product performed.",
    },
];

const ProductDetailsReview = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <div className="tp-product-details-review-wrapper pt-60">
            <div className="row">
                {/* left side: stats & reviews */}
                <div className="col-lg-6">
                    <div className="tp-product-details-review-statics">
                        {/* --- summary --- */}
                        <div className="tp-product-details-review-number d-inline-block mb-50">
                            <h3 className="tp-product-details-review-number-title">
                                Customer reviews
                            </h3>
                            <div className="tp-product-details-review-summery d-flex align-items-center">
                                <div className="tp-product-details-review-summery-value">
                                    <span>4.5</span>
                                </div>
                                <div className="tp-product-details-review-summery-rating d-flex align-items-center">
                                    <StarRating />
                                    <p>(36 Reviews)</p>
                                </div>
                            </div>

                            {/* --- ratings list --- */}
                            <div className="tp-product-details-review-rating-list">
                                {ratingsData.map((rating, i) => (
                                    <div
                                        key={i}
                                        className="tp-product-details-review-rating-item d-flex align-items-center"
                                    >
                                        <span>{rating.label}</span>
                                        <div className="tp-product-details-review-rating-bar">
                                            <span
                                                className="tp-product-details-review-rating-bar-inner"
                                                data-width={`${rating.percent}%`}
                                            ></span>
                                        </div>
                                        <div className="tp-product-details-review-rating-percent">
                                            <span>{rating.percent}%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* --- reviews list --- */}
                        <div className="tp-product-details-review-list pr-110">
                            <h3 className="tp-product-details-review-title">
                                Rating & Review
                            </h3>
                            {reviewList.map((review) => (
                                <div
                                    key={review.id}
                                    className="tp-product-details-review-avater d-flex align-items-start"
                                >
                                    <div className="tp-product-details-review-avater-thumb">
                                        <Link href="#">
                                            <Image src={review.avatar} alt={review.name} />
                                        </Link>
                                    </div>
                                    <div className="tp-product-details-review-avater-content">
                                        <div className="tp-product-details-review-avater-rating d-flex align-items-center">
                                            <StarRating />
                                        </div>
                                        <h3 className="tp-product-details-review-avater-title">
                                            {review.name}
                                        </h3>
                                        <span className="tp-product-details-review-avater-meta">
                                            {review.date}
                                        </span>
                                        <div className="tp-product-details-review-avater-comment">
                                            <p>{review.comment}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* right side: review form */}
                <div className="col-lg-6">
                    <div className="tp-product-details-review-form">
                        <h3 className="tp-product-details-review-form-title">
                            Review this product
                        </h3>
                        <p>
                            Your email address will not be published. Required fields are
                            marked *
                        </p>
                        <form action="#" onSubmit={handleSubmit}>
                            <div className="tp-product-details-review-form-rating d-flex align-items-center">
                                <p>Your Rating :</p>
                                <div className="tp-product-details-review-form-rating-icon d-flex align-items-center">
                                    <StarRating />
                                </div>
                            </div>

                            <div className="tp-product-details-review-input-wrapper">
                                <div className="tp-product-details-review-input-box">
                                    <div className="tp-product-details-review-input-title">
                                        <label htmlFor="msg">Your Review</label>
                                    </div>
                                    <div className="tp-product-details-review-input">
                                        <textarea
                                            id="msg"
                                            name="msg"
                                            placeholder="Write your review here..."
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="tp-product-details-review-input-box">
                                    <div className="tp-product-details-review-input-title">
                                        <label htmlFor="name">Your Name</label>
                                    </div>
                                    <div className="tp-product-details-review-input">
                                        <input
                                            name="name"
                                            id="name"
                                            type="text"
                                            placeholder="Md Pranta"
                                        />
                                    </div>
                                </div>
                                <div className="tp-product-details-review-input-box">
                                    <div className="tp-product-details-review-input-title">
                                        <label htmlFor="email">Your Email</label>
                                    </div>
                                    <div className="tp-product-details-review-input">
                                        <input
                                            name="email"
                                            id="email"
                                            type="email"
                                            placeholder="agntix@mail.com"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="tp-product-details-review-suggetions mb-20">
                                <div className="tp-product-details-review-remeber">
                                    <input id="remeber" type="checkbox" />
                                    <label htmlFor="remeber">
                                        Save my name, email, and website in this browser for the
                                        next time I comment.
                                    </label>
                                </div>
                            </div>
                            <div className="tp-product-details-review-btn-wrapper">
                                <button className="tp-product-details-review-btn">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsReview;
