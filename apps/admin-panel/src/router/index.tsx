import { Route, Router } from "@solidjs/router";
import { For } from "solid-js";
import { routes } from "./routes";
import AuthGuard from "./AuthGuard";
import RouteComponent from "./RouteComponent";

const MainRouter = () => {
  return (
    <Router>
      <For each={routes}>
        {(route) => (
          <Route
            path={route.path}
            component={() => (
              <AuthGuard>
                <RouteComponent data={route} />
              </AuthGuard>
            )}
          />
        )}
      </For>
      <Route
        path="*"
        component={() => (
          <RouteComponent
            data={{
              path: "/404",
              layout: "main",
              component: () => (
                <div
                  style={{
                    display: "grid",
                    "place-items": "center",
                    height: "100%",
                    color: "var(--color-danger)",
                  }}
                >
                  404 Not Found
                </div>
              ),
            }}
          />
        )}
      />
    </Router>
  );
};

export default MainRouter;
