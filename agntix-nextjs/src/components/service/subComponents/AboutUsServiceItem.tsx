
import { servicesDT } from "@/types/service-d-t";
import { ArrowSvg } from "@/svg";
import Link from "next/link";

const AboutUsServiceItem = ({ service, index }: { service: servicesDT, index: number; }) => (
    <div className="creative-service-item about-us-4 d-flex align-items-start justify-content-between tp_fade_anim">
        <div className="creative-service-content d-flex align-items-start">
                <span>({String(index + 1).padStart(2, '0')})</span>
            <div className="creative-service-title-info">
                <h4 className="creative-service-title">
                    <Link href="/service-details-light">{service.title}</Link>
                </h4>
                <div className="creative-service-category">
                    {service.categories?.map((category, index) => (
                        <span key={index}>{category}</span>
                    ))}
                </div>
            </div>
        </div>
        <div className="creative-service-link">
            <Link href="/service-details-light">
                <span>
                    <ArrowSvg width="14" height="14" viewBox="0 0 14 14" pathValue="M1 13L13 1M13 1H1M13 1V13" />
                </span>
            </Link>
        </div>
    </div>
);
export default AboutUsServiceItem;