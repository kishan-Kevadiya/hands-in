import { useParams } from "@solidjs/router";
import { QUERY_KEYS } from "@utils/constants";
import { useQuery } from "@tanstack/solid-query";
import { packagesApis } from "@apis/packages";
import { createEffect, Match, Switch } from "solid-js";
import { getDateTime, formatRupee } from "@utils";
import { FormFields } from "@components/form";

import "./styles.css";

const ViewPackage = () => {
  const { id } = useParams();

  const packageQuery = useQuery(() => ({
    queryKey: [QUERY_KEYS.PACKAGES.ONE, id],
    queryFn: () => packagesApis.getById(Number(id)),
    enabled: !isNaN(Number(id)),
  }));

  createEffect(() => {
    console.log(packageQuery);
  });

  return (
    <Switch>
      <Match when={!packageQuery.data}>
        <p>Loading...</p>
      </Match>
      <Match when={packageQuery.data}>
        <div class="package-view-page">
          <div class="d-flex align-center gap-2 card p-3">
            <FormFields.BackButton />
            <h2>{packageQuery.data.name}</h2>
          </div>

          <div class="card">
            <p>
              <strong>Price:</strong>
              <span class="text-light">
                {formatRupee(packageQuery.data.price)}
              </span>
            </p>
            <p>
              <strong>Duration:</strong>
              <span class="text-light">{packageQuery.data.duration}</span>
            </p>
            <p>
              <strong>Payment Provider:</strong>{" "}
              <span class="text-light">
                {packageQuery.data.paymentProvider}
              </span>
            </p>
            <p>
              <strong>Payment Plan ID:</strong>
              <span class="text-light">{packageQuery.data.paymentPlanId}</span>
            </p>
            <p>
              <strong>Is Active:</strong>{" "}
              <span class="text-light">
                {packageQuery.data.isActive ? "Yes" : "No"}
              </span>
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              <span class="text-light">
                {getDateTime(packageQuery.data.createdAt)}
              </span>
            </p>
            <div style="margin-top:1em;">
              <strong>Description:</strong>
              <div
                style={{
                  padding: "1rem",
                  border: "1px solid var(--border-color)",
                  "border-radius": "1rem",
                  "box-sizing": "border-box",
                }}
                innerHTML={packageQuery.data.description}
              />
            </div>
          </div>
        </div>
      </Match>
    </Switch>
  );
};

export default ViewPackage;
