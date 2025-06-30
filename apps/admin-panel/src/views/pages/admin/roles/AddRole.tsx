import {
  createForm,
  required,
  minLength,
  setValue,
  type SubmitHandler,
} from "@modular-forms/solid";
import { useNavigate } from "@solidjs/router";
import { useMutation, useQuery } from "@tanstack/solid-query";
import { adminRolesApi } from "@apis/admin_roles";
import { queryClient } from "@helpers/axios";
import { QUERY_KEYS } from "@utils/constants";
import ErrorMessage from "@components/auth/ErrorMessage";
import { FormFields } from "@components/form";
import { For } from "solid-js";
type AddRoleForm = {
  name: string;
  description: string;
  permissions: any;
};

const AddRole = () => {
  const navigate = useNavigate();

  const [form, { Form, Field }] = createForm<AddRoleForm>({
    initialValues: {
      name: "",
      description: "",
      permissions: {},
    },
  });

  const permissionQuery = useQuery(() => ({
    queryFn: () => adminRolesApi.getPermissions(),
    queryKey: [QUERY_KEYS.ROLES.PERMISSIONS],
  }));

  const addRoleMutation = useMutation<any, unknown, AddRoleForm, unknown>(
    () => ({
      mutationFn: (body: AddRoleForm) => adminRolesApi.create(body),
      onSuccess: (data) => {
        if (data && data.roleId) {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.ADMIN.ROLES],
          });
          return navigate(-1);
        }
      },
    }),
  );

  const handleSubmit: SubmitHandler<AddRoleForm> = async (values) => {
    let permissions = [];

    for (let [k, v] of Object.entries(values.permissions)) {
      if (v === "checked") {
        permissions.push(k);
      }
    }
    const payload = {
      ...values,
      permissions,
    };
    await addRoleMutation.mutateAsync(payload);
  };

  return (
    <div class="add-admin-role-page card">
      <div>
        <div class="d-flex mb-1">
          <FormFields.BackButton />
          <h2> Add Role </h2>
        </div>
        <Form onSubmit={handleSubmit}>
          <Field name="name" validate={[required("Name is required")]}>
            {(field, props) => (
              <FormFields.Input
                {...props}
                id="role-name-input"
                label="Name"
                type="text"
                value={field.value}
                placeholder="Role Name"
                error={field.error}
              />
            )}
          </Field>
          <Field
            name="description"
            validate={[minLength(1, "Description is required")]}
          >
            {(field, props) => (
              <FormFields.Input
                {...props}
                id="role-description-input"
                label="Description"
                type="text"
                value={field.value}
                placeholder="Role Description"
                error={field.error}
              />
            )}
          </Field>
          <div class="mb-3">
            <label class="form-label">Permissions</label>
            <div class="permissions-group-list">
              {permissionQuery.isLoading && <div>Loading permissions...</div>}
              {permissionQuery.isError && <div>Error loading permissions.</div>}
              {permissionQuery.data && (
                <For each={Object.entries(permissionQuery.data?.result)}>
                  {([group, perms]) => (
                    <div class="permission-group" style="margin-bottom: 1em;">
                      <div
                        class="permission-group-title"
                        style="font-weight: bold; margin-bottom: 0.5em;"
                      >
                        {group.charAt(0).toUpperCase() + group.slice(1)}
                      </div>
                      <div
                        class="permission-checkbox-list"
                        style="display: flex; flex-wrap: wrap; gap: 1em;"
                      >
                        <For each={Array.isArray(perms) ? perms : []}>
                          {(perm: { action: string; id: string }) => (
                            <Field name={`permissions.${perm.id}`}>
                              {(field, props) => {
                                return (
                                  <FormFields.Checkbox
                                    {...props}
                                    id={props.name}
                                    name={props.name}
                                    value={field.value}
                                    checked={field.value === "checked"}
                                    label={perm.action}
                                    error={field.error}
                                    onChange={() => {
                                      setValue(
                                        form,
                                        props.name,
                                        field.value === "checked"
                                          ? "unchecked"
                                          : "checked",
                                      );
                                    }}
                                  />
                                );
                              }}
                            </Field>
                          )}
                        </For>
                      </div>
                    </div>
                  )}
                </For>
              )}
            </div>
          </div>
          <FormFields.Button
            type="submit"
            label={addRoleMutation.isPending ? "Adding..." : "Add Role"}
            variant="primary"
          />
          {addRoleMutation.isError && (
            <ErrorMessage error="Failed to add role. Please check the details." />
          )}
        </Form>
      </div>
    </div>
  );
};

export default AddRole;
