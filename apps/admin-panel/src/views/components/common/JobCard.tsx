import { getDateTime, timeAgo } from "@utils/index";
import type { Component } from "solid-js";
import { createSignal, Index, Show } from "solid-js";

import { Badge } from "../badge";

import "./styles.css";

type JobData = {
  id: string;
  title: string;
  description: string;
  location: string;
  createdAt: string;
  jobType?: string;
  vacancy?: string;
  minimumSalary?: number;
  maximumSalary?: number;
  salaryPeriod?: string;
  incentiveAmount?: number | null;
  incentivePeriod?: string;
  expiry?: string;
  isExpired?: boolean;
  experience?: number;
  workModel?: string;
  gender?: string | null;
  requiredQualification?: string[];
  hardSkills?: string[];
  softSkills?: string[];
  languages?: Array<{ language: string; proficiency: string }>;
  perks?: string[];
  companyId?: string;
  updatedAt?: string;
};

type JobCardProps = {
  job: JobData;
};

const JobCard: Component<JobCardProps> = (props) => {
  const { job } = props;

  const [isExpanded, setIsExpanded] = createSignal(false);

  return (
    <div class="job-card">
      <div class="job-card-header mb-1">
        <div class="job-card-title-location">
          <h2 class="job-card-title fw-800">{job.title}</h2>
          <p class="d-flex align-center col-gap-2">
            <span class="job-card-location">{job.location}</span>
            {job.workModel && <Badge.Info>{job.workModel}</Badge.Info>}
          </p>
        </div>
        <span class="job-card-date f-14">{timeAgo(job.createdAt)}</span>
      </div>
      {(job.minimumSalary || job.maximumSalary) && (
        <div class="job-card-salary">
          <span>
            {job.minimumSalary && job.maximumSalary
              ? `₹${job.minimumSalary.toLocaleString()} - ₹${job.maximumSalary.toLocaleString()} per ${job.salaryPeriod?.toLowerCase()}`
              : job.minimumSalary
                ? `₹${job.minimumSalary.toLocaleString()} per ${job.salaryPeriod?.toLowerCase()}`
                : `₹${job.maximumSalary?.toLocaleString()} per ${job.salaryPeriod?.toLowerCase()}`}
          </span>
        </div>
      )}
      {job.jobType && (
        <div class="job-card-info">
          <span class="job-card-label">Job Type:</span>
          <span class="job-card-value">{job.jobType}</span>
        </div>
      )}
      {job.vacancy && (
        <div class="job-card-info">
          <span class="job-card-label">Vacancy:</span>
          <span class="job-card-value">{job.vacancy}</span>
        </div>
      )}
      {job.incentiveAmount && (
        <div class="job-card-info">
          <span class="job-card-label">Incentive:</span>
          <span class="job-card-value">
            ₹{job.incentiveAmount.toLocaleString()} per{" "}
            {job.incentivePeriod?.toLowerCase()}
          </span>
        </div>
      )}
      {job.expiry && (
        <div class="job-card-info">
          <span class="job-card-label">Expiry:</span>
          <span class="job-card-value">{getDateTime(job.expiry)}</span>
          {job.isExpired && <span class="job-card-expired">(Expired)</span>}
        </div>
      )}
      {job.experience !== undefined && (
        <div class="job-card-info">
          <span class="job-card-label">Experience:</span>
          <span class="job-card-value">{job.experience} years</span>
        </div>
      )}
      {job.gender && (
        <div class="job-card-info">
          <span class="job-card-label">Gender:</span>
          <span class="job-card-value">{job.gender}</span>
        </div>
      )}
      {job.requiredQualification && job.requiredQualification.length > 0 && (
        <div class="job-card-section">
          <span class="job-card-label">Required Qualifications:</span>
          <ul class="job-card-list">
            <Index each={job.requiredQualification}>
              {(qual) => <li class="job-card-list-item">{qual()}</li>}
            </Index>
          </ul>
        </div>
      )}
      {job.hardSkills && job.hardSkills.length > 0 && (
        <div class="job-card-skills">
          <span class="job-card-label">Hard Skills:</span>
          <Index each={job.hardSkills}>
            {(skill) => <Badge.Info>{skill()}</Badge.Info>}
          </Index>
        </div>
      )}
      {job.softSkills && job.softSkills.length > 0 && (
        <div class="job-card-skills">
          <span class="job-card-label">Soft Skills:</span>
          <Index each={job.softSkills}>
            {(skill) => <Badge.Info>{skill()}</Badge.Info>}
          </Index>
        </div>
      )}
      {job.languages && job.languages.length > 0 && (
        <div class="job-card-section">
          <span class="job-card-label">Languages:</span>
          <div class="job-card-skills">
            <Index each={job.languages}>
              {(language) => (
                <Badge.Info>
                  {language().language}({language().proficiency})
                </Badge.Info>
              )}
            </Index>
          </div>
        </div>
      )}
      {job.perks && job.perks.length > 0 && (
        <div class="job-card-section">
          <h3 class="job-card-section-title">Perks</h3>
          <div class="job-card-skills">
            <Index each={job.perks}>
              {(perk) => <Badge.Info>{perk()}</Badge.Info>}
            </Index>
          </div>
        </div>
      )}
      <Show when={isExpanded()}>
        <div class="job-card-footer">
          <div class="job-card-info">
            <span class="job-card-label">Job ID:</span>
            <span class="job-card-value">{job.id}</span>
          </div>
          {job.updatedAt && (
            <div class="job-card-info">
              <span class="job-card-label">Updated:</span>
              <span class="job-card-value">{timeAgo(job.updatedAt)}</span>
            </div>
          )}
        </div>

        <div class="job-card-description" innerHTML={job.description} />
      </Show>
      <section class="d-flex justify-end">
        <button
          class="job-show-hide-toggle text-warning fw-600"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded() ? "Show less" : "... Show more"}
        </button>
      </section>
    </div>
  );
};
export default JobCard;
