import author1 from "../../public/assets/img/blog/blog-standard/blog-av-2.jpg";
import blog1 from "../../public/assets/img/blog/blog-standard/blog-s-1.jpg";
import author2 from "../../public/assets/img/blog/blog-masonry/blog-masonry-user-2.jpg";
import blog2 from "../../public/assets/img/blog/blog-standard/blog-s-2.jpg";
import author3 from "../../public/assets/img/blog/blog-masonry/blog-masonry-user-3.jpg";
import author4 from "../../public/assets/img/blog/blog-masonry/blog-masonry-user-4.jpg";
import blog3 from "../../public/assets/img/blog/blog-standard/blog-s-3.jpg"

export const blogPosts = [
    {
        id: 1,
        authorImg: author1,
        authorName: "Phil Martinez",
        authorRole: "Co-Founder of Agntix",
        date: "April 15, 2025",
        thumb: blog1,
        tag: "Inspiration",
        title: "Lessons learned from professional challenges",
        excerpt:
            "A journey of self-discovery and exploration that allows us to align our values, interests, and skills with our professional pursuitsplatea dictumst[…] ",
        link: "/blog-details-light",
    },
    {
        id: 2,
        authorImg: author2,
        authorName: "Devon Lane",
        authorRole: "Co-Founder of Agntix",
        date: "April 15, 2025",
        thumb: blog2,
        tag: "Inspiration",
        title: "The role of social media in shaping society",
        excerpt:
            "A journey of self-discovery and exploration that allows us to align our values, interests, and skills with our professional pursuitsplatea dictumst[…] ",
        link: "/blog-details-light",
        videoUrl: "VCPGMjCW0is",
    },
    {
        id: 3,
        authorImg: author3,
        authorName: "Phil Martinez",
        authorRole: "Floyd Miles",
        date: "April 15, 2025",
        tag: "Inspiration",
        title: "Quote post",
        quote:
            "Agntix created something better then I ecer could have imagined Dipiscing elit, sed do eiusmod",
    },
    {
        id: 4,
        authorImg: author4,
        authorName: "Jacob Jones",
        authorRole: "Co-Founder of Agntix",
        date: "April 15, 2025",
        tag: "Inspiration",
        title: "Fueling ambition and achieving your goals",
        excerpt:
            "A journey of self-discovery and exploration that allows us to align our values, interests, and skills with our professional pursuitsplatea dictumst[…] ",
        link: "/blog-details-light",
        slider: [blog3, blog2, blog1],
    },
];
