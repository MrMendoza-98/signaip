import React from "react";
import Breadcrumbs from "./Breadcrumbs";

interface HeaderProps {
  readonly title: string;
  readonly breadcrumbs: string[];
}

export default function Header({ title, breadcrumbs }: HeaderProps) {
  return (
    <header className="flex flex-col gap-2 py-6 px-8 border-b bg-white sticky top-0 z-10">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <div>
        <Breadcrumbs items={breadcrumbs} />
      </div>
    </header>
  );
}
