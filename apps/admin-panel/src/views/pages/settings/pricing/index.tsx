import { useMutation, useQuery } from "@tanstack/solid-query";
import { packagesApis } from "@apis/packages";
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
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { FormFields } from "@components/form";
import Table from "@components/table";
import Loader from "@components/Loader";
import { packageColumns, type PricingPlan } from "../columns";
import { Modal } from "@components/modal";
import { useModal } from "@helpers/contexts/Modal";
import { QUERY_KEYS } from "@utils/constants";
import { queryClient } from "@helpers/axios";

const PricingPage = () => {
  const modalContext = useModal();
  const [selectedRoleId, setSelectedRoleId] = createSignal<number | null>(null);

  const [pagination, setPagination] = createSignal({ pageIndex: 1, limit: 10 });
  const [search, setSearch] = createSignal("");

  // RxJS Subject for search input
  const searchSubject = new Subject<string>();

  // RxJS subscription for debounced search
  let searchSubscription: any;

  onMount(() => {
    searchSubscription = searchSubject
      .pipe(debounceTime(300))
      .subscribe((value) => {
        startTransition(() => {
          setSearch(value);
          setPagination((p) => ({ ...p, pageIndex: 1 }));
        });
      });
  });

  onCleanup(() => {
    searchSubscription?.unsubscribe();
  });

  const pricingQuery = useQuery(() => ({
    queryKey: [
      QUERY_KEYS.PACKAGES.READ,
      pagination().pageIndex,
      pagination().limit,
      search(),
    ],
    queryFn: () =>
      packagesApis.getAll({
        page: pagination().pageIndex,
        limit: pagination().limit,
        search: search(),
      }),
    suspense: false,
    keepPreviousData: true,
  }));

  const deletePackageMutation = useMutation(() => ({
    mutationFn: (id: number) => packagesApis.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PACKAGES.READ] });
      modalContext.close();
    },
  }));

  function handleSearchInput(e: Event) {
    e.preventDefault();
    const value = (e.target as HTMLInputElement).value;
    searchSubject.next(value);
  }

  const tableData = createMemo(() => pricingQuery.data?.data ?? []);
  const totalPlans = createMemo(() => pricingQuery.data?.totalCount ?? 0);

  function handleTablePageChange(pageIndex: number, pageSize: number) {
    setPagination({ pageIndex, limit: pageSize });
  }

  return (
    <div class="pricing-list-page">
      <Modal.Delete
        open={modalContext.isOpen()}
        title="Delete Item"
        message="Are you sure you want to delete this item?"
        onClose={() => modalContext.close()}
        onConfirm={() => {
          if (selectedRoleId()) {
            deletePackageMutation.mutate(selectedRoleId()!);
          }
        }}
      />
      <div class="card">
        <div class="d-flex justify-between items-center ">
          <div class="d-flex align-center gap-1">
            <h3>Plans</h3>
            <FormFields.CircleButton
              variant="primary"
              href="/settings/pricing/add-package"
            />
          </div>
          <FormFields.Input
            type="search"
            placeholder="Search plans..."
            value={search()}
            onInput={handleSearchInput}
            disabled={pricingQuery.isFetching && !pricingQuery.isLoading}
          />
        </div>

        <div>
          {pricingQuery.isFetching && !pricingQuery.isLoading && <Loader />}

          <Switch>
            <Match when={pricingQuery.isLoading}>
              <div>Loading plans...</div>
            </Match>
            <Match when={pricingQuery.isError}>
              <div>
                Error loading plans: {pricingQuery.error?.message}
              </div>
            </Match>
            <Match when={!pricingQuery.isLoading && !pricingQuery.isError}>
              <Suspense fallback={<Loader />}>
                <Table<PricingPlan>
                  columns={packageColumns(setSelectedRoleId, modalContext)}
                  data={tableData()}
                  total_rms={totalPlans()}
                  itemsPerPage={pagination().limit}
                  pageNumber={pagination().pageIndex}
                  onPageChange={handleTablePageChange}
                />
              </Suspense>
            </Match>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
