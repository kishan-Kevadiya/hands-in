import {
  createForm,
  required,
  minLength,
  email,
  type SubmitHandler,
} from "@modular-forms/solid";
import { useNavigate } from "@solidjs/router";
import { useMutation, useQuery } from "@tanstack/solid-query";
import { adminUsersApis } from "@apis/admin_users";
import { queryClient } from "@helpers/axios";
import { QUERY_KEYS } from "@utils/constants";
import ErrorMessage from "@components/auth/ErrorMessage";
import { FormFields } from "@components/form";
import { adminRolesApi } from "@apis/admin_roles";

type AddUserForm = {
  name: string;
  email: string;
  password: string;
  gender: string;
  address: string;
  roleId: string;
};

const genderOptions = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
  { value: "OTHER", label: "Other" },
];

const AddUser = () => {
  const navigate = useNavigate();

  const [_addUserForm, { Form, Field }] = createForm<AddUserForm>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      gender: "",
      address: "",
      roleId: "",
    },
  });

  const rolesQuery = useQuery(() => ({
    queryKey: [QUERY_KEYS.ADMIN.ROLES, 1, 50],
    queryFn: () =>
      adminRolesApi.getAll({
        page: 1,
        limit: 50,
      }),
  }));

  const addUserMutation = useMutation<any, unknown, AddUserForm, unknown>(
    () => ({
      mutationFn: (body: AddUserForm) => adminUsersApis.create(body),
      onSuccess: (data) => {
        if (data && data.message) {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.ADMIN.USERS],
          });
          return navigate("/admin/users", { replace: true });
        }
      },
    }),
  );

  const handleSubmit: SubmitHandler<AddUserForm> = async (values) => {
    await addUserMutation.mutateAsync(values);
  };

  // Prepare role options from rolesQuery data
  const roleOptions = () =>
    rolesQuery.data?.data?.map((role: { id: string; name: string }) => ({
      value: role.id,
      label: role.name,
    })) ?? [];

  return (
    <div class="add-admin-user-page card">
      <div>
        <div class="d-flex align-center gap-2 mb-1">
          <FormFields.BackButton />
          <h2> Add User </h2>
        </div>
        <Form onSubmit={handleSubmit}>
          <Field name="name" validate={[required("Name is required")]}>
            {(field, props) => (
              <FormFields.Input
                {...props}
                id="name-input"
                label="Name"
                type="text"
                value={field.value}
                placeholder="Full Name"
                error={field.error}
              />
            )}
          </Field>

          <Field
            name="email"
            validate={[
              required("Email is required"),
              email("Please enter a valid email"),
            ]}
          >
            {(field, props) => (
              <FormFields.Input
                {...props}
                id="email-input"
                label="Email"
                type="email"
                value={field.value}
                placeholder="you@example.com"
                error={field.error}
              />
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
              <FormFields.PasswordInput
                {...props}
                id="password-input"
                label="Password"
                value={field.value}
                placeholder="•••••••••••••"
                error={field.error}
              />
            )}
          </Field>

          <Field name="gender" validate={[required("Gender is required")]}>
            {(field, props) => (
              <FormFields.Radio
                {...props}
                label="Gender"
                name="gender"
                options={genderOptions}
                value={field.value}
                error={field.error}
              />
            )}
          </Field>

          <Field name="address" validate={[required("Address is required")]}>
            {(field, props) => (
              <FormFields.Input
                {...props}
                id="address-input"
                label="Address"
                type="text"
                value={field.value}
                placeholder="Address"
                error={field.error}
              />
            )}
          </Field>

          <Field name="roleId" validate={[required("Role is required")]}>
            {(field, props) => (
              <FormFields.Select
                {...props}
                id="role-select"
                label="Role"
                value={field.value}
                options={[
                  { value: "", label: "Select a role" },
                  ...roleOptions(),
                ]}
                error={field.error}
                disabled={rolesQuery.isLoading}
              />
            )}
          </Field>

          <FormFields.Button
            type="submit"
            label={addUserMutation.isPending ? "Adding..." : "Add User"}
            variant="primary"
            // disabled={addUserForm.invalid || addUserMutation.isPending}
          />
          {addUserMutation.isError && (
            <ErrorMessage error="Failed to add user. Please check the details." />
          )}
        </Form>
      </div>
    </div>
  );
};

export default AddUser;
