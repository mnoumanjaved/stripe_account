import { BedsIcon, ChairsIcon, LightsIcon, SofasIcon, StandsIcon, TablesIcon } from '@/svg/CategoriesIcons';
import Link from 'next/link';
import React from 'react';

interface CategoryItem {
  id: number;
  name: string;
  Icon: React.FC;
  delay: string;
  href: string;
}

const categories: CategoryItem[] = [
  { id: 1, name: "Sofas", Icon: SofasIcon, delay: ".3", href: "/shop" },
  { id: 2, name: "Beds", Icon: BedsIcon, delay: ".5", href: "/shop" },
  { id: 3, name: "Tables", Icon: TablesIcon, delay: ".7", href: "/shop" },
  { id: 4, name: "Chairs", Icon: ChairsIcon, delay: ".8", href: "/shop" },
  { id: 5, name: "Lights", Icon: LightsIcon, delay: ".9", href: "/shop" },
  { id: 6, name: "Stands", Icon: StandsIcon, delay: "1", href: "/shop" },
];

const ShopCategory: React.FC = () => {
  return (
    <div className="tp-shop-category-area tp-shop-category-bdr pb-120 pt-120">
      <div className="container container-1030">
        <div className="row justify-content-center">
          <div className="col-xl-8">
            <div className="tp-shop-category-title-box mb-50 text-center">
              <span
                className="tp-shop-section-subtitle mb-10 tp_fade_anim"
                data-delay=".3"
              >
                [ Shop Smart, Shop Sorted ]
              </span>
              <h4
                className="tp-shop-section-title tp_fade_anim"
                data-delay=".5"
              >
                Discover by Category
              </h4>
            </div>
          </div>
        </div>

        <div className="row gx-7">
          {categories.map(({ id, name, Icon, delay, href }) => (
            <div
              key={id}
              className="col-xl-2 col-md-4 col-6 tp_fade_anim"
              data-delay={delay}
            >
              <Link href={href} className="tp-shop-category-item text-center">
                <i><Icon /></i>
                <span>{name}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopCategory;
