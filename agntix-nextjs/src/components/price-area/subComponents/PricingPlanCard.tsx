import { PricePlanDT } from '@/types/custom-d-t';
import { CheckIcon, PopularIcon } from '@/svg';
import { StarIconSix } from '@/svg/StarIcons';
import Link from 'next/link';


const PricingPlanCard = ({ plan }: { plan: PricePlanDT }) => {
  return (
    <div className="col-xl-4 col-lg-6 col-md-6" key={plan.id}>
      <div className={`ai-price-wrap ${plan.isPopular ? 'active' : ''} mb-60`}>
        {plan.isPopular && (
          <div className="ai-price-badge text-center">
            <span><PopularIcon /></span>
            <span>Popular Plan</span>
          </div>
        )}
        <div className="ai-price-item">
          <div className="ai-price-head">
            <span>{plan.name}</span>
            <h4>{plan.price} <i>/ month</i></h4>
          </div>
          <div className="ai-price-btn tp-price-light-anim">
            <div className="animated-border-box w-100">
              <Link
                className={`tp-btn-${plan.buttonVariant} sm w-100 text-center`}
                href="/contact"
              >
                <span><StarIconSix /></span>
                Select Plan
              </Link>
            </div>
          </div>
          <div className="ai-price-list">
            {plan.features.map((feature, index) => (
              <div className="ai-price-list-item d-flex align-items-start" key={index}>
                <i><CheckIcon /></i>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPlanCard;