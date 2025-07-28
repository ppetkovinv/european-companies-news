import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>European Public Companies News Aggregation</title>
        <meta name="description" content="Comprehensive news, analysis, and insights for public companies across Europe. Covering Germany, France, Italy, Netherlands, and Spain." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <section className="container mx-auto px-4 py-12 flex flex-col gap-6 items-center">
          <h1 className="text-4xl md:text-6xl font-bold text-center text-gray-900 dark:text-white">
            European Public Companies News Aggregation
          </h1>
          <p className="max-w-2xl text-center text-lg text-gray-700 dark:text-gray-300">
            Real-time news, market data, company insights, and analytics for investors, analysts, and professionals. Explore the latest updates from Germany, France, Italy, Netherlands, and Spain.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {[
              { country: "Germany", code: "de" },
              { country: "France", code: "fr" },
              { country: "Italy", code: "it" },
              { country: "Netherlands", code: "nl" },
              { country: "Spain", code: "es" },
            ].map(({ country, code }) => (
              <a
                key={code}
                href={`/markets/${code}`}
                className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow transition"
              >
                {country} Market
              </a>
            ))}
          </div>
          <section className="w-full mt-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Featured Stories & Breaking News</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 min-h-[120px] flex items-center justify-center text-gray-500">
              {/* Placeholder: Featured stories/news ticker to be implemented */}
              <span>Live market headlines and featured pan-European news will appear here.</span>
            </div>
          </section>
          <section className="w-full mt-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Market Data</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 min-h-[100px] flex items-center justify-center text-gray-500">
              {/* Placeholder: Real-time market data widgets to be implemented */}
              <span>Market indices and stock performance widgets coming soon.</span>
            </div>
          </section>
        </section>
      </main>
    </>
  );
}
