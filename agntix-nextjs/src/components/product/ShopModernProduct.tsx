import ShopModernCategoryCard from './subComponents/ShopModernCategoryCard';
import { productCategoryData } from '@/data/productCategory';

const ShopModernProduct = () => {
  const mainCategory = productCategoryData.find(cat => cat.size === 'lg');
  const subCategories = productCategoryData.filter(cat => cat.size === 'sm');

  return (
    <div className="tp-shop-category-2-area">
      <div className="container-fluid">
        <div className="row gx-15">
          {/* Main Category (Sofas) */}
          {mainCategory && (
            <div className="col-xl-6">
              <ShopModernCategoryCard item={mainCategory} />
            </div>
          )}

          {/* Sub Categories */}
          <div className="col-xl-6">
            <div className="row gx-15">
              {subCategories.map((category) => (
                <div key={category.id} className="col-md-6">
                  <ShopModernCategoryCard item={category} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ShopModernProduct;