import award1 from '../../../public/assets/img/home-05/award/award.jpg';
import award2 from '../../../public/assets/img/home-05/award/award-2.jpg';
import award3 from '../../../public/assets/img/home-05/award/award-3.jpg';
import award4 from '../../../public/assets/img/home-05/award/award-4.jpg';
import award5 from '../../../public/assets/img/home-05/award/award-5.jpg';
import award6 from '../../../public/assets/img/home-05/award/award-6.jpg';
import { useImageHoverReveal } from '@/hooks/useRevealOnHover';
import React from 'react';

const awardsData = [
  {
    id: 1,
    title: "A' Design Awards & competition",
    award: "Silver Medal",
    image: award1
  },
  {
    id: 2,
    title: "AWWWARDS",
    award: "2X - Honorable",
    image: award2
  },
  {
    id: 3,
    title: "CSS Design Awards",
    award: "2X - Website of the day",
    image: award3
  },
  {
    id: 4,
    title: "2X - Website of the day",
    award: "2X - Website of the day",
    image: award4
  },
  {
    id: 5,
    title: "CSS Reels",
    award: "Featured of the day",
    image: award5
  },
  {
    id: 6,
    title: "Web Gurus",
    award: "2X - Guru of the day",
    image: award6
  }
];

const DesignAgencyAward = () => {
 // Use the custom hook
  useImageHoverReveal();
  
  return (
    <div className="design-award-area title-box pb-140">
      <div className="container container-1230">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="design-award-title-box text-center mb-130">
              <h4 className="tp-section-title-dirtyline">
                <span className="tp-text-right-scroll tp_text_invert_2">honors</span><br />
                <span className="tp_text_invert_2">& awards</span>
              </h4>
              <p>
                {`We're India's`} top award-winning digital
                agency, carving our own path in the digital
                jungle, and the journey persists.
              </p>
            </div>
          </div>
        </div>
        <div className="design-award-wrap">
          <div className="row row-cols-1">
            {awardsData.map((award) => (
              <div className="col" key={award.id}>
                <div className="design-award-item hover-reveal-item active p-relative">
                  <div className="design-award-content design-award-content-xs d-flex align-items-center justify-content-between">
                    <h4>{award.title}</h4>
                    <span>{award.award}</span>
                  </div>
                  <div 
                    className="design-award-reveal-img" 
                    style={{ 
                      backgroundImage: `url(${award.image.src})`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignAgencyAward;