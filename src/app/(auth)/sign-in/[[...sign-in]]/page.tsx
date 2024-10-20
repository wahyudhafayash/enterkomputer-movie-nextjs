"use client";

import { SignIn, useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import GuestLogin from "./_components/GuestLogin";
import Cookies from "js-cookie";

const Page: React.FC = () => {
  const { user } = useUser();
  const [isGuest, setIsGuest] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const guestCookie = Cookies.get("Login_Guest");
    if (guestCookie) {
      setIsGuest(true);
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className="flex min-h-screen w-full pt-16 justify-center items-center">
      {!user && !isGuest ? (
        <div>
          <SignIn />
          <GuestLogin />
        </div>
      ) : (
        <div>
          <h1>Welcome {isGuest ? "Guest" : user?.firstName}</h1>
        </div>
      )}
    </div>
  );
};

export default Page;
