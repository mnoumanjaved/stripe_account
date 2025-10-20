import React from 'react';

interface FAQItem {
    id: string;
    question: string;
    answer: string;
    isOpen?: boolean;
}

const ServiceThreeFaq = () => {
    const faqs: FAQItem[] = [
        {
            id: 'collapseOne1',
            question: 'How long does it take to get started?',
            answer: 'It all starts with grabbing a cup of coffee, chilling with mates, and some quality time at the PlayStation (just kidding!). We always start a project with analysis, learning the requirements, and making estimates that will be shared in the price proposal. Then it\'s off to signing off, kicking off.',
            isOpen: true
        },
        {
            id: 'collapseTwo2',
            question: 'What is your typical working process?',
            answer: 'It all starts with grabbing a cup of coffee, chilling with mates, and some quality time at the PlayStation (just kidding!). We always start a project with analysis, learning the requirements, and making estimates that will be shared in the price proposal. Then it\'s off to signing off, kicking off.'
        },
        {
            id: 'collapseThree3',
            question: 'How do you usually start new collaborations?',
            answer: 'It all starts with grabbing a cup of coffee, chilling with mates, and some quality time at the PlayStation (just kidding!). We always start a project with analysis, learning the requirements, and making estimates that will be shared in the price proposal. Then it\'s off to signing off, kicking off.'
        },
        {
            id: 'collapseFour4',
            question: 'What\'s the average project duration?',
            answer: 'It all starts with grabbing a cup of coffee, chilling with mates, and some quality time at the PlayStation (just kidding!). We always start a project with analysis, learning the requirements, and making estimates that will be shared in the price proposal. Then it\'s off to signing off, kicking off.'
        },
        {
            id: 'collapseFive5',
            question: 'Can we start the design without wireframes?',
            answer: 'It all starts with grabbing a cup of coffee, chilling with mates, and some quality time at the PlayStation (just kidding!). We always start a project with analysis, learning the requirements, and making estimates that will be shared in the price proposal. Then it\'s off to signing off, kicking off.'
        }
    ];

    const FAQItem = ({ item }: { item: FAQItem }) => (
        <div className="accordion-items">
            <h2 className="accordion-header">
                <button
                    className={`accordion-buttons ${!item.isOpen ? 'collapsed' : ''}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#${item.id}`}
                    aria-expanded={item.isOpen ? 'true' : 'false'}
                    aria-controls={item.id}
                >
                    {item.question}
                    <span className="accordion-icon"></span>
                </button>
            </h2>
            <div
                id={item.id}
                className={`accordion-collapse collapse ${item.isOpen ? 'show' : ''}`}
                data-bs-parent="#accordionExample1"
            >
                <div className="accordion-body">
                    <p>{item.answer}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="app-faq-area service-faq-style p-relative pb-140">
            <div className="container container-1230">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="app-faq-heading p-relative mb-80 text-center">
                            <h3 className="tp-section-title-mango fs-100">Frequently asked questions</h3>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="app-faq-wrap">
                            <div className="ai-faq-accordion-wrap">
                                <div className="accordion" id="accordionExample1">
                                    {faqs.map((faq) => (
                                        <FAQItem key={faq.id} item={faq} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceThreeFaq;