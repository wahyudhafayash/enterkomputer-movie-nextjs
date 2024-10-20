"use client";

import React, { useState, useEffect, createContext, ReactNode } from "react";
import { useUser } from "@clerk/nextjs";
import { NextUIProvider } from "@nextui-org/react";

interface UserDetail {
  userEmail: string | null;
  userImage: string | null;
  userName: string | null;
}

interface UserDetailContextType {
  userDetail: UserDetail | null;
  setUserDetail: React.Dispatch<React.SetStateAction<UserDetail | null>>;
}

export const UserDetailContext = createContext<
  UserDetailContextType | undefined
>(undefined);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setUserDetail({
        userEmail: user.primaryEmailAddress?.emailAddress || null,
        userImage: user.imageUrl || null,
        userName: user.fullName || null,
      });
    }
    setLoading(false);
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <NextUIProvider>{children}</NextUIProvider>
    </UserDetailContext.Provider>
  );
};

export default UserProvider;
