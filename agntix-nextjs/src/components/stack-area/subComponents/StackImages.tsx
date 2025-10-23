import AtroposWrapper from '@/components/shared/AtroposWrapper';
import stackData from '@/data/stackData';
import Image from 'next/image';
import React from 'react';

interface StackImagesProps {
    images: typeof stackData[0]['images'];
}

const StackImages = ({ images }: StackImagesProps) => {
    return (
        <div className="app-stack-thumb-box p-relative text-end">
            <AtroposWrapper className="atropos-active">
                <div className='atropos'>
                    <div className="atropos-scale">
                        <div className="atropos-rotate">
                            <div className="atropos-inner">
                                {images.map((img, idx) => (
                                    <Image
                                        key={idx}
                                        data-atropos-offset={img.offset}
                                        className={img.className}
                                        src={img.src}
                                        alt={img.alt}
                                        priority={idx === 0}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </AtroposWrapper>
        </div>
    );
};

export default StackImages;