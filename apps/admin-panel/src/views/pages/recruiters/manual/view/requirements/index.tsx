import { useParams } from "@solidjs/router";
import { manualRecruitersApis } from "@apis/manual_recruiters";
import { useQuery } from "@tanstack/solid-query";
import { Show } from "solid-js";
import { getDateTime } from "@utils";
import { FormFields } from "@components/form";
import { QUERY_KEYS } from "@utils/constants";
import RequirementTable from "./RequirementTable";

const ManualRecruiterDetails = (props: { data: any }) => {
    const { data } = props;
    return (
        <div
            style={{
                display: "grid",
                "grid-template-columns": "1fr 2fr",
                gap: "1rem",
                "align-items": "center",
            }}
            class="card"
        >
            <div class="fw-600">Name</div>
            <div>{data.name || "-"}</div>

            <div class="fw-600">Email</div>
            <div>{data.email || "-"}</div>

            <div class="fw-600">Description</div>
            <div>{data.description || "-"}</div>

            <div class="fw-600">Address</div>
            <div>{data.address || "-"}</div>

            <div class="fw-600">Created At</div>
            <div>{getDateTime(data.createdAt) || "-"}</div>

            <div class="fw-600">Phones</div>
            <div>
                <Show when={data.phones?.length}>
                    <ul style={{ margin: 0, padding: 0, "list-style": "none" }}>
                        {data.phones.map((p: any) => (
                            <li>
                                <span class="fw-600">{p.phoneType}:</span> {p.phone}
                            </li>
                        ))}
                    </ul>
                </Show>
                <Show when={!data.phones?.length}>-</Show>
            </div>
        </div>
    );
};

const ManualRecruiterView = () => {
    const params = useParams();
    const companyId = (): number => +params.id;

    const manualRecruiterQuery = useQuery(() => ({
        queryKey: [QUERY_KEYS.MANUAL_RECRUITER.ONE],
        queryFn: () => manualRecruitersApis.getById(companyId()),
        enabled: !!companyId(),
        staleTime: 1000 * 60 * 5,
    }));

    return (
        <div>
            <div class="d-flex align-center gap-2 card p-3">
                <FormFields.BackButton />
                <h3>Manual Recruiter Details</h3>
            </div>
            <Show when={manualRecruiterQuery.isLoading}>
                <div>Loading...</div>
            </Show>
            <Show when={manualRecruiterQuery.error}>
                <div>Error fetching recruiter details.</div>
            </Show>
            <Show when={manualRecruiterQuery.data}>
                <ManualRecruiterDetails data={manualRecruiterQuery.data} />
            </Show>

            <RequirementTable id={companyId()} />
        </div>
    );
};

export default ManualRecruiterView

