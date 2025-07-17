import { useNavigate } from "@solidjs/router";
import { useMutation } from "@tanstack/solid-query";
import { queryClient } from "@helpers/axios";
import { PhoneTypes, QUERY_KEYS, PriorityTypes } from "@utils/constants";
import { FormFields } from "@components/form";
import {
  createForm,
  required,
  type SubmitHandler,
  FieldArray,
  insert,
  remove,
} from "@modular-forms/solid";
import { manualRecruitersApis } from "@apis/manual_recruiters";
import type { Recruiter } from "../columns";
import { For } from "solid-js";

// ** CSS
import "./styles.css";

type PhoneEntry = {
  phoneType: string;
  phone: string;
};

type AddRecruiterForm = Omit<Recruiter, "id" | "createdAt" | "updatedAt"> & {
  phones: PhoneEntry[];
};

const AddManualRecruiter = () => {
  const navigate = useNavigate();

  const [form, { Form, Field }] = createForm<AddRecruiterForm>({
    initialValues: {
      name: "",
      email: "",
      description: "",
      address: "",
      priority: "low",
      phones: [{ phoneType: "personal", phone: "" }],
    },
  });

  const addRecruiterMutation = useMutation<
    any,
    unknown,
    AddRecruiterForm,
    unknown
  >(() => ({
    mutationFn: (body: AddRecruiterForm) => manualRecruitersApis.create(body),
    onSuccess: (data) => {
      if (data && data.message) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.MANUAL_RECRUITER.READ],
        });
        return navigate(-1);
      }
    },
  }));

  const handleSubmit: SubmitHandler<AddRecruiterForm> = async (values) => {
    console.log(values);
    await addRecruiterMutation.mutateAsync(values);
  };

  return (
    <div class="add-manual-recruiter-page card">
      <div>
        <div class="d-flex mb-1">
          <FormFields.BackButton />
          <h2>Add Manual Recruiter</h2>
        </div>
        <Form onSubmit={handleSubmit}>
          <Field name="name" validate={[required("Name is required")]}>
            {(field, props) => (
              <FormFields.Input
                {...props}
                id="recruiter-name-input"
                label="Name"
                type="text"
                value={field.value}
                placeholder="John Doe"
                error={field.error}
              />
            )}
          </Field>
          <Field name="email">
            {(field, props) => (
              <FormFields.Input
                {...props}
                id="recruiter-email-input"
                label="Email"
                type="email"
                value={field.value}
                placeholder="john@example.com"
                error={field.error}
              />
            )}
          </Field>
          <Field name="description">
            {(field, props) => (
              <FormFields.Textarea
                {...props}
                id="recruiter-description-input"
                label="Description"
                value={field.value}
                placeholder="Recruiter description"
                error={field.error}
              />
            )}
          </Field>
          <Field name="address">
            {(field, props) => (
              <FormFields.Input
                {...props}
                id="recruiter-address-input"
                label="Address"
                type="text"
                value={field.value}
                placeholder="123 Main St, City"
                error={field.error}
              />
            )}
          </Field>

          <Field name="priority" validate={[required("Priority is required")]}>
            {(field, props) => (
              <FormFields.Select
                {...props}
                id="role-select"
                label="Priority"
                value={field.value}
                options={PriorityTypes.map((p) => ({
                  value: p,
                  label: p.toLocaleUpperCase(),
                }))}
                error={field.error}
              />
            )}
          </Field>

          <div class="phones-group">
            <section class="d-flex gap-2 align-center mb-2">
              <small class="fw-600">Phones</small>
              <FormFields.CircleButton
                variant="success"
                href=""
                onClick={() => {
                  insert(form, "phones", {
                    value: { phone: "", phoneType: "personal" },
                  });
                }}
              />
            </section>

            <FieldArray of={form} name="phones">
              {(fieldArray) => (
                <For each={fieldArray.items}>
                  {(_, index) => (
                    <div class="d-flex align-center gap-2 mb-3">
                      <Field name={`phones.${index()}.phoneType`}>
                        {(phoneTypeField, phoneTypeProps) => (
                          <Field
                            name={`phones.${index()}.phone`}
                            validate={[
                              required("Phone number is required"),
                              (value: string | undefined) => {
                                const phoneRegex = /^[0-9]{7,15}$/;
                                if (!value || !phoneRegex.test(value)) {
                                  return "Enter a valid phone number (7-15 digits)";
                                }
                                return "";
                              },
                            ]}
                          >
                            {(phoneField, phoneProps) => (
                              <FormFields.SelectInputCombo
                                error={phoneTypeField.error || phoneField.error}
                              >
                                <select
                                  {...phoneTypeProps}
                                  id={"recruiter-phone-type-select" + index()}
                                  value={phoneTypeField.value}
                                >
                                  {PhoneTypes.map((value) => (
                                    <option value={value}>
                                      {" "}
                                      {value.toUpperCase()}{" "}
                                    </option>
                                  ))}
                                </select>
                                <input
                                  {...phoneProps}
                                  id={"recruiter-phone-number-input" + index()}
                                  type="tel"
                                  value={phoneField.value}
                                  placeholder="Enter phone number"
                                  inputMode="numeric"
                                  pattern="[0-9]{7,15}"
                                  onInput={(e) => {
                                    // Only allow numbers
                                    const target = e.target as HTMLInputElement;
                                    target.value = target.value.replace(
                                      /[^0-9]/g,
                                      "",
                                    );
                                    phoneProps.onInput?.(e);
                                  }}
                                />
                              </FormFields.SelectInputCombo>
                            )}
                          </Field>
                        )}
                      </Field>
                      <p
                        class="remove-btn"
                        onClick={() => remove(form, "phones", { at: index() })}
                      >
                        {" "}
                        Remove{" "}
                      </p>
                    </div>
                  )}
                </For>
              )}
            </FieldArray>
          </div>

          <FormFields.Button
            type="submit"
            label={
              addRecruiterMutation.isPending ? "Adding..." : "Add Recruiter"
            }
            variant="primary"
          />
        </Form>
      </div>
    </div>
  );
};

export default AddManualRecruiter;
