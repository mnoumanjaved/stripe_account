// Define menu data
interface MenuItem {
    title: string;
    href: string;
    subItems?: MenuItem[];
    static?:boolean
};

const menuItemsTwo: MenuItem[] = [
    {
        title: "Home",
        href: "#",
        static:true,
        subItems: [
            { title: "Modern Agency", href: "/" },
            { title: "Digital Marketing", href: "/digital-marketing" },
            { title: "Design Agency", href: "/design-agency" },
            { title: "Unique AI Images", href: "/unique-ai-image" },
            { title: "Corporate Agency", href: "/corporate-agency" },
            { title: "Mobile Application", href: "/mobile-application" },
            { title: "IT Solutions", href: "/it-solution" },
            { title: "Cryptocurrency", href: "/cryptocurrency" },
        ],
    },
    {
        title: "Pages",
        href: "#",
        static:true,
        subItems: [
            { title: "About Me", href: "/about-me-light" },
            { title: "About Us", href: "/about-us-light" },
            { title: "Services", href: "/service-1-light" },
            { title: "Service Details", href: "/service-details-2-light" },
            { title: "Carrer", href: "/career-light" },
            { title: "Carrer Details", href: "/career-details-light" },
            { title: "Team", href: "/team-light" },
            { title: "Team Details", href: "/team-details-light" },
            { title: "Pricing", href: "/pricing-light" },
            { title: "Faq's", href: "/faq-light" },
        ],
    },
    {
        title: "Projects",
        href: "#",
        static:true,
        subItems: [
            { title: "Webgl Showcase", href: "/portfolio-webgl-showcase" },
            { title: "Coverflow Slider", href: "/portfolio-coverflow-slider-light" },
            { title: "Creative Thumb Slider", href: "/portfolio-creative-thumb-slider" },
            { title: "Creative Skew Slider", href: "/portfolio-creative-skew-slider" },
            { title: "Creative Text Slider", href: "/portfolio-creative-text-slider" },
            { title: "Parallax Slider", href: "/portfolio-parallax-slider" },
            { title: "Paspective Showcase", href: "/portfolio-perspective-slider-light" },
        ],
    },
    {
        title: "Blog",
        href: "#",
        static:false,
        subItems: [
            { title: "Blog Grid", href: "/blog-grid-light" },
            { title: "Blog Classic", href: "/blog-standard-light" },
            { title: "Blog Listing", href: "/blog-list-light" },
            { title: "Masonry", href: "/blog-masonry-light" },
            { title: "Blog Single Post", href: "/blog-details-light" },
        ],
    },
    {
        title: "Shop",
        href: "#",
        static:false,
        subItems: [
            { title: "Shop Modern", href: "/shop-modern-light" },
            { title: "Shop Details", href: "/shop-details" },
            { title: "My Account", href: "/my-account" },
            { title: "Cart", href: "/cart" },
            { title: "Checkout", href: "/checkout" },
            { title: "Wishlist", href: "/wishlist" },
            { title: "LogIn", href: "/login" },
        ],
    },
    {
        title: "Contact",
        href: "#",
        static:false,
        subItems: [
            { title: "Contact Me", href: "/contact-me-light" },
            { title: "Contact Us", href: "/contact-us-light" },
            { title: "Get In Touch", href: "/contact" },
        ],
    },
];

export default menuItemsTwo;