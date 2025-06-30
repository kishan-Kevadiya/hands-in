import { A } from "@solidjs/router";
import { Show, For, Switch, Match, createMemo } from "solid-js";

// ** Images
import logo from "@assets/logo.webp";

import type { RouteType } from "@src/types";
import { useSidebarGroup } from "@helpers/contexts/Sidebar";
import { useAuth } from "@helpers/contexts/Auth";
import { routes } from "@router/routes";

import "./layout.css";

type SidebarMenuRoute = {
  label: string;
  path: string;
  icon?: any; 
};

type SidebarMenuItemProps = {
  route: SidebarMenuRoute;
};

function SidebarMenuItem({ route }: SidebarMenuItemProps) {
  const { toggleGroup } = useSidebarGroup();

  return (
    <A
      href={route.path}
      class="sidebar-link"
      onClick={() => toggleGroup("")}
    >
      <li class="sidebar-item">
        <Show when={route.icon}>
          <span class="sidebar-icon">
            <route.icon />
          </span>
        </Show>
        <span>{route.label}</span>
      </li>
    </A>
  );
}

function Sidebar() {
  const { user } = useAuth();

  const visibleRoutes = createMemo(() => {
    const permissions = user()?.permissions;
    if (!permissions) return [];

    return routes.filter((route) => {
      if (!route.meta?.inSidebar) return false;

      const requiredPermissions = route.meta.permissions;
      if (!requiredPermissions) return true;

      if (route.group) {
        return requiredPermissions.some((p) => permissions[p]);
      }

      return requiredPermissions.every((p) => permissions[p]);
    });
  });

  return (
    <div class="sidebar">
      <A href="/" class="sidebar-logo text-center">
        <img src={logo} alt="Sidebar logo" />
      </A>

      <ul class="sidebar-list">
        <For each={visibleRoutes()}>
          {(route: RouteType) => (
            <Switch>
              <Match when={route.group}>
                <span class="sidebar-divider">{route.group}</span>
              </Match>
              <Match when={!route.group}>
                <SidebarMenuItem
                  route={{
                    label: route.label || "",
                    path: route.path,
                    icon: route.icon,
                  }}
                />
              </Match>
            </Switch>
          )}
        </For>
      </ul>
    </div>
  );
}

export default Sidebar;
