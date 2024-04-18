import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Chart from 'chart.js/auto';

export default function LineChart() {
    const router = useRouter();
    const [chartData, setChartData] = useState([]);
  useEffect(() => {
      const labels = ['A','B','C','D','E','F','G','H','I','J','K','L','M'];
      const data = {
          labels: labels,
          datasets: [{
            label: 'FIFO',
            data: [1,2,4,5,6,7,8,9],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0
          }]
        };
      const config = {
          type: 'line',
          data: data,
        };
      const lineGraph = document.getElementById("line-chart").getContext("2d");

      if (window.dsGraph) {
        window.dsGraph.destroy();
      }
      window.dsGraph = new Chart(lineGraph, config);
    }, 
      []
  );
  return (
    <>
      <div className="relative flex flex-col w-3/4 h-screen py-12 bg-gray-100 dark:bg-gray-900">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h2 className="text-white text-xl font-semibold">GRAPH</h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-full">
            <canvas id="line-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}