"use client";

// This file creates an AuthContext so any component can read the user
// and call sign-in / sign-out functions easily.

import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GithubAuthProvider,
  User,
} from "firebase/auth";
import { auth } from "./firebase";

// Define what our context will provide
type AuthContextType = {
  user: User | null;
  gitHubSignIn: () => Promise<any>;
  firebaseSignOut: () => Promise<void>;
};

// Create the context
const AuthContext = createContext<AuthContextType | null>(null);

// Provider component wraps the Week-10 pages and provides auth state
export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Opens GitHub popup and signs in
  const gitHubSignIn = () => {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // Signs out
  const firebaseSignOut = () => {
    return signOut(auth);
  };

  // Listen for login/logout changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup listener when component unmounts
    return () => unsubscribe();
  }, []); // IMPORTANT: [] so it runs once (no loops)

  return (
    <AuthContext.Provider value={{ user, gitHubSignIn, firebaseSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the auth context in any component
export const useUserAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUserAuth must be used inside AuthContextProvider");
  }
  return context;
};