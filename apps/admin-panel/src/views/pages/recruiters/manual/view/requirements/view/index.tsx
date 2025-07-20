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
    salaryMax: number;
    salaryMin: number;
    workType: string;
    gender: string;
    priority: string;
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
            <dl class="card ">
                <div class="grid-item">
                    <small class="fw-600">Title</small>
                    <p>{requirement.title}</p>
                </div>

                <div class="grid-item">
                    <small class="fw-600">Address</small>
                    <p>{requirement.address}</p>
                </div>

                <div class="grid-item">
                    <small class="fw-600">Payment Status</small>
                    <p>
                        {requirement.paymentStatus === "paid" ? <Badge.Success>Paid</Badge.Success> : <Badge.Danger> Unpaid</Badge.Danger>}
                    </p>
                </div>

                {/* -- Salary Range -- */}
                <div class="grid-item">
                    <small>Salary Range (LPA)</small>
                    <p>{requirement.salaryMin && requirement.salaryMax ? `${requirement.salaryMin / 100000} - ${requirement.salaryMax / 100000}` : "-"}</p>
                </div>

                {/* -- Priority -- */}
                <div class="grid-item">
                    <small>Priority</small>
                    <p>{requirement.priority || "-"}</p>
                </div>

                {/* -- Gender -- */}
                <div class="grid-item">
                    <small>Gender</small>
                    <p>{requirement.gender || "-"}</p>
                </div>

                {/* -- Work Type -- */}
                <div class="grid-item">
                    <small>Work Type</small>
                    <p>{requirement.workType || "-"}</p>
                </div>

                {/* -- Payment Status -- */}
                <div class="grid-item">
                    <small>Payment Status</small>
                    <p>{requirement.paymentStatus || "-"}</p>
                </div>

                <div class="grid-item">
                    <small class="fw-600">Updated At</small>
                    <p>{getDateTime(requirement.updatedAt)}</p>
                </div>

                <div class="grid-item">
                    <small class="fw-600">Created At</small>
                    <p>{getDateTime(requirement.createdAt)}</p>
                </div>
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