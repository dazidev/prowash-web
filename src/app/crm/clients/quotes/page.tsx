import { getUserQuotes, getWebQuotes } from "@/actions";
import { QuotesManagement } from "@/components/dashboard/quotes/QuotesManagement";
import type { PackageOrderQuote } from "@/interfaces";

export const dynamic = "force-dynamic";

export default async function ClientQuotesPage() {
  const [appQuotes, webQuotesResponse] = await Promise.all([
    getUserQuotes() as Promise<PackageOrderQuote[]>,
    getWebQuotes(),
  ]);

  return (
    <div className="mx-5 flex min-h-[calc(100vh-8.25rem)] flex-col rounded-2xl bg-gray-200">
      <div className="m-4 sm:m-8">
        <h1 className="ml-5 mt-5 text-3xl font-bold sm:text-4xl">
          System quotes management
        </h1>

        <p className="mx-5 mb-10 text-lg text-gray-700 sm:text-2xl">
          Manage quote requests from the app and website.
        </p>

        <QuotesManagement
          appQuotes={appQuotes}
          webQuotesResponse={webQuotesResponse}
        />
      </div>
    </div>
  );
}
