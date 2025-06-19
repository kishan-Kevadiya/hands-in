import RouteComponent from "./RouteComponent";
import { Route, Router } from "@solidjs/router";
import type { RouteType } from "@src/types/layout";
import { privateRoutes, publicRoutes } from "./routes";

// This is the corrected render function
const renderRoute = (route: RouteType) => {
  // This part for nested routes remains the same.
  if (route.children) {
    return (
      <Route path={route.path}>
        {route.children.map((child: RouteType) => renderRoute(child))}
      </Route>
    );
  }

  return (
    <Route
      path={route.path}
      component={() => <RouteComponent data={route} />}
    />
  );
};

const MainRouter = () => {
  return (
    <Router>
      {publicRoutes.map((route) => renderRoute(route))}
      {privateRoutes.map((route) => renderRoute(route))}

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
