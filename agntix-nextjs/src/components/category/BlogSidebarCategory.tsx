import Link from "next/link";
import React from "react";

const categories = [
  { name: "Articles", count: 8, href: "/blog-grid" },
  { name: "Business", count: 4, href: "/blog-grid" },
  { name: "Family & Divorce", count: 12, href: "/blog-grid" },
  { name: "Web Design", count: 16, href: "/blog-grid" },
];

const BlogSidebarCategory = () => {
  return (
    <div className="sidebar-widget-category">
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <Link
              href={category.href}
              className="d-flex align-items-center justify-content-between"
            >
              {category.name}
              <span>{category.count.toString().padStart(2, "0")}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogSidebarCategory;
