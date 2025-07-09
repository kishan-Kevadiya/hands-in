import { useMutation, useQuery } from "@tanstack/solid-query";
import { QUERY_KEYS } from "@utils/constants";
import { manualRecruitersApis } from "@apis/manual_recruiters"; 
import { recruiterColumns, type Recruiter } from "../columns"; 
import { FormFields } from "@components/form";
import Table from "@components/table";
import Loader from "@components/Loader";
import { Modal } from "@components/modal";
import { useModal } from "@helpers/contexts/Modal";
import { Subject, from } from "rxjs";
import { debounceTime, switchMap } from "rxjs/operators";
import { PAGE_SIZE } from "@utils/index";
import {
    createMemo,
    createSignal,
    Match,
    onCleanup,
    onMount,
    startTransition,
    Suspense,
    Switch,
} from "solid-js";
import { queryClient } from "@helpers/axios";

const ManualRecruiters = () => {
    const modalContext = useModal();
    const [selectedRecruiterId, setSelectedRecruiterId] = createSignal<number | null>(null);

    // Pagination and search state
    const [pagination, setPagination] = createSignal({
        pageIndex: 1,
        limit: PAGE_SIZE,
    });
    const [search, setSearch] = createSignal("");

    // RxJS Subject for search input
    const searchSubject = new Subject<string>();
    let searchSubscription: any;

    // RxJS Subjects for recruiter deletion
    const deleteRecruiterSubject = new Subject<number>();
    let deleteRecruiterSubscription: any;
    const deleteActionSubject = new Subject<number>();
    let deleteActionSubscription: any;

    onMount(() => {
        searchSubscription = searchSubject
            .pipe(debounceTime(300))
            .subscribe((value) => {
                startTransition(() => {
                    setSearch(value);
                    setPagination((p) => ({ ...p, pageIndex: 1 }));
                });
            });

        deleteRecruiterSubscription = deleteRecruiterSubject
            .pipe(
                switchMap((recruiterId) =>
                    from(manualRecruitersApis.remove(recruiterId))
                )
            )
            .subscribe(() => {
                queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MANUAL_RECRUITER.READ] });
                modalContext.close();
                setSelectedRecruiterId(null);
            });

        deleteActionSubscription = deleteActionSubject.subscribe((id) => {
            setSelectedRecruiterId(id);
            modalContext.open();
        });
    });

    onCleanup(() => {
        searchSubscription?.unsubscribe();
        deleteRecruiterSubscription?.unsubscribe();
        deleteActionSubscription?.unsubscribe();
    });

    // Query for recruiters with pagination and search
    const query = useQuery(() => ({
        queryKey: [
            QUERY_KEYS.MANUAL_RECRUITER.READ,
            pagination().pageIndex,
            pagination().limit,
            search(),
        ],
        queryFn: () =>
            manualRecruitersApis.getAll({
                page: pagination().pageIndex,
                limit: pagination().limit,
                search: search(),
            }),
        suspense: false,
        keepPreviousData: true,
        refetchOnWindowFocus: true,
    }));

function handleSearchInput(e: Event) {
    e.preventDefault();
    const value = (e.target as HTMLInputElement).value;
    searchSubject.next(value);
}

// Table data and total count
const tableData = createMemo(() =>
    Array.isArray(query.data?.data) ? query.data.data : [],
);
const totalRecruiters = createMemo(() => query.data?.totalCount ?? 0);

function handleTablePageChange(pageIndex: number, pageSize: number) {
    setPagination({ pageIndex, limit: pageSize });
}

return (
    <>
        <Modal.Delete
            open={modalContext.isOpen()}
            title="Delete Recruiter"
            message="Are you sure you want to delete this recruiter?"
            onClose={() => {
                modalContext.close();
                setSelectedRecruiterId(null);
            }}
            onConfirm={() => {
                if (selectedRecruiterId()) {
                    deleteRecruiterSubject.next(selectedRecruiterId()!);
                }
            }}
        />

        <div class="admin-recruiter-list card">
            <div class="d-flex align-center justify-between">
                <div class="d-flex align-center gap-1">
                    <h3>Manual Recruiters</h3>
                    <FormFields.CircleButton
                        variant="primary"
                        href="/manual-recruiter/add"
                    />
                </div>
                <div class="d-flex align-center" style={{ gap: "12px" }}>
                    <FormFields.Input
                        type="search"
                        placeholder="Search recruiter..."
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
                        <div>Error loading recruiters.</div>
                    </Match>
                    <Match when={!query.isLoading && !query.isError}>
                        <Suspense fallback={<Loader />}>
                            <Table<Recruiter>
                                columns={recruiterColumns(deleteActionSubject)}
                                data={tableData()}
                                total_rms={totalRecruiters()}
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

export default ManualRecruiters;