"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Line } from "react-chartjs-2";
import { Button } from "@/components/ui/button"; // assuming this is your styled button component
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface DailyRecord {
  recordDate: string;
  totalSteps: number;
  totalCaloriesBurned: number | null;
  exerciseDurationMinutes: number | null;
  weight: number | null;
}

interface AggregatedRecord {
  recordDate: string;
  totalSteps: number;
  totalCaloriesBurned: number;
  exerciseDurationMinutes: number;
  weight: number;
}

type ChartMode = "daily" | "3-day" | "weekly";
type Timeframe = 7 | 30 | 90;

/**
 * Aggregates records based on the selected chart mode.
 * - "daily" returns each record as is.
 * - "3-day" groups records in sets of 3.
 * - "weekly" groups records in sets of 7.
 */
const aggregateRecords = (mode: ChartMode, records: DailyRecord[]): AggregatedRecord[] => {
  if (mode === "daily") {
    return records.map((r) => ({
      recordDate: r.recordDate,
      totalSteps: r.totalSteps,
      totalCaloriesBurned: r.totalCaloriesBurned ?? 0,
      exerciseDurationMinutes: r.exerciseDurationMinutes ?? 0,
      weight: r.weight ?? 0,
    }));
  }

  const groupSize = mode === "3-day" ? 3 : 7;
  const aggregated: AggregatedRecord[] = [];
  for (let i = 0; i < records.length; i += groupSize) {
    const group = records.slice(i, i + groupSize);
    if (group.length === 0) break;
    const repDate = group[Math.floor(group.length / 2)].recordDate;
    const avg = (arr: number[]) => Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
    aggregated.push({
      recordDate: repDate,
      totalSteps: avg(group.map((r) => r.totalSteps)),
      totalCaloriesBurned: avg(group.map((r) => r.totalCaloriesBurned ?? 0)),
      exerciseDurationMinutes: avg(group.map((r) => r.exerciseDurationMinutes ?? 0)),
      weight: avg(group.map((r) => r.weight ?? 0)),
    });
  }
  return aggregated;
};

/**
 * A header component for the charts page.
 * It reuses the design from your home page header and includes a "Back to Home" button.
 */
function ChartsHeader() {
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          HealthLeh
        </Link>
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    </header>
  );
}

export default function ChartsPage() {
  const [records, setRecords] = useState<DailyRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [timeframe, setTimeframe] = useState<Timeframe>(30);
  const [chartMode, setChartMode] = useState<ChartMode>("daily");

  useEffect(() => {
    const phone = localStorage.getItem("userPhoneNumber");
    if (!phone) {
      router.push("/");
      return;
    }
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dailyrecords/${phone}`)
      .then((res) => res.json())
      .then((data) => {
        // Sort records by date ascending.
        const sorted = data.sort((a: DailyRecord, b: DailyRecord) => new Date(a.recordDate).getTime() - new Date(b.recordDate).getTime());
        setRecords(sorted);
      })
      .catch((err) => console.error("Error fetching records", err))
      .finally(() => setLoading(false));
  }, [router]);

  // Filter records by selected timeframe.
  const filteredRecords = records.filter((record) => {
    const recordDate = new Date(record.recordDate);
    const today = new Date();
    const pastDate = new Date(today.getTime() - timeframe * 24 * 60 * 60 * 1000);
    return recordDate >= pastDate && recordDate <= today;
  });

  // Aggregate records based on selected chart mode.
  const aggregatedRecords = aggregateRecords(chartMode, filteredRecords);

  // Create labels and data arrays based on aggregated records.
  const labels = aggregatedRecords.map((record, index) => {
    // Only show the first and last labels for clarity.
    if (index === 0 || index === aggregatedRecords.length - 1) {
      const date = new Date(record.recordDate);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    }
    return "";
  });
  const stepsData = aggregatedRecords.map((record) => record.totalSteps);
  const caloriesData = aggregatedRecords.map((record) => record.totalCaloriesBurned);
  const durationData = aggregatedRecords.map((record) => record.exerciseDurationMinutes);
  const weightData = aggregatedRecords.map((record) => record.weight);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
  };

  const stepsChartData = {
    labels,
    datasets: [
      {
        label: "Steps",
        data: stepsData,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const caloriesChartData = {
    labels,
    datasets: [
      {
        label: "Calories Burned",
        data: caloriesData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const durationChartData = {
    labels,
    datasets: [
      {
        label: "Exercise Duration (mins)",
        data: durationData,
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
    ],
  };

  const weightChartData = {
    labels,
    datasets: [
      {
        label: "Weight (kg)",
        data: weightData,
        borderColor: "rgb(153, 102, 255)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
      },
    ],
  };

  return (
    <div className="min-h-screen p-4">
      <ChartsHeader />
      <h1 className="text-3xl font-bold text-center mb-6">Your Progress Charts</h1>

      {/* Timeframe Toggle Buttons */}
      <div className="flex justify-center mb-4 space-x-2">
        {[7, 30, 90].map((tf) => (
          <button
            key={tf}
            onClick={() => setTimeframe(tf as Timeframe)}
            className={`px-4 py-2 rounded border ${timeframe === tf ? "bg-orange-500 text-white" : "bg-white text-gray-800"}`}
          >
            Past {tf} Days
          </button>
        ))}
      </div>

      {/* Chart Mode Toggle Buttons */}
      <div className="flex justify-center mb-4 space-x-2">
        {(["daily", "3-day", "weekly"] as ChartMode[]).map((mode) => (
          <button
            key={mode}
            onClick={() => setChartMode(mode)}
            className={`px-4 py-2 rounded border ${chartMode === mode ? "bg-orange-500 text-white" : "bg-white text-gray-800"}`}
          >
            {mode === "daily" ? "Daily" : mode === "3-day" ? "3-Day Avg" : "Weekly Avg"}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <p>Loading...</p>
        </div>
      ) : aggregatedRecords.length === 0 ? (
        <p className="text-center">No records found for the selected timeframe.</p>
      ) : (
        // Responsive grid: one column on mobile, two columns on md and up.
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded">
            <h2 className="text-xl font-bold mb-2">Steps</h2>
            <Line data={stepsChartData} options={chartOptions} />
          </div>
          <div className="p-4 border rounded">
            <h2 className="text-xl font-bold mb-2">Calories Burned</h2>
            <Line data={caloriesChartData} options={chartOptions} />
          </div>
          <div className="p-4 border rounded">
            <h2 className="text-xl font-bold mb-2">Exercise Duration (mins)</h2>
            <Line data={durationChartData} options={chartOptions} />
          </div>
          <div className="p-4 border rounded">
            <h2 className="text-xl font-bold mb-2">Weight (kg)</h2>
            <Line data={weightChartData} options={chartOptions} />
          </div>
        </div>
      )}
    </div>
  );
}
