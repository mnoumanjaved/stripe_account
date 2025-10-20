import React from 'react';

const PortfolioDetailsStep = () => {
  // data array
  const stepData = [
    {
      id: 1,
      title: 'Development',
      description:
        'A wonderful serenity has taken possession of my entire soul, like these sweet mornings which I enjoy with my whole heart.',
    },
    {
      id: 2,
      title: 'Concept Design',
      description:
        'A wonderful serenity has taken possession of my entire soul, like these sweet mornings which I enjoy with my whole heart.',
    },
    {
      id: 3,
      title: 'Implementation',
      description:
        'A wonderful serenity has taken possession of my entire soul, like these sweet mornings which I enjoy with my whole heart.',
    },
  ];

  return (
    <div className="tp-pd-2-step-ptb pb-70">
      <div className="container container-1230">
        <div className="row">
          <div className="col-lg-12">
            <div
              className="tp-pd-2-step-heading pb-60 tp_fade_anim"
              data-delay=".3"
            >
              <h3 className="tp-pd-2-step-title">
                Out of love for stylish &amp; functional <br />
                WP themes and for taking pride to <br />
                support you.
              </h3>
            </div>
          </div>
        </div>
        <div className="row">
          {stepData.map((step) => (
            <div key={step.id} className="col-lg-4 col-md-6">
              <div className="tp-pd-2-step-item mb-30">
                <h4 className="tp-pd-2-step-item-title">
                  {step.id.toString().padStart(2, '0')}. {step.title}
                </h4>
                <span>{step.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetailsStep;
