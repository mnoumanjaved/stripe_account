import Image, { StaticImageData } from "next/image";

interface FeatureItemDT {
    image: StaticImageData;
    animationClass?: string
}

const CryptoFeatureItem: React.FC<FeatureItemDT> = ({ image, animationClass = '' }) => {
    return (
        <div className="cr-feature-2-item">
            <span className="bullet-top-left"></span>
            <span className="bullet-top-right"></span>
            <span className="bullet-bottom-left"></span>
            <span className="bullet-bottom-right"></span>
            <div className={`cr-feature-2-item-icon ${animationClass}`}>
                <Image style={{width:"100%", height:"auto"}} src={image} alt="feature-icon" />
            </div>
        </div>
    );
};
export default CryptoFeatureItem;