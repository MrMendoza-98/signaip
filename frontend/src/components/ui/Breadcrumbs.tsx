import React from "react";

interface BreadcrumbsProps {
  items: string[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center text-sm text-gray-500 gap-2">
      {items.map((item, idx) => (
        <span key={item} className="flex items-center">
          {item}
          {idx < items.length - 1 && <span className="mx-2">/</span>}
        </span>
      ))}
    </nav>
  );
}
