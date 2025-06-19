import { Navigate } from "@solidjs/router";
import { Switch, Match, type ParentProps } from "solid-js";
import { useAuth } from "@helpers/contexts/Auth";
import Loader from "@components/Loader";

interface AuthGuardProps {
  layout: "auth" | "sidebar" | "main";
}

const AuthGuard = (props: ParentProps<AuthGuardProps>) => {
  const auth = useAuth();
  const isAuthPage = () => props.layout === "auth";

  return (
    <Switch>
      <Match when={auth.isPending()}>
        <Loader />
      </Match>

      <Match when={!auth.success() && !isAuthPage()}>
        <Navigate href="/login" />
      </Match>

      <Match when={auth.success() && isAuthPage()}>
        <Navigate href="/dashboard" />
      </Match>

      <Match when={true}>{props.children}</Match>
    </Switch>
  );
};

export default AuthGuard;
