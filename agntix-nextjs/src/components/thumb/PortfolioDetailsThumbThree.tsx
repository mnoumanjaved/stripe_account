import React from "react";
import Image from "next/image";

// import images
import thumb1 from "../../../public/assets/img/portfolio/portfolio-details-2/portfolio-details-thumb-5.jpg";
import thumb2 from "../../../public/assets/img/portfolio/portfolio-details-2/portfolio-details-thumb-6.jpg";
import thumb3 from "../../../public/assets/img/portfolio/portfolio-details-2/portfolio-details-thumb-7.jpg";

const PortfolioDetailsThumbThree = () => {
    const thumbs = [
        { id: 1, src: thumb1, col: "col-lg-12" },
        { id: 2, src: thumb2, col: "col-lg-6" },
        { id: 3, src: thumb3, col: "col-lg-6" },
    ];

    return (
        <div className="tp-pd-2-thumb-ptb pb-120">
            <div className="container container-1230">
                <div className="row gx-20">
                    {thumbs.map((thumb) => (
                        <div className={thumb.col} key={thumb.id}>
                            <div className="tp-pd-2-thumb-item mb-20">
                                <Image
                                    style={{ width: "100%", height: "auto" }}
                                    src={thumb.src}
                                    alt={`portfolio-thumb-${thumb.id}`}
                                    data-speed=".8"
                                    className="w-100"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PortfolioDetailsThumbThree;
