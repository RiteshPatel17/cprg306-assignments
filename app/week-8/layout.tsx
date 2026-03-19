// This layout wraps all Week-8 pages with AuthContextProvider.
// That means page.tsx and shopping-list/page.tsx can access the user.

import { AuthContextProvider } from "./_utils/auth-context";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}