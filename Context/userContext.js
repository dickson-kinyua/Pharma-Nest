"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    if (status === "authenticated") {
      setLoggedUser(session?.user); // Store user from session
    } else {
      setLoggedUser(null);
    }
  }, [session, status]);

  // console.log(loggedUser);

  return (
    <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useLoggedUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useLoggedUser must be used within a UserContextProvider");
  }
  return context;
};
