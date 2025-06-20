import {
  createForm,
  required,
  minLength,
  type SubmitHandler,
} from "@modular-forms/solid";
import { useNavigate } from "@solidjs/router";
import { useMutation } from "@tanstack/solid-query";
import { queryClient } from "@helpers/axios";
import { QUERY_KEYS } from "@utils/constants";
import { FormFields } from "@components/form";
import { discountsApis } from "@apis/discounts";

type AddCouponForm = {
  code: string;
  description: string;
  discountValue: number;
  discountType: "percentage" | "amount";
  providerId: string;
  isActive: boolean;
  validFrom: string;
  validUntil: string;
  maxRedemptions: number;
  isOneTimePerUser: boolean;
};

const AddCoupon = () => {
  const navigate = useNavigate();

  const [_form, { Form, Field }] = createForm<AddCouponForm>({
    initialValues: {
      code: "",
      description: "",
      discountValue: 0,
      discountType: "percentage",
      providerId: "",
      isActive: true,
      validFrom: "",
      validUntil: "",
      maxRedemptions: 1,
      isOneTimePerUser: false,
    },
  });

  const addCouponMutation = useMutation<any, unknown, AddCouponForm, unknown>(
    () => ({
      mutationFn: (body: AddCouponForm) => discountsApis.create(body),
      onSuccess: (data) => {
        if (data && data.message) {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.COUPONS.CREATE],
          });
          return navigate(-1);
        }
      },
    }),
  );

  const handleSubmit: SubmitHandler<AddCouponForm> = async (values) => {
    const placeholder = "T00:00:00+00:00";
    values.validFrom += placeholder;
    values.validUntil += placeholder;
    console.log(values);
    await addCouponMutation.mutateAsync(values);
  };

  return (
    <div class="add-coupon-page card">
      <div>
        <div class="d-flex mb-1">
          <FormFields.BackButton />
          <h2>Add Coupon</h2>
        </div>
        <Form onSubmit={handleSubmit}>
          <Field name="code" validate={[required("Coupon Code is required")]}>
            {(field, props) => (
              <FormFields.Input
                {...props}
                id="coupon-code-input"
                label="Coupon Code"
                type="text"
                value={field.value}
                placeholder="WELCOME10"
                error={field.error}
              />
            )}
          </Field>
          <Field
            name="description"
            validate={[minLength(10, "Description must have 10 characters.d")]}
          >
            {(field, props) => (
              <div>
                <FormFields.Textarea
                  {...props}
                  value={field.value}
                  label="Description"
                  placeholder="10% off for new users, valid for one month after signup."
                  error={field.error}
                />
              </div>
            )}
          </Field>
          <Field
            name="discountValue"
            type="number"
            validate={[required("Discount Value is required")]}
          >
            {(field, props) => (
              <FormFields.Input
                {...props}
                id="coupon-discount-value-input"
                label="Discount Value"
                type="number"
                value={Number.isFinite(field.value) ? field.value : ""}
                placeholder="10"
                error={field.error}
              />
            )}
          </Field>
          <Field
            name="discountType"
            validate={[required("Discount Type is required")]}
          >
            {(field, props) => (
              <FormFields.Select
                {...props}
                id="coupon-discount-type-input"
                label="Discount Type"
                value={field.value}
                error={field.error}
                options={[
                  { value: "percentage", label: "Percentage" },
                  { value: "fixed_amount", label: "Fixed Amount" },
                ]}
              />
            )}
          </Field>
          <Field
            name="providerId"
            validate={[required("Provider ID is required")]}
          >
            {(field, props) => (
              <FormFields.Input
                {...props}
                id="coupon-provider-id-input"
                label="Provider ID"
                type="text"
                value={field.value}
                placeholder="provider_razorpay_001"
                error={field.error}
              />
            )}
          </Field>
          <Field name="isActive" type="boolean">
            {(field, props) => (
              <FormFields.SwitchInput
                {...props}
                id="coupon-is-active-input"
                checked={field.value}
                label="Is Active"
                error={field.error}
              />
            )}
          </Field>
          <Field
            name="validFrom"
            validate={[required("Valid From date is required")]}
          >
            {(field, props) => (
              <FormFields.Input
                {...props}
                id="coupon-valid-from-input"
                label="Valid From"
                type="date"
                value={field.value}
                placeholder=""
                error={field.error}
              />
            )}
          </Field>
          <Field
            name="validUntil"
            validate={[required("Valid Until date is required")]}
          >
            {(field, props) => (
              <FormFields.Input
                {...props}
                id="coupon-valid-until-input"
                label="Valid Until"
                type="date"
                value={field.value}
                placeholder=""
                error={field.error}
              />
            )}
          </Field>
          <Field
            name="maxRedemptions"
            type="number"
            validate={[required("Max Redemptions is required")]}
          >
            {(field, props) => (
              <FormFields.Input
                {...props}
                id="coupon-max-redemptions-input"
                label="Max Redemptions"
                type="number"
                value={Number.isFinite(field.value) ? field.value : ""}
                placeholder="1000"
                error={field.error}
              />
            )}
          </Field>
          <Field name="isOneTimePerUser" type="boolean">
            {(field, props) => (
              <FormFields.SwitchInput
                {...props}
                id="coupon-is-one-time-per-user-input"
                checked={field.value}
                label="Is One Time Per User"
                error={field.error}
              />
            )}
          </Field>
          <FormFields.Button
            type="submit"
            label={addCouponMutation.isPending ? "Adding..." : "Add Coupon"}
            variant="primary"
          />
        </Form>
      </div>
    </div>
  );
};

export default AddCoupon;
