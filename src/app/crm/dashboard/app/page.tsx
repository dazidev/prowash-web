import { MockupPhone, TableAdvertising } from "@/components";

export default async function AppPage() {

  return (
    <div className="flex flex-row min-h-[calc(100vh-8.25rem)] bg-gray-200 mx-5 rounded-2xl">
      <div className="flex flex-2">
        <TableAdvertising/>
      </div>
      <div className="flex flex-1 justify-center">
        <MockupPhone/>
      </div>
    </div>
  );
}