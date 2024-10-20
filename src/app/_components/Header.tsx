"use client";

import React, { useState, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IoSearchOutline } from "react-icons/io5";
import { BsChevronDown } from "react-icons/bs";
import { NavigationItem } from "@/utils/interface";
import { navigation } from "@/contans/navigation";
import AccountMenu from "./AccountMenu";

const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [searchInput, setSearchInput] = useState<string>("");
  const [showAccountMenu, setShowAccountMenu] = useState<boolean>(false);

  const handleSearchSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedInput = searchInput.trim();
    if (trimmedInput) {
      try {
        await router.replace(`/search?q=${trimmedInput}`);
      } catch (error) {
        console.error("Error during navigation:", error);
      }
    }
  };

  const toggleAccountMenu = () => {
    setShowAccountMenu((prev) => !prev);
  };

  return (
    <header className="fixed top-0 w-full h-16 bg-black bg-opacity-50 z-40">
      <div className="container mx-auto px-3 flex items-center h-full">
        <Link href={"/"}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={605}
            height={605}
            className="w-[250px]"
          />
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

          <div className="relative">
            <div
              onClick={toggleAccountMenu}
              className="flex items-center cursor-pointer"
            >
              <Image
                src="/default-green.png"
                alt="User avatar"
                width={500}
                height={500}
                className="w-10 h-10 rounded overflow-hidden"
              />

              <BsChevronDown
                className={`ml-2 w-4 h-4 text-neutral-300 ${
                  showAccountMenu ? "rotate-180" : ""
                }`}
              />
            </div>
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
