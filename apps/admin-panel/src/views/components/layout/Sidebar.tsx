import { SidebarRoutes } from "@router/routes";

import { A } from "@solidjs/router";
import { Show, For, Switch, Match } from "solid-js";


import "./layout.css";
import { useSidebarGroup } from "@helpers/contexts/Sidebar";
import { useAuth } from "@helpers/contexts/Auth";

// ** Images
import logo from "@assets/logo.webp";

// Types for route objects
type SidebarChildRoute = {
  label: string;
  path: string;
  icon?: any;
  permission?: string; // Optional permission for child routes
};

// type SidebarGroupRoute = {
//   group: string;
//   path: string;
//   icon?: any;
//   children: SidebarChildRoute[];
// };

type SidebarMenuRoute = SidebarChildRoute;

// type SidebarGroupProps = {
//   route: SidebarGroupRoute;
//   perrmissions?: any; // Optional permissions for the group
// };

// function SidebarGroup({ route, perrmissions  }: SidebarGroupProps) {
//   const { toggleGroup, openGroup } = useSidebarGroup();

//   const isOpen = () => openGroup() === route.group;

//   return (
//     <li class="sidebar-group">
//       <div
//         class="sidebar-group-label"
//         onClick={(e) => {
//           e.stopPropagation();
//           toggleGroup(route.group);
//         }}
//         tabindex={0}
//         role="button"
//         aria-expanded={isOpen() ? "true" : "false"}
//         aria-controls={`sidebar-group-list-${route.group}`}
//       >
//         <p>• {route.group}</p>

//         <span class={`expand-icon${isOpen() ? " expanded" : ""}`}>
//           <BackArrow />
//         </span>
//       </div>
//       <div
//         class={`sidebar-group-transition ${isOpen() ? "open" : ""}`}
//         id={`sidebar-group-list-${route.group}`}
//       >
//         <ul class="sidebar-group-list">
//           <For each={route.children}>
//             {(child: SidebarChildRoute) => (
//               <Show when={child.label?.length && child.permission && perrmissions[child.permission]} >
//                 <A
//                   href={`${route.path}${child.path}`}
//                   class="sidebar-link"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                   }}
//                 >
//                   <li class="sidebar-item">
//                     <Show when={child.icon}>
//                       <span class="sidebar-icon">
//                         <child.icon />
//                       </span>
//                     </Show>
//                     <span>{child.label}</span>
//                   </li>
//                 </A>
//               </Show>
//             )}
//           </For>
//         </ul>
//       </div>
//     </li>
//   );
// }

// Non-grouped menu item component
type SidebarMenuItemProps = {
  route: SidebarMenuRoute;
};

function SidebarMenuItem({ route }: SidebarMenuItemProps) {
  const { toggleGroup } = useSidebarGroup();

  return (
    <A
      href={route.path}
      class="sidebar-link"
      onClick={() => {
        toggleGroup("");
      }}
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
  const { success } = useAuth();

  const permissions = success()?.result;

  if (!permissions) {
    return null;
  }

  return (
    <div class="sidebar">
      <A href="/" class="sidebar-logo text-center">
        <img src={logo} alt="Sidebar logo" />
      </A>

      <ul class="sidebar-list">
        <For each={SidebarRoutes}>
          {(route: any) => (
            <Show when={route.permission ? permissions[route.permission] : true}>
              <Switch>
                <Match when={route.group}>
                  <span class="sidebar-divider">{route.group}</span>
                </Match>
                <Match when={!route.group}>
                  <SidebarMenuItem route={route} />
                </Match>
              </Switch>
            </Show>
          )}
        </For>
      </ul>
    </div>
  );
}

export default Sidebar;
