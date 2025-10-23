import ProductDetailsReview from './subComponents/ProductDetailsReview';
import ProductDetailsDesc from './subComponents/ProductDetailsDesc';
import AdditionalInfoMain from './subComponents/AdditionalInfoMain';
import React, { useEffect, useRef } from 'react';

const AdditionalInformation = () => {
  const markerRef = useRef<HTMLSpanElement | null>(null);
  const tabContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const marker = markerRef.current;
    const tabs = tabContainerRef.current?.querySelectorAll<HTMLButtonElement>('.nav-link');

    if (!marker || !tabs) return;

    const rtl = localStorage.getItem('tp_dir') === 'rtl';
    const markerPosition = rtl ? 'right' : 'left';

    const moveMarkerTo = (elem: HTMLElement) => {
      if (markerPosition === 'right') {
        marker.style.right = elem.offsetLeft + 'px';
      } else {
        marker.style.left = elem.offsetLeft + 'px';
      }
      marker.style.width = elem.offsetWidth + 'px';
    };

    // initially active tab
    const activeTab = tabContainerRef.current?.querySelector<HTMLElement>('.nav-link.active');
    if (activeTab) {
      moveMarkerTo(activeTab);
      marker.style.display = 'block';
    }

    // click event
    tabs.forEach(tab => {
      tab.addEventListener('click', () => moveMarkerTo(tab));
    });

    // cleanup
    return () => {
      tabs.forEach(tab => {
        tab.removeEventListener('click', () => moveMarkerTo(tab));
      });
    };
  }, []);

  return (
    <div className="tp-product-details-bottom pb-140">
      <div className="container container-1230">
        <div className="row">
          <div className="col-xl-12">
            <div className="tp-product-details-tab-nav tp-tab">
              <nav>
                <div
                  className="nav nav-tabs justify-content-center p-relative tp-product-tab"
                  id="navPresentationTab"
                  role="tablist"
                  ref={tabContainerRef}
                >
                  <button
                    className="nav-link"
                    id="nav-description-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-description"
                    type="button"
                    role="tab"
                    aria-controls="nav-description"
                    aria-selected="true"
                  >
                    Description
                  </button>
                  <button
                    className="nav-link active"
                    id="nav-addInfo-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-addInfo"
                    type="button"
                    role="tab"
                    aria-controls="nav-addInfo"
                    aria-selected="false"
                  >
                    Additional information
                  </button>
                  <button
                    className="nav-link"
                    id="nav-review-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-review"
                    type="button"
                    role="tab"
                    aria-controls="nav-review"
                    aria-selected="false"
                  >
                    Reviews (2)
                  </button>

                  <span
                    ref={markerRef}
                    id="productTabMarker"
                    className="tp-product-details-tab-line"
                  ></span>
                </div>
              </nav>
              <div className="tab-content" id="navPresentationTabContent">
                <div
                  className="tab-pane fade"
                  id="nav-description"
                  role="tabpanel"
                  aria-labelledby="nav-description-tab"
                  tabIndex={0}
                >
                  <ProductDetailsDesc />
                </div>
                <div
                  className="tab-pane fade show active"
                  id="nav-addInfo"
                  role="tabpanel"
                  aria-labelledby="nav-addInfo-tab"
                  tabIndex={0}
                >
                  <AdditionalInfoMain />
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-review"
                  role="tabpanel"
                  aria-labelledby="nav-review-tab"
                  tabIndex={0}
                >
                  <ProductDetailsReview />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInformation;
