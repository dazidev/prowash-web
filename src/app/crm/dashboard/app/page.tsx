import { MockupPhone, TableAdvertising } from "@/components";

export default async function AppPage() {

  return (
    <div className="flex flex-row gap-4 mx-5 rounded-2xl bg-gray-200
                    min-h-[calc(100vh-8.25rem)] max-h-[calc(100vh-8.25rem)] p-4">
      <div className="flex basis-2/3 min-w-0 min-h-0">
        <TableAdvertising/>
      </div>
      <div className="flex basis-1/3 min-w-0 min-h-0 justify-center">
        <MockupPhone/>
      </div>
    </div>
  );
} 