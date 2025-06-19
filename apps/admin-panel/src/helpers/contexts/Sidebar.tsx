import { createContext, createSignal, useContext, type JSX } from "solid-js";

type SidebarGroupContextType = {
  openGroup: () => string | null;
  setOpenGroup: (group: string | null) => void;
  toggleGroup: (group: string) => void;
};

const SidebarGroupContext = createContext<SidebarGroupContextType>();

export function SidebarGroupProvider(props: { children: JSX.Element }) {
  // Get default open group from localStorage
  const [openGroup, setOpenGroup] = createSignal<string | null>(
    typeof window !== "undefined" ? localStorage.getItem("group") : null,
  );

  const toggleGroup = (group: string | null) => {
    if (group) {
      localStorage.setItem("group", group);
    } else {
      localStorage.removeItem("group");
    }
    setOpenGroup((prev) => (prev === group ? null : group));
  };

  return (
    <SidebarGroupContext.Provider
      value={{ openGroup: openGroup, setOpenGroup, toggleGroup }}
    >
      {props.children}
    </SidebarGroupContext.Provider>
  );
}

export function useSidebarGroup() {
  const context = useContext(SidebarGroupContext);
  if (!context)
    throw new Error(
      "useSidebarGroup must be used within a SidebarGroupProvider",
    );
  return context;
}
