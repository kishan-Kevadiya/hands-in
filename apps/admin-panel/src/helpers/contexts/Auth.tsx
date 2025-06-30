import { createContext, useContext } from "solid-js";
import { useQuery } from "@tanstack/solid-query";
import { adminUsersApis } from "@helpers/apis/admin_users";
import { QUERY_KEYS } from "@utils/constants";
import type { User } from "@src/types/user";

// Define the context type for authentication
type AuthContextType = {
  isPending: () => boolean; // isPending from useQuery is also a signal
  isError: () => boolean;
  user: () => User | null;
  hasPermission: (permission: string) => boolean;
};

// Make sure the context type can be undefined if used outside the provider
export const AuthContext = createContext<AuthContextType | undefined>();

export function AuthProvider(props: any) {
  const query = useQuery(() => ({
    queryKey: [QUERY_KEYS.AUTH.CHECK_AUTH],
    queryFn: adminUsersApis.userAuth,
    retry: false,
  }));

  const hasPermission = (permission: string) => {
    const user = query.data;
    if (!user || !user.permissions) {
      return false;
    }
    return user.permissions[permission];
  };

  const value = {
    isPending: () => query.isPending,
    isError: () => query.isError,
    user: () => query.data,
    hasPermission,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
