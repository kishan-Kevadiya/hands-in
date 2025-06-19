import { Suspense, type ParentComponent } from "solid-js";
import Loader from "../Loader";

const AuthLayout: ParentComponent = (props) => {
  return (
    <>
      <div class="auth-layout">
        <main>
          <Suspense fallback={<Loader />}>{props.children}</Suspense>
        </main>
      </div>
    </>
  );
};

export default AuthLayout;
