import { useParams } from "@solidjs/router";
import { useQuery } from "@tanstack/solid-query";
import { discountsApis } from "@apis/coupons";
import { QUERY_KEYS } from "@utils/constants";
import { Switch, Match } from "solid-js";
import { getDateTime } from "@utils";
import { FormFields } from "@components/form";

const ViewCoupon = () => {
  const { id } = useParams();

  const couponQuery = useQuery(() => ({
    queryKey: [QUERY_KEYS.COUPONS.ONE, id],
    queryFn: () => discountsApis.getById(Number(id)),
    enabled: !isNaN(Number(id)),
    retry: false
  }));

  return (
    <Switch>
      <Match when={couponQuery.isFetching}>
        <p>Loading...</p>
      </Match>
      <Match when={!couponQuery.isFetching && !couponQuery.data}>
        <div class="coupon-view-page">
          <div class="d-flex align-center gap-2 p-3 card">
            <FormFields.BackButton />
            <p>Coupon Not Found</p>
          </div>
         
        </div>
      </Match>
      <Match when={couponQuery.data}>
        <div class="coupon-view-page ">
          <div class="d-flex align-center gap-2 p-3 card">
            <FormFields.BackButton />
            <h2> {couponQuery.data.code}</h2>
          </div>
          <div class="card">
            <p>
              <strong>Description:</strong>
              <span class="text-light">{couponQuery.data.description}</span>
            </p>
            <p>
              <strong>Discount Value:</strong>
              <span class="text-light">
                {couponQuery.data.discountValue}
                {couponQuery.data.discountType === "percentage" ? "%" : ""}
              </span>
            </p>
            <p>
              <strong>Discount Type:</strong>
              <span class="text-light">{couponQuery.data.discountType}</span>
            </p>
            <p>
              <strong>Provider ID:</strong>
              <span class="text-light">{couponQuery.data.providerId}</span>
            </p>
            <p>
              <strong>Is Active:</strong>
              <span class="text-light">
                {couponQuery.data.isActive ? "Yes" : "No"}
              </span>
            </p>
            <p>
              <strong>Valid From:</strong>
              <span class="text-light">
                {getDateTime(couponQuery.data.validFrom, undefined, "utc")}
              </span>
            </p>
            <p>
              <strong>Valid Until:</strong>
              <span class="text-light">
                {getDateTime(couponQuery.data.validUntil, undefined, "utc")}
              </span>
            </p>
            <p>
              <strong>Max Redemptions:</strong>
              <span class="text-light">{couponQuery.data.maxRedemptions}</span>
            </p>
            <p>
              <strong>One Time Per User:</strong>
              <span class="text-light">
                {couponQuery.data.isOneTimePerUser ? "Yes" : "No"}
              </span>
            </p>
            <p>
              <strong>Created At:</strong>
              <span class="text-light">
                {getDateTime(couponQuery.data.createdAt)}
              </span>
            </p>
          </div>
        </div>
      </Match>
    </Switch>
  );
};

export default ViewCoupon;
