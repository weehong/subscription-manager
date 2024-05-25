import MonthlySubscription from "@/components/dashboard/MonthlySubscription";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <MonthlySubscription />
      </div>

      <Button>Button</Button>
    </main>
  );
}
