import { FunFactImageProps, FunFactPanelProps } from "@/types/custom-d-t";
import Image from "next/image";
import React from "react";


const FunFactImage: React.FC<FunFactImageProps> = ({
    src, alt = 'funfact-image', delay, className = ''
}) => (
    <div className={`tp-funfact-img mb-20 ${delay ? 'tp_fade_anim' : ''} ${className}`}
        {...(delay && { 'data-delay': delay })}>
        <Image style={{ width: "100%", height: "auto" }} src={src} alt={alt} />
    </div>
);

const FunFactPanelItem: React.FC<FunFactPanelProps> = ({ panel }) => (
    <div className="container container-1300">
        <div className={`row ${panel.customCls}`}>
            <div className="col-lg-6 col-md-6">
                <div className="tp-funfact-img-wrap">
                    <div className="row gx-20">
                        {panel.images.map((image, index) => (
                            <div key={index} className="col-lg-3 col-sm-4 col-6">
                                <FunFactImage src={image.src} delay={image.delay} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="col-lg-6 col-md-6">
                <div className={`tp-funfact-content-wrap ${panel.spacingCls}`}>
                    <div className="tp-funfact-content" {...(panel.id !== 3 && { 'data-fade-from': 'right', 'data-delay': '1.3' })}>
                        <span className="tp-funfact-subtitle">{panel.subtitle}</span>
                        <h4 className="tp-funfact-title" dangerouslySetInnerHTML={{ __html: panel.title }} />
                    </div>
                </div>
            </div>
        </div>

        {
            panel.funfactNumber === "right" ?
                <div className="tp-funfact-img-wrap-2 p-relative">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="row">
                                {panel.secondaryImages && (
                                    <div className="col-lg-6">
                                        <div className="row gx-20">
                                            {panel.secondaryImages.map((image, index) => (
                                                <div key={index} className="col-lg-6 col-sm-4 col-6">
                                                    <FunFactImage src={image.src} delay={image.delay} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {panel.bigImage && (
                                    <div className="col-lg-6">
                                        <div className="tp-funfact-big-img mb-20 tp-text-bounce" data-delay={panel.bigImage.delay}>
                                            <Image style={{ width: "100%", height: "auto" }} src={panel.bigImage.src} alt="funfact-image" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="tp-funfact-content-wrap">
                                <div className="tp-funfact-number">
                                    <span>
                                        {panel.number.includes('#') ? (
                                            <>{panel.number}</>
                                        ) : (
                                            panel.number.split('').map((char, i) => (
                                                <span key={i} className="tp-text-bounce" data-delay={1 + (i * 0.3)}>
                                                    {char}
                                                </span>
                                            ))
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="tp-funfact-img-wrap p-relative">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="tp-funfact-content-wrap">
                                <div className="tp-funfact-number">
                                    <span><em>#</em>{panel.number}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        }
    </div>
);
export default FunFactPanelItem;