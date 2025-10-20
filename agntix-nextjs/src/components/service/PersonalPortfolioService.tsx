import shape from '../../../public/assets/img/home-14/about/about-shape-2.png';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const services = [
  { title: '3D', link: '/service-1-light' },
  { title: 'Motion', link: '/service-1-light' },
  { title: 'Animation', link: '/service-1-light', current: true },
  { title: 'Product Renders', link: '/service-1-light' },
  { title: '3d design', link: '/service-1-light' },
];

const PersonalPortfolioService = () => {
  return (
    <div className="pp-service-area pp-service-ptb p-relative pb-160">
      <div className="pp-service-shape">
        <Image data-speed="1.1" src={shape} alt="shape" />
      </div>

      <div className="container container-1430">
        <div className="row">
          <div className="col-lg-12">
            <div className="pp-service-heading z-index-2">
              <span>What I Do</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid gx-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="pp-service-wrapper z-index-1">
              {services.map(({ title, link, current }) => (
                <Link
                  key={title}
                  href={link}
                  className={`pp-service-item z-index-1${current ? ' current' : ''}`}
                >
                  <span className="pp-service-item-title">{title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalPortfolioService;
