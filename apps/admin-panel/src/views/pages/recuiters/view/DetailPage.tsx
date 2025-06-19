import { useParams } from "@solidjs/router";
import { companyApis } from "@apis/company";
import { useQuery } from "@tanstack/solid-query";
import { Show } from "solid-js";
import { FormFields } from "@components/form";

const DetailsPage = () => {
  const params = useParams();
  const companyId = () => params.id;

  const companyQuery = useQuery(() => ({
    queryKey: ["company", companyId()],
    queryFn: () => companyApis.getCompanyById(companyId()),
    enabled: !!companyId(),
    staleTime: 1000 * 60 * 5,
  }));

  return (
    <div class="">
      <div class="d-flex align-center gap-2 card p-3">
        <FormFields.BackButton href="/companies" />

        <h3>Company Details</h3>
      </div>

      <Show when={companyQuery.isLoading}>
        <div>Loading...</div>
      </Show>

      <Show when={companyQuery.error}>
        <div>Error fetching company details.</div>
      </Show>

      <Show when={companyQuery.data}>
        <div
          style={{
            display: "grid",
            "grid-template-columns": "1fr 2fr",
            gap: "1rem",
            "align-items": "center",
          }}
          class="card"
        >
          {/* Company Name */}
          <div class="fw-600">Company Name</div>
          <div>{companyQuery.data!.companyName || "-"}</div>

          {/* Email */}
          <div class="fw-600">Email</div>
          <div>{companyQuery.data!.email || "-"}</div>

          {/* Phone (combined with country code) */}
          <div class="fw-600">Phone</div>
          <div>
            {companyQuery.data!.countryCode} {companyQuery.data!.phone || "-"}
          </div>

          {/* Description */}
          <div class="fw-600">Description</div>
          <div>{companyQuery.data!.description || "-"}</div>

          {/* Address */}
          <div class="fw-600">Address</div>
          <div>{companyQuery.data!.address || "-"}</div>

          {/* Postal Code */}
          <div class="fw-600">Postal Code</div>
          <div>{companyQuery.data!.postalCode || "-"}</div>

          {/* GST */}
          <div class="fw-600">GST</div>
          <div>{companyQuery.data!.gst ?? "-"}</div>

          {/* Employee Size */}
          <div class="fw-600">Employee Size</div>
          <div>{companyQuery.data!.employeeSize || "-"}</div>

          {/* Website */}
          <div class="fw-600">Website</div>
          <div>{companyQuery.data!.website || "-"}</div>

          {/* LinkedIn */}
          <div class="fw-600">LinkedIn</div>
          <div>{companyQuery.data!.linkedin || "-"}</div>

          {/* Twitter */}
          <div class="fw-600">Twitter</div>
          <div>{companyQuery.data!.twitter || "-"}</div>

          {/* Is Email Verified */}
          <div class="fw-600">Is Email Verified</div>
          <div>{companyQuery.data!.isEmailVerified ? "Yes" : "No"}</div>

          {/* Is Onboarding Completed */}
          <div class="fw-600">Is Onboarding Completed</div>
          <div>{companyQuery.data!.isOnboardingCompleted ? "Yes" : "No"}</div>

          {/* Created At */}
          <div class="fw-600">Created At</div>
          <div>{companyQuery.data!.createdAt || "-"}</div>

          {/* Updated At */}
          <div class="fw-600">Updated At</div>
          <div>{companyQuery.data!.updatedAt || "-"}</div>

          {/* Logo */}
          <Show when={companyQuery.data!.logo}>
            <div class="fw-600">Logo</div>
            <div>
              <img src={companyQuery.data!.logo!} alt="Logo" height={60} />
            </div>
          </Show>

          {/* Company Images */}
          <Show when={companyQuery.data!.companyImages?.length}>
            <div class="fw-600">Images</div>
            <div class="d-flex gap-2">
              {companyQuery.data!.companyImages.map((url: string) => (
                <img src={url} alt="Company" height={60} />
              ))}
            </div>
          </Show>
        </div>
      </Show>
    </div>
  );
};

export default DetailsPage;
