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
import { QUERY_KEYS } from "@utils/constants";
import { CustomDateRangePicker } from "@components/date-picker";
import type { PickerValue } from "@rnwonder/solid-date-picker";
import { createSignal } from "solid-js";

// Types
export type AddResumeForm = {
    resume: File | null;
    comment: string;
    commentDate: string;
};

const AddResume = () => {
    const { id } = useParams(); // requirementId
    const navigate = useNavigate();
    
      const [value, setDate] = createSignal<PickerValue>({
        label: '',
        value: {},
      });

    const [form, { Form, Field }] = createForm<AddResumeForm>({
        initialValues: {
            resume: null,
            comment: "",
            commentDate: "",
        },
    });

    const addResumeMutation = useMutation<any, unknown, FormData, unknown>(() => ({
        mutationFn: (formData: FormData) => manualRecruitersApis.addResume(+id, formData),
        onSuccess: (data) => {
            if (data && data.message) {
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.MANUAL_RECRUITER.REQ_RESUME_READ],
                });
                return navigate(-1);
            }
        },
    }));

    const handleSubmit: SubmitHandler<AddResumeForm> = async (values) => {
        const formData = new FormData();
        formData.append("resume", values.resume as Blob);
        formData.append("comment", values.comment);
        formData.append("commentDate", values.commentDate);
        formData.append("requirementId", id); // Backend should expect this

        await addResumeMutation.mutateAsync(formData);
    };

    return (
        <div class="add-resume-page card">
            <div>
                <div class="d-flex gap-2 align-center mb-1">
                    <FormFields.BackButton />
                    <h2>Add Resume</h2>
                </div>
                <Form onSubmit={handleSubmit}>
                    <Field name="resume" type="File" validate={[required("Resume is required")]}> 
                        {(field, props) => (
                            <FormFields.Input
                                {...props}
                                id="resume-upload"
                                label="Upload Resume (PDF)"
                                type="file"
                                accept="application/pdf"
                                onChange={(e) => setValue(form, "resume", e.currentTarget.files?.[0] || null)}
                                error={field.error}
                            />
                        )}
                    </Field>

                    <Field name="comment" validate={[required("Comment is required")]}> 
                        {(field, props) => (
                            <FormFields.Input
                                {...props}
                                id="resume-comment"
                                label="Comment"
                                type="text"
                                value={field.value}
                                placeholder="Good profile with React experience"
                                error={field.error}
                            />
                        )}
                    </Field>

                    <Field name="commentDate" validate={[required("Comment date is required")]}>
                        {(field, props) => (
                            <CustomDateRangePicker.SingleDatePicker
                                {...props}
                                id="comment-date"
                                placeholder="Comment Date"
                                label="Comment Date"
                                value={value}
                                onChange={e => {
                                    setValue(form, "commentDate", e.value.selected || "");
                                    setDate(e)
                                }}
                                error={field.error}
                            />
                        )}
                    </Field>

                    <FormFields.Button
                        type="submit"
                        label={addResumeMutation.isPending ? "Uploading..." : "Upload Resume"}
                        variant="primary"
                    />
                </Form>
            </div>
        </div>
    );
};

export default AddResume;
