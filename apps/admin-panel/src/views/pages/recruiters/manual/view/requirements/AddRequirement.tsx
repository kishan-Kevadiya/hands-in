import { useNavigate, useParams } from "@solidjs/router";
import { useMutation } from "@tanstack/solid-query";
import { queryClient } from "@helpers/axios";
import { FormFields } from "@components/form";
import { manualRecruitersApis } from "@apis/manual_recruiters";
import {
    createForm,
    required,
    type SubmitHandler,
} from "@modular-forms/solid";
import { QUERY_KEYS } from "@utils/constants";

// ** CSS

type AddRequirementForm = {
    title: string;
    address: string;
    paymentStatus: "paid" | "unpaid";
    recruiterId: number
};

const paymentStatusOptions = [
    { value: "paid", label: "Paid" },
    { value: "unpaid", label: "Unpaid" },
];

const AddRequirement = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [_form, { Form, Field }] = createForm<AddRequirementForm>({
        initialValues: {
            title: "",
            address: "",
            paymentStatus: "unpaid",
        },
    });

    const addRequirementMutation = useMutation<any, unknown, AddRequirementForm, unknown>(
        () => ({
            mutationFn: (body: AddRequirementForm) => manualRecruitersApis.createRequirement(body),
            onSuccess: (data) => {
                if (data && data.message) {
                    queryClient.invalidateQueries({
                        queryKey: [QUERY_KEYS.MANUAL_RECRUITER.REQ_READ],
                    });
                    return navigate(-1);
                }
            },
        }),
    );

    const handleSubmit: SubmitHandler<AddRequirementForm> = async (values) => {
        await addRequirementMutation.mutateAsync({
            ...values,
            recruiterId: +id
        });
    };

    return (
        <div class="add-requirement-page card">
            <div>
                <div class="d-flex gap-2 align-center mb-1">
                    <FormFields.BackButton />
                    <h2>Add Requirement</h2>
                </div>
                <Form onSubmit={handleSubmit}>
                    <Field name="title" validate={[required("Title is required")]}>
                        {(field, props) => (
                            <FormFields.Input
                                {...props}
                                id="requirement-title-input"
                                label="Title"
                                type="text"
                                value={field.value}
                                placeholder="Flutter Developer"
                                error={field.error}
                            />
                        )}
                    </Field>
                    <Field name="address" validate={[required("Location is required")]}>
                        {(field, props) => (
                            <FormFields.Input
                                {...props}
                                id="requirement-address-input"
                                label="Location"
                                type="text"
                                value={field.value}
                                placeholder="Ahmedabad"
                                error={field.error}
                            />
                        )}
                    </Field>
                    <Field name="paymentStatus" validate={[required("Payment status is required")]}>
                        {(field, props) => (
                            <FormFields.Select
                                {...props}
                                id="requirement-payment-status-input"
                                label="Payment Status"
                                value={field.value}
                                options={paymentStatusOptions}
                                error={field.error}

                            />
                        )}
                    </Field>


                    <FormFields.Button
                        type="submit"
                        label={addRequirementMutation.isPending ? "Adding..." : "Add Requirement"}
                        variant="primary"
                    />
                </Form>
            </div>
        </div>
    );
};

export default AddRequirement;