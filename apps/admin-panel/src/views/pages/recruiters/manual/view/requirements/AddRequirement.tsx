import { useNavigate, useParams } from "@solidjs/router";
import { useMutation } from "@tanstack/solid-query";
import { queryClient } from "@helpers/axios";
import { FormFields } from "@components/form";
import { manualRecruitersApis } from "@apis/manual_recruiters";
import {
    createForm,
    required,
    setValue,
    type SubmitHandler,
} from "@modular-forms/solid";
import { QUERY_KEYS, RequirementGenderTypes, RequirementPriorityTypes } from "@utils/constants";

// ** CSS
import "../../styles.css";

type AddRequirementForm = {
    title: string;
    address: string;
    paymentStatus: "paid" | "unpaid";
    description: string;
    salaryMin: number;
    salaryMax: number;
    workType: "part_time" | "full_time" | "remote";
    gender: "MALE" | "FEMALE" | "ANY";
    priority: string;
    recruiterId: number
};

const paymentStatusOptions = [
    { value: "paid", label: "Paid" },
    { value: "unpaid", label: "Unpaid" },
];

const AddRequirement = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [form, { Form, Field }] = createForm<AddRequirementForm>({
        initialValues: {
            title: "",
            address: "",
            paymentStatus: "paid",
            description: "",
            salaryMin: 0,
            salaryMax: 0,
            workType: "full_time",
            gender: "MALE",
            priority: "highest",
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
            <div class="d-flex gap-2 align-center mb-1">
                <FormFields.BackButton />
                <h2>Add Requirement</h2>
            </div>
            <Form onSubmit={handleSubmit}>
                <div class="form">
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

                

                <Field name="workType" validate={[required("Work type is required")]}>
                    {(field, props) => (
                        <FormFields.Select
                            {...props}
                            id="requirement-work-type-input"
                            label="Work Type"
                            value={field.value}
                            options={[
                                { value: "part_time", label: "Part Time" },
                                { value: "full_time", label: "Full Time" },
                                { value: "remote", label: "Remote" },
                            ]}
                            error={field.error}
                        />
                    )}
                </Field>

                <Field type="number" name="salaryMin" validate={[required("Minimum salary is required")]}>
                    {(field, props) => (
                        <FormFields.Input
                            {...props}
                            id="requirement-salary-min-input"
                            label="Salary Minimum"
                            type="number"
                            value={field.value}
                            placeholder="1000"
                            error={field.error}
                        />
                    )}
                </Field>

                <Field type="number" name="salaryMax" validate={[required("Maximum salary is required")]}>
                    {(field, props) => (
                        <FormFields.Input
                            {...props}
                            id="requirement-salary-max-input"
                            label="Salary Maximum"
                            type="number"
                            value={field.value}
                            placeholder="2000"
                            error={field.error}
                        />
                    )}
                </Field>

                <Field name="gender" validate={[required("Gender is required")]}>
                    {(field, props) => (
                        <FormFields.Select
                            {...props}
                            id="requirement-gender-input"
                            label="Gender"
                            value={field.value}
                            options={RequirementGenderTypes.map((g) => ({ value: g.toUpperCase(), label: g.toLocaleUpperCase() }))}
                            error={field.error}
                        />
                    )}
                </Field>

                <Field name="priority" validate={[required("Priority is required")]}>
                    {(field, props) => (
                        <FormFields.Select
                            {...props}
                            options={RequirementPriorityTypes.map((p, ind) => ({ value: p, label: p.toLocaleUpperCase() + "-" + (5 - ind) }))}
                            error={field.error}
                            {...props}
                            id="requirement-priority-input"
                            label="Priority"
                            value={field.value}
                        />
                    )}
                </Field>

                <Field
                    name="description"
                    validate={[
                        required("Description is required"),
                    ]}
                >
                    {(field, props) => (
                        <div class="quill-editor-description">
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
                </div>

                <FormFields.Button
                    type="submit"
                    label={addRequirementMutation.isPending ? "Adding..." : "Add Requirement"}
                    variant="primary"
                />
            </Form>
        </div>
    );
};

export default AddRequirement;