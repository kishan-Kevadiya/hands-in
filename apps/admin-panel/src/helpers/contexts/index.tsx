import { AuthProvider } from "./Auth";
import { ModalProvider } from "./Modal";
import { SidebarGroupProvider } from "./Sidebar";

export function ContextWrapper(props: { children: any }) {
  return (
    <AuthProvider>
      <SidebarGroupProvider>
        <ModalProvider>{props.children}</ModalProvider>
      </SidebarGroupProvider>
    </AuthProvider>
  );
}
