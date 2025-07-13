import {
  createForm,
  required,
  minLength,
  email,
  type SubmitHandler,
} from "@modular-forms/solid";
import { useNavigate } from "@solidjs/router";
import ErrorMessage from "./ErrorMessage";
import logo from "@assets/logo.webp";
import { useMutation } from "@tanstack/solid-query";
import { adminUsersApis } from "@apis/admin_users";
import { queryClient } from "@helpers/axios";
import { QUERY_KEYS } from "@utils/constants";

// ** Styles
import "./auth.css";
import { FormFields } from "../form";

// Define the form values type
type LoginForm = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const navigate = useNavigate();

  // Initialize the form with Modular Forms
  const [loginForm, { Form, Field }] = createForm<LoginForm>({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation<any, unknown, LoginForm, unknown>(() => ({
    mutationFn: (body: LoginForm) => adminUsersApis.loginUser(body),
    onSuccess: (data) => {
      if (data.message) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.AUTH.CHECK_AUTH],
        });
        console.log("Login successful:", data.message);
        return navigate("/dashboard", { replace: true });
      }
    },
  }));

  const handleSubmit: SubmitHandler<LoginForm> = async (values) => {
    const { email, password } = values;

    // Call the login API
    await loginMutation.mutateAsync({ email, password });
    // Navigation is handled in onSuccess
  };

  return (
    <div class="login-container">
      <div class="login-box">
        <div class="logo">
          <img src={logo} alt="Logo" />
        </div>


        <Form onSubmit={handleSubmit} class="login-form">
          <Field
            name="email"
            validate={[
              required("Email is required"),
              email("Please enter a valid email"),
            ]}
          >
            {(field, props) => (
              <div class="form-group">
                <FormFields.Input
                  {...props}
                  id="email-input"
                  type="email"
                  label="Email"
                  value={field.value}
                  placeholder="you@example.com"
                  error={field.error}
                />
              </div>
            )}
          </Field>

          <Field
            name="password"
            validate={[
              required("Password is required"),
              minLength(6, "Password must be at least 6 characters"),
            ]}
          >
            {(field, props) => (
              <div class="form-group">
                <FormFields.PasswordInput
                  {...props}
                  label="Password"
                  id="password-input"
                  value={field.value}
                  placeholder="••••••••••••••"
                  error={field.error}
                />
              </div>
            )}
          </Field>

          <FormFields.Button
            disabled={loginForm.invalid || loginMutation.isPending || loginMutation.isSuccess}
            variant="primary"
            type="submit"
            class="w-100 mt-4"
            label={loginMutation.isPending || loginMutation.isSuccess ? "Logging..." : "Login"}
          />
          {loginMutation.isError && (
            <ErrorMessage error="Login failed. Please check your credentials." />
          )}
        </Form>

        <p class="register-link">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
