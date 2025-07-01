import { useNavigate } from "@solidjs/router";
import { useMutation } from "@tanstack/solid-query";
import { queryClient } from "@helpers/axios";
import { QUERY_KEYS, TransactionType } from "@utils/constants";
import { FormFields } from "@components/form";
import {
    createForm,
    required,
    type SubmitHandler,
} from "@modular-forms/solid";
import { financialTransactionsApis } from "@apis/finanacial_transactions";

// import "./styles.css";

// ** CSS

type AddFinanceForm = {
    amount: number;
    reason: string;
    transactionDate: string;
    type: "income" | "expense";
};

const AddFinance = () => {
    const navigate = useNavigate();

    const [_form, { Form, Field }] = createForm<AddFinanceForm>({
        initialValues: {
            amount: 0,
            reason: "",
            transactionDate: "",
            type: "expense",
        },
    });

    const addFinanceMutation = useMutation<any, unknown, AddFinanceForm, unknown>(
        () => ({
            mutationFn: (body: AddFinanceForm) => financialTransactionsApis.create(body),
            onSuccess: (data) => {
                if (data && data.message) {
                    queryClient.invalidateQueries({
                        queryKey: [QUERY_KEYS.FINANCES.READ],
                    });
                    return navigate(-1);
                }
            },
        }),
    );

    const handleSubmit: SubmitHandler<AddFinanceForm> = async (values) => {
        values.transactionDate = values.transactionDate + ":00.000Z"
        await addFinanceMutation.mutateAsync(values);
    };

    return (
        <div class="add-finance-page card">
            <div>
                <div class="d-flex mb-1">
                    <FormFields.BackButton />
                    <h2>Add Finance</h2>
                </div>
                <Form onSubmit={handleSubmit}>
                    <Field type="number" name="amount" validate={[
                        required("Amount is required"),
                        (value: number | undefined) => {
                            if (value === undefined || value <= 0) return "Enter a valid amount";
                            return "";
                        }
                    ]}>
                        {(field, props) => (
                            <FormFields.Input
                                {...props}
                                id="finance-amount-input"
                                label="Amount"
                                type="number"
                                value={field.value || 0}
                                placeholder="Enter amount"
                                error={field.error}
                                min={1}
                            />
                        )}
                    </Field>
                    <Field name="reason" validate={[required("Reason is required")]}>
                        {(field, props) => (
                            <FormFields.Input
                                {...props}
                                id="finance-reason-input"
                                label="Reason"
                                type="text"
                                value={field.value}
                                placeholder="E.g. Office Rent"
                                error={field.error}
                            />
                        )}
                    </Field>
                    <Field name="transactionDate" validate={[required("Transaction date is required")]}>
                        {(field, props) => (
                            <FormFields.Input
                                {...props}
                                id="finance-date-input"
                                label="Transaction Date"
                                type="datetime-local"
                                value={field.value}
                                error={field.error}
                            />
                        )}
                    </Field>
                    <Field name="type" validate={[required("Type is required")]}>
                        {(field, props) => (
                            <FormFields.Select
                                {...props}
                                id="transaction-status"
                                label="Transaction Status"
                                value={field.value}
                                options={TransactionType.map((type) => ({ label: type.toUpperCase(), value: type }))}
                                error={field.error}

                            />
                        )}
                    </Field>
                    <FormFields.Button
                        type="submit"
                        label={addFinanceMutation.isPending ? "Adding..." : "Add Finance"}
                        variant="primary"
                    />
                </Form>
            </div>
        </div>
    );
};

export default AddFinance;