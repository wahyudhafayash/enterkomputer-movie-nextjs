"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import ProfileCard from "@/app/profile/_components/ProfileCard";

const Profiles: React.FC = () => {
  const router = useRouter();
  const { user, isLoaded, isSignedIn } = useUser();

  const checkLoginGuestCookie = (): boolean => {
    const cookies = document.cookie
      .split(";")
      .reduce((acc: Record<string, string>, cookie) => {
        const [name, value] = cookie.trim().split("=");
        acc[name] = value;
        return acc;
      }, {});
    return !!cookies["Login_Guest"];
  };

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn && !checkLoginGuestCookie()) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center min-h-screen justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Who is watching?
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <ProfileCard
            imageUrl={user?.imageUrl}
            name={user?.firstName || user?.username || "Guest"}
          />
        </div>
      </div>
    </div>
  );
};

export default Profiles;
