"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const GuestLogin: React.FC = () => {
  const router = useRouter();

  const handleGuestLogin = () => {
    Cookies.set("Login_Guest", "true", { expires: 7 });
    router.push("/");
  };

  return (
    <div>
      <button onClick={handleGuestLogin} className="mt-4">
        Login as Guest
      </button>
    </div>
  );
};

export default GuestLogin;
