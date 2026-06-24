'use client';

import React, { createContext, useContext } from "react";
import { useHrmsStore, Role, User } from "../store/mockDatabase";

export interface RoleContextValue {
  role: Role;
  user: User;
  switchRole: (role: Role) => void;
  users: User[];
  setUser: (userId: string) => void;
}

const RoleContext = createContext<RoleContextValue | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const activeRole = useHrmsStore((s) => s.activeRole);
  const activeUser = useHrmsStore((s) => s.activeUser);
  const switchRole = useHrmsStore((s) => s.switchRole);
  const users = useHrmsStore((s) => s.users);
  const setUser = useHrmsStore((s) => s.setUser);

  return (
    <RoleContext.Provider
      value={{
        role: activeRole,
        user: activeUser,
        switchRole,
        users,
        setUser,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
}

interface RoleGateProps {
  allowedRoles: Role[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function RoleGate({ allowedRoles, children, fallback = null }: RoleGateProps) {
  const { role } = useRole();

  if (allowedRoles.includes(role)) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}
