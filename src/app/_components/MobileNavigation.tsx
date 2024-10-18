"use client";
import React from "react";
import { mobileNavigation } from "@/contans/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MobileNavItem {
  label: string;
  link: string;
  icon: JSX.Element;
}

const MobileNavigation: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden h-14 bg-neutral-600 bg-opacity-40 fixed bottom-0 w-full">
      <div className="flex items-center justify-between h-full w-full text-neutral-400">
        {mobileNavigation.map((nav: MobileNavItem) => (
          <div
            key={nav.label}
            className={`px-3 flex h-full w-full items-center flex-col justify-center ${
              pathname === nav.link ? "text-blue-100" : "text-neutral-400"
            }`}
          >
            <Link href={nav.link} aria-label={nav.label}>
              <div className="text-2xl">{nav.icon}</div>
              <p className="text-lg">{nav.label}</p>
            </Link>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default MobileNavigation;
