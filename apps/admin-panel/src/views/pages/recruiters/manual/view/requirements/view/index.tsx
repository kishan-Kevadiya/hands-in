import { useParams } from "@solidjs/router";
import { QUERY_KEYS } from "@utils/constants";
import { useQuery } from "@tanstack/solid-query";
import type { Component } from "solid-js";
import { manualRecruitersApis } from "@apis/manual_recruiters";
import { createMemo } from "solid-js";
import { Match, Switch } from "solid-js";
import { FormFields } from "@components/form";
import ResumeTable from "./ResumeTable";

type Requirement = {
    id: number;
    title: string;
    address: string;
    paymentStatus: string;
    createdAt: string;
    updatedAt: string;
};

const getDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString();
};

const RequirementDetails: Component<{ requirement: Requirement }> = (props) => {
    const { requirement } = props;
    return (
        <div class="">
            <div class="d-flex gap-2 align-center mb-3 card">
                <FormFields.BackButton />
                <h3>Requirement Details</h3>
            </div>
            <div
                style={{
                    display: "grid",
                    "grid-template-columns": "1fr 2fr",
                    gap: "1rem",
                    "align-items": "center",
                }}
                class="card"
            >
                <div class="fw-600">ID</div>
                <div>{requirement.id}</div>

                <div class="fw-600">Title</div>
                <div>{requirement.title}</div>

                <div class="fw-600">Address</div>
                <div>{requirement.address}</div>

                <div class="fw-600">Payment Status</div>
                <div>{requirement.paymentStatus}</div>

                <div class="fw-600">Created At</div>
                <div>{getDateTime(requirement.createdAt)}</div>

                <div class="fw-600">Updated At</div>
                <div>{getDateTime(requirement.updatedAt)}</div>
            </div>
        </div>
    );
};

const RequirementView = () => {
    const params = useParams();
    const requirementId = createMemo(() => Number(params.id));

    const requirementQuery = useQuery(() => ({
        queryKey: [QUERY_KEYS.MANUAL_RECRUITER.REQ_ONE, requirementId()],
        queryFn: () => manualRecruitersApis.getRequirementById(requirementId()),
        enabled: !!requirementId(),
        staleTime: 1000 * 60 * 5,
    }));

    return (
        <div>
            <Switch>
                <Match when={requirementQuery.isLoading}>
                    <div>Loading...</div>
                </Match>
                <Match when={requirementQuery.error}>
                    <div>Error loading requirement.</div>
                </Match>
                <Match when={requirementQuery.data}>
                    <RequirementDetails requirement={requirementQuery.data} />
                </Match>
            </Switch>

            <ResumeTable requirementId={requirementId()} />
        </div>
    );
};

export default RequirementView;