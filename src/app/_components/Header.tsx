"use client";
import React, { useState, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IoSearchOutline } from "react-icons/io5";

import { navigation } from "@/contans/navigation";

interface NavigationItem {
  label: string;
  link: string;
}

const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [searchInput, setSearchInput] = useState<string>("");

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedInput = searchInput.trim();
    if (trimmedInput) {
      router.push(`search?q=${trimmedInput}`);
    }
  };

  return (
    <header className="fixed top-0 w-full h-16 bg-neutral-600 bg-opacity-75 z-40">
      <div className="container mx-auto px-3 flex items-center h-full">
        <Link href={"/"}>
          <h1 className="font-bold text-2xl text-[#01FF00] cursor-pointer">
            EnterKomputer Movie
          </h1>
        </Link>

        <nav className="hidden lg:flex items-center gap-4 ml-5">
          {navigation.map((nav: NavigationItem) => (
            <div key={nav.link}>
              <Link
                href={nav.link}
                className={`px-2 font-semibold hover:text-neutral-100 ${
                  pathname === nav.link ? "text-blue-100" : "text-neutral-300"
                }`}
              >
                {nav.label}
              </Link>
            </div>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-5">
          <form
            className="flex items-center gap-4"
            onSubmit={handleSearchSubmit}
          >
            <input
              type="search"
              placeholder="Search here..."
              aria-label="Search movies"
              className="bg-transparent px-4 py-1 outline-none border-none hidden lg:block"
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            <button type="submit" className="text-white" aria-label="Search">
              <IoSearchOutline size={23} />
            </button>
          </form>

          <div>
            <Image
              src="/avatar.png"
              alt="User avatar"
              width={500}
              height={500}
              className="w-10 h-10 rounded-full overflow-hidden cursor-pointer active:scale-75 transition-all"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
