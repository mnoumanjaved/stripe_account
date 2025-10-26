
import BlogDeailsMain from "@/pages/blogs/blog-details/BlogDeailsMain";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Agntix - Blog Details",
};

// Disable static generation for this dynamic page
export const dynamic = 'force-dynamic';

const page = () => {
    return (
        <BlogDeailsMain />
    );
};

export default page;