import type { Component } from "solid-js";

export interface RouteType {
  path: string;
  label?: string;
  icon?: Component<any>;
  component?: Component<any>;
  layout?: "auth" | "main" | "sidebar";
  permission?: string;
  group?: string;
  children?: RouteType[];
  redirectTo?: string;
  exact?: boolean;
  sidebar?: boolean;
}
