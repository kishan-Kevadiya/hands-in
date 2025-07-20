import { useParams } from "@solidjs/router";
import { manualRecruitersApis } from "@apis/manual_recruiters";
import { useQuery } from "@tanstack/solid-query";
import { Show } from "solid-js";
import { getDateTime } from "@utils";
import { FormFields } from "@components/form";
import { QUERY_KEYS } from "@utils/constants";
import RequirementTable from "./requirements/RequirementTable";

import "../styles.css";
import { renderBadgeForPriority } from "../../columns";


const ManualRecruiterDetails = (props: { data: any }) => {
    const { data } = props;
    return (
        <div class="details card">
            <div class="grid-item">
                <small>Name</small>
                <p>{data.name}</p>
            </div>

             <div class="grid-item">
                <small>Email</small>
                <p>{data.email || "--"}</p>
            </div>
            
             {/* -- Description -- */}
            <div class="grid-item">
                <small>Description</small>
                <p>{data.description || "-"}</p>
            </div>

            {/* -- Address -- */}
            <div class="grid-item">
                <small>Address</small>
                <p>{data.address || "-"}</p>
            </div>

             <div class="grid-item">
                <small>Priority</small>
                <p>{renderBadgeForPriority[data.priority]}</p>
            </div>

            {/* -- Created At -- */}
            <div class="grid-item">
                <small>Created At</small>
                <p>{getDateTime(data.createdAt) || "-"}</p>
            </div>

            {/* -- Phones -- */}
            <div class="grid-item">
                <small>Phones</small>
                {/* Using a div here instead of h2 for better list formatting */}
                <div>
                    <Show when={data.phones?.length}>
                        <ul style={{ margin: 0, padding: 0, "list-style": "none" }}>
                            {data.phones.map((p: any) => (
                                <li> 
                                    <p><small>{p.phoneType.toUpperCase()}:</small> {p.phone}</p>
                                </li>
                            ))}
                        </ul>
                    </Show>
                    <Show when={!data.phones?.length}>-</Show>
                </div>
            </div>
        </div>
    );
};

const ManualRecruiterView = () => {
    const params = useParams();
    const companyId = (): number => +params.id;

    const companyQuery = useQuery(() => ({
        queryKey: [QUERY_KEYS.MANUAL_RECRUITER.ONE],
        queryFn: () => manualRecruitersApis.getById(companyId()),
        enabled: !!companyId(),
        staleTime: 1000 * 60 * 5,
    }));

    return (
        <div class="manual-recruiter-detail-page">
            <div class="d-flex align-center gap-2 card p-3">
                <FormFields.BackButton />
                <h3>Manual Recruiter Details</h3>
            </div>
            <Show when={companyQuery.isLoading}>
                <div>Loading...</div>
            </Show>
            <Show when={companyQuery.error}>
                <div>Error fetching recruiter details.</div>
            </Show>
            <Show when={companyQuery.data}>
                <ManualRecruiterDetails data={companyQuery.data} />
            </Show>

            <RequirementTable id={companyId()} />
        </div>
    );
};

export default ManualRecruiterView

