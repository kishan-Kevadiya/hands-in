import { createSignal, createMemo, onCleanup, onMount, Match, Switch, Show } from "solid-js";
import { BehaviorSubject, Subject, debounceTime } from "rxjs";
import { Modal } from "@components/modal";
import Loader from "@components/Loader";
import { FormFields } from "@components/form";
import Table from "@components/table";
import { useModal } from "@helpers/contexts/Modal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/solid-query";
import { createColumnHelper } from "@tanstack/solid-table";

import { ACTIONS, QUERY_KEYS } from "@utils/constants";
import { financialTransactionsApis } from "@apis/finanacial_transactions";
import { formatRupee, getDateTime } from "@utils";
import { Badge } from "@components/badge";
import { useAuth } from "@helpers/contexts/Auth";
import { DeleteIcon } from "@icons/index";
import RevenueCards from "./RevenueCards";

export type Finances = {
    id: number;
    amount: string;
    type: string;
    reason: string;
    transactionDate: string;
    attachmentUrl: string | null;
    actions: any,
    createdBy: {
        name: string;
    };
};

const columnHelper = createColumnHelper<Finances>();



export default function Finances() {
    const modalContext = useModal();
    const { hasPermission } = useAuth();
    const selectedId$ = new BehaviorSubject<number | null>(null);
    const queryClient = useQueryClient();


    const [pagination, setPagination] = createSignal({ page: 1, limit: 10 });
    const [search, setSearch] = createSignal("");

    // Rxjs Subject for search input
    const searchSubject = new Subject<string>();
    let searchSubscription: any;

    onMount(() => {
        searchSubscription = searchSubject
            .pipe(debounceTime(300))
            .subscribe((value) => {
                setSearch(value);
                setPagination((prev) => ({ ...prev, page: 1 }));
            });
    });

    const deleteMutation = useMutation(() => ({
        mutationFn: (id: number) => financialTransactionsApis.removeTransaction(String(id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FINANCES.READ] });
            modalContext.close();
        },
    }));

    const query = useQuery(() => ({
        queryKey: [QUERY_KEYS.FINANCES.READ, pagination().page, pagination().limit, search()],
        queryFn: () =>
            financialTransactionsApis.getAll({
                page: pagination().page,
                limit: pagination().limit,
                search: search(),
            }),
        keepPreviousData: true,
    }));

    const tableData = createMemo(() => query.data?.data ?? []);
    const totalRms = createMemo(() => query.data?.totalCount ?? 0);

    onCleanup(() => {
        searchSubscription?.unsubscribe();
    });

    function handleSearchInput(event: InputEvent) {
        const value = (event.target as HTMLInputElement).value;
        searchSubject.next(value);
    }

    function handleTablePageChange(pageIndex: number, pageSize: number) {
        setPagination({ page: pageIndex, limit: pageSize });
    }

    const financeColumns = () => [
        columnHelper.accessor((row) => row.reason, {
            id: "reason",
            header: "Reason",
            cell: (info) => <span class="fw-800">{info.getValue()}</span>,
        }),
        columnHelper.accessor((row) => row.type, {
            id: "type",
            header: "Type",
            cell: (info) => {
                if (info.getValue() === "expense") {
                    return <Badge.Danger> Expense </Badge.Danger>
                }

                return <Badge.Success> Revenue </Badge.Success>
            },
        }),
        columnHelper.accessor((row) => row.amount, {
            id: "amount",
            header: "Amount",
            cell: (info) => {
                const type = info.row.original.type;
                const amount = +info.getValue();
                const color = type === "expense" ? "text-danger" : "text-success";
                return <span class={`fw-600 ${color}`}>{formatRupee(amount)}</span>;
            },
        }),
        columnHelper.accessor((row) => row.transactionDate, {
            id: "transactionDate",
            header: "Date",
            cell: (info) => <span>{getDateTime(info.getValue())}</span>,
        }),
        columnHelper.accessor((row) => row.createdBy.name, {
            id: "createdBy.name",
            header: "Created By",
            cell: (info) => <p class="font-italic"><strong>By </strong> {info.getValue()}</p>,
        }),
        columnHelper.accessor("actions", {
            id: "actions",
            header: "Actions",
            cell: (info) => {
                const row = info.row.original;
                return (
                    <Show when={hasPermission(ACTIONS.financialTransaction.delete)}>
                        <span
                            class="delete-icon"
                            onClick={() => {
                                selectedId$.next(row.id);
                                modalContext.open();
                            }}
                            style={{ cursor: "pointer" }}
                        >
                            <DeleteIcon />
                        </span>
                    </Show>
                );
            },
        },)
    ];

    return (
        <>
            <Modal.Delete
                open={modalContext.isOpen()}
                title="Delete Item"
                message="Are you sure you want to delete this item?"
                onClose={() => modalContext.close()}
                onConfirm={() => {
                    const id = selectedId$.getValue();
                    if (id) {
                        deleteMutation.mutate(id);
                    }
                }}
                isLoading={deleteMutation.isPending}
            />
            <RevenueCards />
            <div class="card">
                <div class="d-flex justify-between align-center ">
                    <div class="d-flex align-center">
                        <h3>Finances</h3>
                        <Show when={hasPermission(ACTIONS.adminRole.create)}>
                            <FormFields.CircleButton
                                variant="primary"
                                href="/finances/add"
                            />
                        </Show>
                    </div>

                    <FormFields.Input
                        type="search"
                        placeholder="Search finances..."
                        value={search()}
                        onInput={handleSearchInput}
                        disabled={query.isFetching && !query.isLoading}
                    />
                </div>

                <Switch>
                    <Match when={query.isLoading}>
                        <Loader />
                    </Match>
                    <Match when={query.isError}>
                        <div>Error loading financess.</div>
                    </Match>
                    <Match when={!query.isLoading && !query.isError}>
                        <Table<Finances>
                            columns={financeColumns()}
                            data={tableData()}
                            total_rms={totalRms()}
                            itemsPerPage={pagination().limit}
                            pageNumber={pagination().page}
                            onPageChange={handleTablePageChange}
                        />
                    </Match>
                </Switch>
            </div>
        </>
    );
}
