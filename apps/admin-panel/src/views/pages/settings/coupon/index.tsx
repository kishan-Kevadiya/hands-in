import { useQuery } from "@tanstack/solid-query";
import {
  createMemo,
  createSignal,
  Match,
  onCleanup,
  onMount,
  Show,
  startTransition,
  Suspense,
  Switch,
} from "solid-js";
import { useAuth } from "@helpers/contexts/Auth";
import { ACTIONS } from "@utils/constants";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { FormFields } from "@components/form";
import Table from "@components/table";
import Loader from "@components/Loader";
import { couponColumns, type Coupon } from "../columns";
import { discountsApis } from "@apis/coupons";
import { QUERY_KEYS } from "@utils/constants";

const CouponPage = () => {
  const { hasPermission } = useAuth();
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
      discountsApis.getAll({
        page: pagination().pageIndex,
        limit: pagination().limit,
        search: search(),
      }),
    suspense: false,
    keepPreviousData: true,
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
    <div class="pricing-list-page card">
      <div class="d-flex justify-between items-center">
        <div class="d-flex align-center gap-1">
          <h3>Coupons</h3>
          <Show when={hasPermission(ACTIONS.coupon.create)}>
            <FormFields.CircleButton
              variant="primary"
              href="/settings/coupons/add"
            />
          </Show>
        </div>
        <FormFields.Input
          type="search"
          placeholder="Search coupons..."
          value={search()}
          onInput={handleSearchInput}
          disabled={pricingQuery.isFetching && !pricingQuery.isLoading}
        />
      </div>

      <div>
        {pricingQuery.isFetching && !pricingQuery.isLoading && <Loader />}

        <Switch>
          <Match when={pricingQuery.isLoading}>
            <div>Loading coupons...</div>
          </Match>
          <Match when={pricingQuery.isError}>
            <div>Error loading coupons: {pricingQuery.error?.message}</div>
          </Match>
          <Match when={!pricingQuery.isLoading && !pricingQuery.isError}>
            <Suspense fallback={<Loader />}>
              <Table<Coupon>
                columns={couponColumns}
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
  );
};

export default CouponPage;
