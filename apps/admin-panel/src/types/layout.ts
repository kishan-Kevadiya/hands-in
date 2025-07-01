import type { Component } from "solid-js";

export interface RouteType {
  path: string;
  label?: string;
  icon?: Component<any>;
  component?: Component<any>;
  layout?: "auth" | "main";
  group?: string;
  children?: RouteType[];
  redirectTo?: string;
  exact?: boolean;
  sidebar?: boolean;
  meta?: {
    public?: boolean;
    inSidebar?: boolean;
    permissions?: string[];
    roles?: string[];
  };
}



export type FiltersOptions = {
  page?: number;
  limit?: number;
  search?: string;
}
