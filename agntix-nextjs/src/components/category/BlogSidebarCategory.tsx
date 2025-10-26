"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

interface Category {
  name: string;
  count: number;
}

const BlogSidebarCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        // Fetch all published blogs to extract categories
        const response = await fetch('/api/blogs?limit=100&status=published');
        const data = await response.json();

        // Group by primary_keyword (category)
        const categoryMap: { [key: string]: number } = {};

        data.posts.forEach((post: any) => {
          const category = post.primary_keyword || 'Uncategorized';
          categoryMap[category] = (categoryMap[category] || 0) + 1;
        });

        // Convert to array and sort by count (descending)
        const categoryArray = Object.entries(categoryMap)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 6); // Show top 6 categories

        setCategories(categoryArray);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="sidebar-widget-category">
        <div className="text-center py-3">
          <p style={{ color: '#999', fontSize: '14px' }}>Loading categories...</p>
        </div>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="sidebar-widget-category">
        <div className="text-center py-3">
          <p style={{ color: '#999', fontSize: '14px' }}>No categories available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="sidebar-widget-category">
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <Link
              href="/blog-grid-light"
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
