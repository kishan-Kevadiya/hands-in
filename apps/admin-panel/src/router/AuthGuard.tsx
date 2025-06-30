import { Navigate, useLocation } from "@solidjs/router";
import { Switch, Match, type ParentProps, createMemo } from "solid-js";
import { useAuth } from "@helpers/contexts/Auth";
import Loader from "@components/Loader";
import { routes } from "./routes";

const AuthGuard = (props: ParentProps) => {
  const auth = useAuth();
  const location = useLocation();

  const currentRoute = createMemo(() => {
    const currentPath = location.pathname;
    return routes.find((route) => route.path === currentPath);
  });

  const routeInfo = createMemo(() => {
    const route = currentRoute();
    const meta = route?.meta;
    return {
      isPublic: meta?.public ?? false,
      permissions: meta?.permissions ?? [],
    };
  });

  const user = createMemo(() => auth.user());

  const hasPermissions = createMemo(() => {
    const requiredPermissions = routeInfo().permissions;
    if (requiredPermissions.length === 0) return true;

    const userPermissions = user()?.permissions;

    if (!userPermissions) return false;

    return requiredPermissions.every((p) => userPermissions[p]);
  });


  const redirectUrl = createMemo(() => {
    if (auth.isPending()) return null;

    if (!currentRoute()) return undefined;

    const loggedIn = !!user();
    const { isPublic } = routeInfo();

    if (!loggedIn && !isPublic) return "/login";
    if (loggedIn && isPublic) return "/dashboard";
    if (loggedIn && !hasPermissions()) return "/dashboard";
    return undefined;
  });

  return (
    <Switch>
      <Match when={auth.isPending()}>
        <Loader />
      </Match>
      <Match when={redirectUrl()}>
        {(url) => <Navigate href={url()} />}
      </Match>
      <Match when={true}>{props.children}</Match>
    </Switch>
  );
};

export default AuthGuard;
