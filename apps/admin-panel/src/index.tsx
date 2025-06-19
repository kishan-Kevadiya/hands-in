import { render } from "solid-js/web";
import { QueryClientProvider } from "@tanstack/solid-query";

import { queryClient } from "./helpers/axios.ts";
import { ContextWrapper } from "./helpers/contexts/index.tsx";

// Global styles
import "./index.css";
import "./styles/common.css";
import App from "./App.tsx";

const root = document.getElementById("root");

render(
  () => (
    <QueryClientProvider client={queryClient}>
      <ContextWrapper>
        <App />
      </ContextWrapper>
    </QueryClientProvider>
  ),
  root!,
);
