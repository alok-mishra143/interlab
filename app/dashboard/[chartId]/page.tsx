"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { BarChartComponent } from "@/components/chart/BarChart";
import { PieChartComponent } from "@/components/chart/piechart";
import { getDataById } from "@/lib/supabase-action";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { chartId: string } }) {
  const { isSignedIn, user } = useUser();
  const [slugData, setSlugData] = useState<Dataprops | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (isSignedIn && user?.id && params.chartId) {
        try {
          const val: Dataprops | null | any = await getDataById({
            Id: params.chartId,
            userId: user.id,
          });
          setSlugData(val);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData(); // Call the async function
  }, [params.chartId, isSignedIn, user?.id]);

  console.log(slugData);

  return (
    <div className="w-screen">
      <div className="min-h-screen bg-gray-900 text-white w-[85%] p-8">
        {/* Page header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-100">Chart Dashboard</h1>
          <p className="mt-2 text-lg text-gray-400">
            Explore data visualizations
          </p>
          <p className="mt-4 text-lg font-medium text-indigo-400">
            My Post: {params.chartId}
          </p>
        </div>

        {/* Chart Container */}
        <div className="flex flex-col md:flex-row gap-8 justify-between items-center">
          <div className="flex-1 bg-gray-800 shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-100 mb-4">
              Pie Chart
            </h2>
            {slugData && <PieChartComponent {...slugData} />}
          </div>

          <div className="flex-1 bg-gray-800 shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-100 mb-4">
              Bar Chart
            </h2>
            {slugData && <BarChartComponent {...slugData} />}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
