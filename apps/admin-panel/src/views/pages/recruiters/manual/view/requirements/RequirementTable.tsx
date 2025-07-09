import { createSignal, createMemo, onMount, onCleanup, startTransition, Suspense, Match, Switch, Show } from "solid-js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/solid-query";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import Table from "@components/table";
import Loader from "@components/Loader";
import { FormFields } from "@components/form";
import { Modal } from "@components/modal";
import { useModal } from "@helpers/contexts/Modal";
import { getDateTime, PAGE_SIZE } from "@utils/index";
import { ACTIONS, QUERY_KEYS } from "@utils/constants";
import { manualRecruitersApis } from "@apis/manual_recruiters";
import { createColumnHelper } from "@tanstack/solid-table";
import { A, useParams } from "@solidjs/router";
import { useAuth } from "@helpers/contexts/Auth";
import { DeleteIcon } from "@icons/index";

type Requirement = {
    id: number;
    title: string;
    adresss: string;
    paymentStatus: string;
    createdAt: string;
    actions: string
};

const recruiterColumnHelper = createColumnHelper<Requirement>();

type RequirementTableProps = {
    id: number
}

const RequirementTable = (props: RequirementTableProps) => {
    const { hasPermission } = useAuth();
    const queryClient = useQueryClient();

    const columns = [
        recruiterColumnHelper.accessor("title", {
            header: "Title",
            cell: info => {
                return <A href={`/manual-recruiter/requirement/${info.row.original.id}/view`} class="fw-800">{info.getValue()}</A>
            }
        }),
        recruiterColumnHelper.accessor("adresss", {
            header: "Address",
        }),
        recruiterColumnHelper.accessor("paymentStatus", {
            header: "Payment Status",
            cell: info => {
                const value = info.getValue();

                const updateRecruiterMutatin = useMutation(() => ({
                    mutationFn: (status: string) => manualRecruitersApis.updateRequirement(info.row.original.id, status),
                }));

                const handleChange = async (e: Event) => {
                    const newValue = (e.target as HTMLSelectElement).value;
                    await updateRecruiterMutatin.mutateAsync(newValue)
                };

                return (
                    <div class="d-flex align-center gap-1">
                        <FormFields.Select id="update-status" name="" value={value} options={[
                            { value: "paid", label: "Paid" },
                            { value: "unpaid", label: "Unpaid" },
                        ]} onChange={handleChange} />

                    </div>
                );
            }
        }),
        recruiterColumnHelper.accessor("createdAt", {
            header: "Created At",
            cell: info => getDateTime(info.getValue()),
        }),
        recruiterColumnHelper.accessor("actions", {
            header: "Actions",
            cell: (info) => {
                const { id } = info.row.original;
                return <>
                    <Show when={hasPermission(ACTIONS.manualRecruiter.delete)} >
                        <span
                            class="delete-icon"
                            onClick={() => {
                                setDeleteRequirementId(id);
                                modalContext.open();
                            }}
                            style={{ cursor: "pointer" }}
                        >
                            <DeleteIcon />
                        </span>
                    </Show>
                </>
            }
        }),
    ];

    const { id } = useParams();
    const modalContext = useModal();
    const [pagination, setPagination] = createSignal({ pageIndex: 1, limit: PAGE_SIZE });
    const [deleteRequirementId, setDeleteRequirementId] = createSignal<number | null>(null);
    const [search, setSearch] = createSignal("");
    const searchSubject = new Subject<string>();
    let searchSubscription: any;

    onMount(() => {
        searchSubscription = searchSubject.pipe(debounceTime(300)).subscribe((value) => {
            startTransition(() => {
                setSearch(value);
                setPagination((p) => ({ ...p, pageIndex: 1 }));
            });
        });
    });

    onCleanup(() => {
        searchSubscription?.unsubscribe();
    });

    function handleSearchInput(e: Event) {
        e.preventDefault();
        const value = (e.target as HTMLInputElement).value;
        searchSubject.next(value);
    }

    const query = useQuery(() => ({
        queryKey: [QUERY_KEYS.MANUAL_RECRUITER.REQ_READ, pagination().pageIndex, pagination().limit, search()],
        queryFn: () =>
            manualRecruitersApis.getRequirementsByRecruiterId(
                props.id,
                {
                    page: pagination().pageIndex,
                    limit: pagination().limit,
                    search: search(),
                }),
        keepPreviousData: true,
        refetchOnWindowFocus: true,
    }));

    const deleteRequirement = useMutation(() => (
        {
            mutationFn: (id: number) => manualRecruitersApis.deleteRequirement(id),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MANUAL_RECRUITER.REQ_READ] });
                modalContext.close();
                setDeleteRequirementId(null);
            },
        }
    ));

    const tableData = createMemo(() => Array.isArray(query.data?.data) ? query.data.data : []);
    const totalRequirements = createMemo(() => query.data?.totalCount ?? 0);

    function handleTablePageChange(pageIndex: number, pageSize: number) {
        setPagination({ pageIndex, limit: pageSize });
    }

    return (
        <>
            <Modal.Delete
                open={modalContext.isOpen()}
                title="Delete Requirement"
                message="Are you sure you want to delete this requirement?"
                onClose={() => {
                    modalContext.close();
                    setDeleteRequirementId(null);
                }}
                onConfirm={() => {
                    if (deleteRequirementId()) {
                        deleteRequirement.mutate(deleteRequirementId()!);
                    }
                }}
                isLoading={deleteRequirement.isPending}
            />

            <div class="admin-requirement-list card">
                <div class="d-flex align-center justify-between">
                    <div class="d-flex align-center gap-1">
                        <h3>Requirements</h3>
                        <FormFields.CircleButton variant="primary" href={`/manual-recruiter/requirement/${id}/add`} />
                    </div>
                    <div class="d-flex align-center" style={{ gap: "12px" }}>
                        <FormFields.Input
                            type="search"
                            placeholder="Search requirement..."
                            value={search()}
                            onInput={handleSearchInput}
                            disabled={query.isFetching && !query.isLoading}
                        />
                    </div>
                </div>
                <div>
                    {query.isFetching && !query.isLoading && <Loader />}

                    <Switch>
                        <Match when={query.isLoading}>
                            <Loader />
                        </Match>
                        <Match when={query.isError}>
                            <div>Error loading requirements.</div>
                        </Match>
                        <Match when={!query.isLoading && !query.isError}>
                            <Suspense fallback={<Loader />}>
                                <Table<Requirement>
                                    columns={columns}
                                    data={tableData()}
                                    total_rms={totalRequirements()}
                                    itemsPerPage={pagination().limit}
                                    pageNumber={pagination().pageIndex}
                                    onPageChange={handleTablePageChange}
                                />
                            </Suspense>
                        </Match>
                    </Switch>
                </div>
            </div>
        </>
    );
};

export default RequirementTable;
