import type { JSXElement } from "solid-js";
import Sidebar from "./Sidebar";
import Header from "./Header";

import "./layout.css";


function Layout(props: { children: JSXElement; [key: string]: any }) {
  const { children, ...rest } = props;
  return (
    <div class="main-layout-container">
      <aside>
        <Sidebar />
      </aside>

      <div class="main-layout">
        <Header {...rest.route} />
        <main class="main-content">
          <div class="container">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
