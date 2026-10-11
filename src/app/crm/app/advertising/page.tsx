import { getAdvertising } from "@/actions/advertising/advertising.actions";
import { MockupPhone, TableAdvertising } from "@/components";

export default async function AppAdvertisingPage() {
  const adv = await getAdvertising();
  const data = Array.isArray(adv) ? adv : null;

  return (
    <div className="mx-3 grid min-h-[calc(100dvh-8.25rem)] grid-cols-1 gap-4 rounded-2xl bg-gray-200 p-3 sm:mx-5 sm:p-4 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <div className="h-[70dvh] min-h-[320px] min-w-0 xl:h-[calc(100dvh-10.25rem)]">
        <TableAdvertising data={data} />
      </div>

      <div className="flex min-w-0 items-start justify-center p-2">
        <MockupPhone data={data} />
      </div>
    </div>
  );
}
