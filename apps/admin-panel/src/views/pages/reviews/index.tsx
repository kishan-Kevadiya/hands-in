import { createSignal, createMemo, onCleanup, onMount, Match, Switch, type Component } from "solid-js";
import { Subject, debounceTime } from "rxjs";

import { useQuery } from "@tanstack/solid-query";
import { createColumnHelper } from "@tanstack/solid-table";

import Loader from "@components/Loader";
import { FormFields } from "@components/form";
import Table from "@components/table";

import { reviewsApis } from "@helpers/apis/reviews";

type Review = {
  id: number;
  userName: string;
  companyName: string;
  issue: string;
  description: string;
  rating: number;
  emailConsent: boolean;
  createdAt: Date;
}


const columnHelper = createColumnHelper<Review>();

type ReviewPageProps = {
  route: {
    label: string
  }
}

const ReviewPage: Component<ReviewPageProps> = (props: ReviewPageProps) => {

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

  const query = useQuery(() => ({
    queryKey: ["reviews", pagination().page, pagination().limit, search()],
    queryFn: () =>
      reviewsApis.getAll({
        page: pagination().page,
        limit: pagination().limit,
        search: search(),
      }),
    keepPreviousData: true,
  }));

  const tableData = createMemo(() => query.data?.data ?? []);
  const totalCount = createMemo(() => query.data?.totalCount ?? 0);

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

  const reviewColumns = () => [
    columnHelper.accessor((row: any) => row.userName, {
      id: "userName",
      header: "User",
      cell: (info) =>  {
        const { row } = info;

        if (row.original.userName && row.original.userName.length > 1) {
          return <span class="fw-600">{row.original.userName}</span>;
        }

        return '--'
      }
    }),
     columnHelper.accessor((row: any) => row.userName, {
      id: "companyName",
      header: "Company",
      cell: (info) =>  {
        const { row } = info;

        if (row.original.companyName) {
          return <span class="fw-600">{row.original.companyName}</span>;
        }

        return '--'
      }
    }),
    columnHelper.accessor((row: any) => row.issue, {
      id: "issue",
      header: "Issue",
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    columnHelper.accessor((row: any) => row.description, {
      id: "description",
      header: "Description",
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    columnHelper.accessor((row: any) => row.rating, {
      id: "rating",
      header: "Rating",
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    columnHelper.accessor((row: any) => row.createdAt, {
      id: "createdAt",
      header: "Created At",
      cell: (info) => <span>{new Date(info.getValue()).toLocaleString()}</span>,
    }),
  ];

  return (
    <>
      <div class="card">

        <div class="d-flex justify-between align-items-center">
          <h3>{props.route.label}</h3>

          <FormFields.Input
            type="search"
            placeholder="Search feedbacks..."
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
            <div>Error loading reviews.</div>
          </Match>
          <Match when={!query.isLoading && !query.isError}>
            <Table
              columns={reviewColumns()}
              data={tableData()}
              total_rms={totalCount()}
              itemsPerPage={pagination().limit}
              pageNumber={pagination().page}
              onPageChange={handleTablePageChange}
            />
          </Match>
        </Switch>
      </div>

    </>
  );
};

export default ReviewPage;
