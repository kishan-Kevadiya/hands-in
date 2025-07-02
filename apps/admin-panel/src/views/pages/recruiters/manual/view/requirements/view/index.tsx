import { useParams } from "@solidjs/router";
import { QUERY_KEYS } from "@utils/constants";
import { useQuery } from "@tanstack/solid-query";
import type { Component } from "solid-js";
import { manualRecruitersApis } from "@apis/manual_recruiters";
import { createMemo } from "solid-js";
import { Match, Switch } from "solid-js";
import { FormFields } from "@components/form";
import { Badge } from "@components/badge";

import ResumeTable from "./ResumeTable";

import "../../../styles.css";

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
        <section class="requirement-detail-card" aria-labelledby="requirement-details-heading">
            <header class="d-flex gap-2 align-center mb-3 card">
                <FormFields.BackButton />
                <h3 id="requirement-details-heading">Requirement Details</h3>
            </header>
            <dl
                style={{
                    display: "grid",
                    "grid-template-columns": "1fr 2fr",
                    gap: "1rem",
                    "align-items": "center",
                }}
                class="card"
            >
                <dt class="fw-600">Title</dt>
                <dd>{requirement.title}</dd>

                <dt class="fw-600">Address</dt>
                <dd>{requirement.address}</dd>

                <dt class="fw-600">Payment Status</dt>
                <dd>
                    {requirement.paymentStatus === "paid" ? <Badge.Success>Paid</Badge.Success> : <Badge.Danger> Unpaid</Badge.Danger>}
                </dd>

                <dt class="fw-600">Created At</dt>
                <dd>{getDateTime(requirement.createdAt)}</dd>

                <dt class="fw-600">Updated At</dt>
                <dd>{getDateTime(requirement.updatedAt)}</dd>
            </dl>
        </section>
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
        <div class="requirements-view-page">
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