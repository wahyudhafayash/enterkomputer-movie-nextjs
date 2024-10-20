import React from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { AccountMenuProps } from "@/utils/interface";

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const router = useRouter();
  const { user, isLoaded, isSignedIn } = useUser();
  const clerk = useClerk();

  const handleSignOut = async () => {
    const isGuest = document.cookie.split(";").some((cookie) => {
      const [name] = cookie.trim().split("=");
      return name === "Login_Guest";
    });

    await clerk.signOut();

    if (isGuest) {
      document.cookie =
        "Login_Guest=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    }

    window.location.reload();
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black min-w-56 absolute top-14 right-0 flex-col border-2 border-gray-500">
      <div className="flex flex-col">
        {isLoaded && (
          <div
            onClick={() => router.push("/profile")}
            className="px-3 py-4 group/item flex flex-row gap-3 items-center w-full"
          >
            <img
              className="w-6 rounded-md"
              src={user?.imageUrl || "/default-green.png"}
              alt="profile"
            />
            <p className="text-white text-xl cursor-pointer group-hover:item:underline">
              {user?.firstName || user?.username || "Guest"}
            </p>
          </div>
        )}
        <div className="flex justify-center border-t border-neutral-700 py-2">
          <div
            onClick={isSignedIn ? handleSignOut : () => router.push("/sign-in")}
            className="text-white cursor-pointer hover:underline"
          >
            {isSignedIn ? "Sign out" : "Sign in"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
