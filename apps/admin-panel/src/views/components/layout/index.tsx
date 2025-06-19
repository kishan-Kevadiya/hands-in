import type { JSXElement } from "solid-js";
import Sidebar from "./Sidebar";

import "./layout.css";
import Header from "./Header";

function Layout({ children }: { children: JSXElement }) {
  return (
    <div class="main-layout-container">
      <aside>
        <Sidebar />
      </aside>

      <div class="main-layout">
        <Header />
        <main class="main-content">
          <div class="container">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
