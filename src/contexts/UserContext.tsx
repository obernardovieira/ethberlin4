"use client";
// contexts/UserContext.tsx
import React, { useState, createContext, useContext } from "react";
import { useCookies } from "next-client-cookies";

interface UserContextType {
  userId: string | undefined;
  setUserId: (userId: string) => void;
  userEmail: string | undefined;
  setUserEmail: (email: string) => void;
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const cookieStore = useCookies();
  const [userId, setUserId_] = useState<string>(
    cookieStore.get("userId") || ""
  );
  const [userEmail, setUserEmail_] = useState<string>(
    cookieStore.get("userEmail") || ""
  );
  const [loggedIn, setLoggedIn] = useState<boolean>(
    cookieStore.get("userId") ? true : false
  );

  const setUserId = (userId: string) => {
    setUserId_(userId);
    cookieStore.set("userId", userId);
  };

  const setUserEmail = (email: string) => {
    setUserEmail_(email);
    cookieStore.set("userEmail", email);
  };

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        userEmail,
        setUserEmail,
        loggedIn,
        setLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
