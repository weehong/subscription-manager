import { DataTable } from "@/app/subscriptions/data-table";
import { SubscriptionForm } from "@/app/subscriptions/form";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col-reverse gap-y-8 lg:flex-row lg:gap-x-8">
        <DataTable />
        <SubscriptionForm />
      </div>
    </main>
  );
}
