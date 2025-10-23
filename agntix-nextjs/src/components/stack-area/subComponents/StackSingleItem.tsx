import stackData from '@/data/stackData';
import StackImages from './StackImages';
import Link from 'next/link';
import React from 'react';

interface StackItemProps {
    item: typeof stackData[0];
}
const StackSingleItem = ({ item }: StackItemProps) => {

    return (
        <div key={item.id} className={`app-stack-item stack-item app-stack-item-0${item.id} stack-panel-pin pt-200 pb-200`} style={{ backgroundColor: item.bgColor }}>
            <div className="app-stack-warpper">
                <div className="container container-1230">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="app-stack-heading">
                                <span className="app-stack-subtitle">{item.subtitle}</span>
                                <h4 className="app-stack-number">{item.number}</h4>
                                <h3 className="app-stack-title">{item.title}</h3>
                                <div className="app-stack-content">
                                    <p>{item.description}</p>
                                    <div className="app-stack-btn">
                                        <Link href={item.link}>{item.linkText}</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <StackImages images={item.images} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StackSingleItem;