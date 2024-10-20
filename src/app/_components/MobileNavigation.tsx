"use client";
import React from "react";
import Link from "next/link";
import { mobileNavigation } from "@/contans/navigation";
import { usePathname } from "next/navigation";
import { MobileNavItem } from "@/utils/interface";

const MobileNavigation: React.FC = () => {
  const pathname = usePathname();

  const isAuthPage = pathname === "/sign-up" || pathname === "/sign-in";

  if (isAuthPage) return null;

  return (
    <nav className="lg:hidden h-14 bg-black bg-opacity-70 backdrop-blur-2xl fixed bottom-0 w-full z-40">
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
