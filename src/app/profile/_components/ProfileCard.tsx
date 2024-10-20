import React from "react";
import { useRouter } from "next/navigation";
import { ProfileCardProps } from "@/utils/interface";

const ProfileCard: React.FC<ProfileCardProps> = ({ imageUrl, name }) => {
  const router = useRouter();

  return (
    <div onClick={() => router.push("/")}>
      <div className="group flex-row w-44 mx-auto">
        <div
          className="
            w-44
            h-44
            rounded-md
            flex
            items-center
            justify-center
            border-2
            border-transparent
            group-hover:cursor-pointer
            group-hover:border-white
            overflow-hidden
          "
        >
          <img src={imageUrl || "/default-green.png"} alt="profile" />
        </div>
        <div
          className="
            mt-4
            text-gray-400
            text-2xl
            text-center
            group-hover:text-white
          "
        >
          {name}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
