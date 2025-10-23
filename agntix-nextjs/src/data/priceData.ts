import { PricePlanDT } from "@/types/custom-d-t";

const pricePlans: PricePlanDT[] = [
    {
        id: 1,
        name: 'Basic',
        price: '$Free',
        isPopular: false,
        features: [
            '1 User',
            'Unlimited Projects',
            'Download prototypes',
            'Api Access',
            'Free Support'
        ],
        buttonVariant: 'black-border',
        tab: 'desktop'
    },
    {
        id: 2,
        name: 'Basic',
        price: '$Free',
        isPopular: true,
        features: [
            '1 User',
            'Unlimited Projects',
            'Download prototypes',
            'Api Access',
            'Free Support'
        ],
        buttonVariant: 'gradient',
        tab: 'desktop'
    },
    {
        id: 3,
        name: 'Basic',
        price: '$Free',
        isPopular: false,
        features: [
            '1 User',
            'Unlimited Projects',
            'Download prototypes',
            'Api Access',
            'Free Support'
        ],
        buttonVariant: 'black-border',
        tab: 'desktop'
    },
    {
        id: 4,
        name: 'Basic',
        price: '$Free',
        isPopular: false,
        features: [
            '1 User',
            'Unlimited Projects',
            'Download prototypes',
            'Api Access',
            'Free Support'
        ],
        buttonVariant: 'black-border',
        tab: 'mobile'
    },
    {
        id: 5,
        name: 'Basic',
        price: '$Free',
        isPopular: true,
        features: [
            '1 User',
            'Unlimited Projects',
            'Download prototypes',
            'Api Access',
            'Free Support'
        ],
        buttonVariant: 'gradient',
        tab: 'mobile'
    },
    {
        id: 6,
        name: 'Basic',
        price: '$Free',
        isPopular: false,
        features: [
            '1 User',
            'Unlimited Projects',
            'Download prototypes',
            'Api Access',
            'Free Support'
        ],
        buttonVariant: 'black-border',
        tab: 'mobile'
    },
    //mobile application home-10 data start
    {
        id: 7,
        name: 'Free',
        price: '$0',
        description: "Organize your daily task for free",
        isPopular: false,
        features: [
            'Unlimited cards',
            'Automated management',
            'SOX compliance',
            'Local video issuance',
            'Limited tools'
        ],
        buttonVariant: 'black-border',
        tab: 'desktop'
    },
    {
        id: 8,
        name: 'Basic',
        description: "Organize your daily task for free",
        price: '$48',
        isPopular: true,
        features: [
            'Unlimited cards',
            'Automated management',
            'SOX compliance',
            'Local video issuance',
            'Limited tools'
        ],
        buttonVariant: 'gradient',
        tab: 'desktop'
    },
    {
        id: 9,
        name: 'Basic',
        description: "Organize your daily task for free",
        price: '$140',
        isPopular: false,
        features: [
            'Unlimited cards',
            'Automated management',
            'SOX compliance',
            'Local video issuance',
            'Limited tools'
        ],
        buttonVariant: 'black-border',
        tab: 'desktop'
    },
    {
        id: 10,
        name: 'Basic',
        description: "Organize your daily task for free",
        price: '$0',
        isPopular: false,
        features: [
            'Unlimited cards',
            'Automated management',
            'SOX compliance',
            'Local video issuance',
            'Limited tools'
        ],
        buttonVariant: 'black-border',
        tab: 'mobile'
    },
    {
        id: 11,
        name: 'Basic',
        description: "Organize your daily task for free",
        price: '$78',
        isPopular: true,
        features: [
            'Unlimited cards',
            'Automated management',
            'SOX compliance',
            'Local video issuance',
            'Limited tools'
        ],
        buttonVariant: 'gradient',
        tab: 'mobile'
    },
    {
        id: 12,
        name: 'Basic',
        description: "Organize your daily task for free",
        price: '$99',
        isPopular: false,
        features: [
            'Unlimited cards',
            'Automated management',
            'SOX compliance',
            'Local video issuance',
            'Limited tools'
        ],
        buttonVariant: 'black-border',
        tab: 'mobile'
    },
    // service details pricing data
    {
        id: 13,
        name: 'Branding',
        price: '$250',
        features: [
            'Quality Control',
            'Budget Management',
            'Custom design concept',
            'Interior Design',
            'Custom design concept',
            '3D Rendering of proposed design'
        ]
    },
    {
        id: 14,
        name: 'UI design',
        price: '$450',
        features: [
            'Quality Control',
            'Budget Management',
            'Custom design concept',
            'Interior Design',
            'Custom design concept',
            '3D Rendering of proposed design'
        ]
    },
    {
        id: 15,
        name: 'Research',
        price: '$550',
        features: [
            'Quality Control',
            'Budget Management',
            'Custom design concept',
            'Interior Design',
            'Custom design concept',
            '3D Rendering of proposed design'
        ]
    },
];

export default pricePlans;