import userImg from '../../../../public/assets/img/product/product-details-main/desc/user-2.jpg';
import { DownlaodIcon, GiftBoxIcon, OrdersIcon, WishlistIcon } from '@/svg/ProfileIcons';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const profileStats = [
  { id: 1, title: 'Downloads', count: 2, icon: <DownlaodIcon />, className: 'profile-download' },
  { id: 2, title: 'Orders', count: 6, icon: <OrdersIcon />, className: 'profile-order' },
  { id: 3, title: 'Wishlist', count: 8, icon: <WishlistIcon />, className: 'profile-wishlist' },
  { id: 4, title: 'Gift Box', count: 7, icon: <GiftBoxIcon />, className: 'profile-giftbox' },
];

const ProfileMain = () => {
  return (
    <div className="profile__main">
      {/* Top Section */}
      <div className="profile__main-top pb-80">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="profile__main-inner d-flex flex-wrap align-items-center">
              {/* User Image */}
              <div className="profile__main-thumb">
                <Image src={userImg} alt="user image" />
                <div className="profile__main-thumb-edit">
                  <input id="profile-thumb-input" className="profile-img-popup" type="file" />
                  <label htmlFor="profile-thumb-input">
                    <i className="fa-light fa-camera"></i>
                  </label>
                </div>
              </div>
              {/* User Info */}
              <div className="profile__main-content">
                <h4 className="profile__main-title">Welcome Mr. Admin!</h4>
                <p>
                  You have <span>08</span> notifications
                </p>
              </div>
            </div>
          </div>

          {/* Logout */}
          <div className="col-md-6">
            <div className="profile__main-logout text-sm-end">
              <Link href="/login" className="tp-logout-btn">
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="profile__main-info">
        <div className="row gx-3">
          {profileStats.map(({ id, title, count, icon, className }) => (
            <div className="col-md-3 col-sm-6" key={id}>
              <div className="profile__main-info-item">
                <div className="profile__main-info-icon">
                  <span>
                    <span className={`profile-icon-count ${className}`}>{count}</span>
                    {icon}
                  </span>
                </div>
                <h4 className="profile__main-info-title">{title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileMain;
