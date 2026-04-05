import { MockupPhone, TableAdvertising } from "@/components";
import { getAdvertising } from "../../../../../actions/advertising/advertising.actions";

export default async function AppAdvertisingPage() {
  const adv = await getAdvertising();

  let data = null;

  if (Array.isArray(adv)) {
    data = adv;
  }

  return (
    <div
      className="flex flex-row gap-4 mx-5 rounded-2xl bg-gray-200
                    min-h-[calc(100vh-8.25rem)] max-h-[calc(100vh-8.25rem)] p-4"
    >
      <div className="flex flex-2">
        <TableAdvertising data={data} />
      </div>
      <div className="flex flex-1 justify-center">
        <MockupPhone data={data} />
      </div>
    </div>
  );
}
