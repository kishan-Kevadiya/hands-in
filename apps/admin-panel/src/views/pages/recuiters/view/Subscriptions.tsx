import { FormFields } from "@components/form";

export default function SubscriptionPage() {
  return (
    <div class="subscription-page">
      <div class="d-flex gap-2 p-3 card">
        <FormFields.BackButton href="/companies" />
        <h3>Subscriptions</h3>
      </div>
    </div>
  );
}
