import thumb1 from "../../../public/assets/img/contact/contact-us/contact-us-thumb-1.jpg";
import thumb2 from "../../../public/assets/img/contact/contact-location-2.jpg";
import thumb3 from "../../../public/assets/img/contact/contact-location-3.jpg";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ContactUsArea = () => {
  const contactData = [
    {
      title: "San Francisco",
      img: thumb1,
      email: "sydney@contact.com",
      phone: "(+91) 76001726",
      mapLink: "https://www.google.com/maps",
      btnClass: "tp-btn-yellow-green w-100",
      speed: "1.2",
    },
    {
      title: "Germany",
      img: thumb2,
      email: "sydney@contact.com",
      phone: "(+91) 76001726",
      mapLink: "https://www.google.com/maps",
      btnClass: "tp-btn-yellow-green active w-100",
      speed: ".9",
      extraClass: "mt-60",
    },
    {
      title: "New Zealand",
      img: thumb3,
      email: "sydney@contact.com",
      phone: "(+91) 76001726",
      mapLink: "https://www.google.com/maps",
      btnClass: "tp-btn-yellow-green w-100",
      speed: "1.2",
    },
  ];

  return (
    <div className="tp-contact-us-info-area pb-120">
      <div className="container container-1230">
        <div className="row">
          {contactData.map((item, index) => (
            <div key={index} className="col-xl-4 col-lg-4 col-md-6 mb-30">
              <div
                className={`tp-contact-us-content text-center ${item.extraClass || ""
                  }`}
                data-speed={item.speed}
              >
                <div className="tp-contact-us-thumb d-flex justify-content-center">
                  <Image style={{ width: "100%", height: "auto" }} src={item.img} alt={item.title} />
                </div>
                <div className="tp-contact-us-bottom">
                  <div className="tp-contact-us-info-details">
                    <h4 className="tp-contact-us-info-title">{item.title}</h4>
                    <Link href={`mailto:${item.email}`}>{item.email}</Link>
                    <Link href={`tel:${item.phone}`}>{item.phone}</Link>
                  </div>
                  <div className="tp-contact-us-btn">
                    <Link
                      className={item.btnClass}
                      target="_blank"
                      href={item.mapLink}
                    >
                      <span>
                        <span className="text-1">View Location</span>
                        <span className="text-2">View Location</span>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactUsArea;
