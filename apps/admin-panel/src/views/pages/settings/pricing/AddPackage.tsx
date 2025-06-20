import {
  createForm,
  required,
  minLength,
  type SubmitHandler,
  setValue,
} from "@modular-forms/solid";
import { useNavigate } from "@solidjs/router";
import { useMutation } from "@tanstack/solid-query";
import { queryClient } from "@helpers/axios";
import { QUERY_KEYS } from "@utils/constants";
import ErrorMessage from "@components/auth/ErrorMessage";
import { FormFields } from "@components/form";
import { packagesApis } from "@apis/packages";

type AddPackageForm = {
  name: string;
  description: string;
  price: number;
  duration: string;
  paymentProvider: string;
  paymentPlanId: string;
  isActive: boolean;
};

const AddPackage = () => {
  const navigate = useNavigate();

  const [form, { Form, Field }] = createForm<AddPackageForm>({
    initialValues: {
      name: "",
      description: "",
      price: 0,
      duration: "monthly",
      paymentProvider: "RAZORPAY",
      paymentPlanId: "",
      isActive: true,
    },
  });

  const addPackageMutation = useMutation<any, unknown, AddPackageForm, unknown>(
    () => ({
      mutationFn: (body: AddPackageForm) => packagesApis.create(body),
      onSuccess: (data) => {
        if (data && data.message) {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.PACKAGES.CREATE],
          });
          return navigate(-1);
        }
      },
    }),
  );

  const handleSubmit: SubmitHandler<AddPackageForm> = async (values) => {
    await addPackageMutation.mutateAsync(values);
  };

  return (
    <div class="add-package-page card">
      <div class="d-flex align-center gap-2 mb-2">
        <FormFields.BackButton />
        <h2> Add Package </h2>
      </div>
      <Form onSubmit={handleSubmit}>
        <Field name="name" validate={[required("Name is required")]}>
          {(field, props) => (
            <FormFields.Input
              {...props}
              id="package-name-input"
              label="Package Name"
              type="text"
              value={field.value}
              placeholder="Enterprise Yearly"
              error={field.error}
            />
          )}
        </Field>
        <Field
          name="description"
          validate={[
            minLength(10, "Description must have some character"),
            required("Description is required"),
          ]}
        >
          {(field, props) => (
            <div>
              <FormFields.QuillEditor
                {...props}
                value={field.value}
                label={"Description"}
                error={() => field.error}
                onChange={(e) => {
                  setValue(form, props.name, e);
                }}
                options={{ placeholder: "Write here..." }}
              />
            </div>
          )}
        </Field>
        <Field
          name="price"
          type="number"
          validate={[required("Price is required")]}
        >
          {(field, props) => (
            <FormFields.Input
              {...props}
              id="package-price-input"
              label="Price"
              type="number"
              value={Number.isFinite(field.value) ? field.value : ""}
              placeholder="4999"
              error={field.error}
            />
          )}
        </Field>
        <Field name="duration" validate={[required("Duration is required")]}>
          {(field, props) => (
            <FormFields.Select
              {...props}
              id="package-duration-input"
              label="Duration"
              value={field.value}
              error={field.error}
              options={[
                { value: "monthly", label: "Monthly" },
                { value: "yearly", label: "Yearly" },
              ]}
            />
          )}
        </Field>
        <Field
          name="paymentProvider"
          validate={[required("Payment Provider is required")]}
        >
          {(field, props) => (
            <FormFields.Select
              {...props}
              id="package-payment-provider-input"
              label="Payment Provider"
              value={field.value}
              error={field.error}
              options={[
                { value: "RAZORPAY", label: "Razorpay" },
                { value: "STRIPE", label: "Stripe" },
                { value: "PAYTM", label: "PayTM" },
              ]}
            />
          )}
        </Field>
        <Field
          name="paymentPlanId"
          validate={[required("Payment Plan ID is required")]}
        >
          {(field, props) => (
            <FormFields.Input
              {...props}
              id="package-payment-plan-id-input"
              label="Payment Plan ID"
              type="text"
              value={field.value}
              placeholder="razorpay_plan_enterprise_yearly_001"
              error={field.error}
            />
          )}
        </Field>
        <Field name="isActive" type="boolean">
          {(field, props) => (
            <FormFields.SwitchInput
              {...props}
              id="package-is-active-input"
              checked={field.value}
              label="Is Active"
              error={field.error}
            />
          )}
        </Field>
        <FormFields.Button
          type="submit"
          label={addPackageMutation.isPending ? "Adding..." : "Add Package"}
          variant="primary"
        />
        {addPackageMutation.isError && (
          <ErrorMessage error="Failed to add package. Please check the details." />
        )}
      </Form>
    </div>
  );
};

export default AddPackage;
