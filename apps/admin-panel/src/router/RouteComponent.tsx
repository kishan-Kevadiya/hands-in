// src/router/RouteComponent.tsx

import type { RouteType } from "@src/types/layout";
import Layout from "@components/layout";
import AuthLayout from "@components/auth/AuthLayout";
import { lazy } from "solid-js";
import AuthGuard from "./AuthGuard";
import { ErrorBoundary } from "solid-js";
import Button from "@components/Button";

interface RouterProvidedProps {
  data: RouteType;
}

const RouteComponent = (props: RouterProvidedProps) => {
  const route = props.data;

  const LayoutComponent = route.layout === "auth" ? AuthLayout : Layout;
  const Component =
    route.component ||
    lazy(() =>
      Promise.resolve({ default: () => <div>Component Not Found</div> }),
    );

  return (
    <AuthGuard layout={route.layout || "main"}>
      <LayoutComponent>
        <ErrorBoundary
          fallback={(error, reset) => (
            <div class="error-boundary-container">
              <div>
                <p>Something went wrong: {error.message}</p>

                <div class="text-center">
                  <Button onClick={reset}>Try Again</Button>
                </div>
              </div>
            </div>
          )}
        >
          <Component route={route} />
        </ErrorBoundary>
      </LayoutComponent>
    </AuthGuard>
  );
};

export default RouteComponent;
