"use client";
import { useState } from "react";
import { handleSubmit } from "../utils/formUtils";

import {
  Button,
  Card,
  FloatingLabel,
  createTheme,
  ThemeProvider,
} from "flowbite-react";

const floatingLabelTheme = createTheme({
  label: {
    default: {
      outlined: {
        md: "dark:bg-gray-800",
      },
    },
  },
});

const algorithms = [
  { key: "fifo", label: "FIFO" },
  { key: "sstf", label: "SSTF" },
  { key: "scan", label: "SCAN" },
  { key: "cscan", label: "C-SCAN" },
  { key: "look", label: "LOOK" },
  { key: "clook", label: "CLOOK" },
];

// distinct gradient per algorithm so the active choice is easy to spot at a glance
const algorithmGradients = {
  fifo: "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 focus:ring-cyan-300",
  sstf: "bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-400 hover:to-indigo-500 focus:ring-violet-300",
  scan: "bg-gradient-to-r from-fuchsia-500 to-pink-600 hover:from-fuchsia-400 hover:to-pink-500 focus:ring-fuchsia-300",
  cscan:
    "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 focus:ring-emerald-300",
  look: "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 focus:ring-amber-300",
  clook:
    "bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-400 hover:to-red-500 focus:ring-rose-300",
};

const cardStyles =
  "bg-gray-900/70 backdrop-blur-xl border border-indigo-500/20 rounded-2xl shadow-xl shadow-indigo-500/10";

export default function Home() {
  const [startingTrack, setStartingTrack] = useState(0);
  const [endingTrack, setEndingTrack] = useState(0);
  const [initialHeadPosition, setInitialHeadPosition] = useState(0);
  const [previousHeadPosition, setpreviousHeadPosition] = useState(0);
  const [armMovement, setArmMovement] = useState(0);
  const [diskRequests, setDiskRequests] = useState([]);

  const gradientBG =
    "bg-gradient-to-br from-gray-950 via-indigo-950 to-slate-900";

  const algorithmOptions = [
    "none",
    "fifo",
    "sstf",
    "scan",
    "cscan",
    "look",
    "clook",
  ];
  const [algorithm, setAlgorithm] = useState(algorithmOptions[0]);

  function formHandleSubmit(e) {
    e.preventDefault();
    handleSubmit(
      e,
      startingTrack,
      endingTrack,
      initialHeadPosition,
      previousHeadPosition,
      armMovement,
      diskRequests,
      setDiskRequests,
      algorithm,
    );
    setDiskRequests(diskRequests);
  }

  return (
    <main className={`relative min-h-screen ${gradientBG}`}>
      <div className="p-4 mx-auto max-w-7xl sm:p-6 md:p-10 lg:p-16">
        <header className="mb-8 text-center lg:text-left">
          <h1 className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text sm:text-4xl">
            Disk Scheduling Calculator
          </h1>
          <p className="mt-2 text-sm text-slate-400 sm:text-base">
            Visualize and compare disk head scheduling algorithms in real time.
          </p>
        </header>

        <div className="grid items-start grid-cols-1 gap-6 lg:grid-cols-5">
          <Card className={`lg:col-span-2 ${cardStyles}`}>
            <form className="space-y-6" onSubmit={formHandleSubmit}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FloatingLabel
                  variant="outlined"
                  type="number"
                  label="Starting Track"
                  min="0"
                  onChange={(e) => setStartingTrack(e.target.value)}
                  theme={floatingLabelTheme}
                  required
                />
                <FloatingLabel
                  variant="outlined"
                  type="number"
                  label="Start Position (SP)"
                  min="0"
                  onChange={(e) => setInitialHeadPosition(e.target.value)}
                  theme={floatingLabelTheme}
                  required
                />
                <FloatingLabel
                  variant="outlined"
                  type="number"
                  label="Ending Track"
                  min="0"
                  onChange={(e) => setEndingTrack(e.target.value)}
                  theme={floatingLabelTheme}
                  required
                />
                <FloatingLabel
                  variant="outlined"
                  type="number"
                  label="Previously Served (PS)"
                  min="0"
                  onChange={(e) => setpreviousHeadPosition(e.target.value)}
                  theme={floatingLabelTheme}
                  required
                />
              </div>
              <FloatingLabel
                variant="outlined"
                type="number"
                label="Arm Movement"
                min="0"
                onChange={(e) => setArmMovement(e.target.value)}
                theme={floatingLabelTheme}
                required
              />
              <FloatingLabel
                variant="outlined"
                type="text"
                label="Disk Requests (Separated by space)"
                onChange={(e) => setDiskRequests(e.target.value)}
                theme={floatingLabelTheme}
                required
              />

              <div>
                <p className="mb-2 text-xs font-semibold tracking-wide uppercase text-slate-400">
                  Choose Algorithm
                </p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {algorithms.map(({ key, label }) => (
                    <Button
                      key={key}
                      type="submit"
                      onClick={() => setAlgorithm(key)}
                      className={`text-white transition-all duration-300 ${
                        algorithmGradients[key]
                      } ${
                        algorithm === key
                          ? "scale-105 ring-2 ring-white/80"
                          : "opacity-90 hover:scale-105 hover:opacity-100"
                      }`}
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </div>
            </form>
          </Card>

          <Card className={`lg:col-span-3 ${cardStyles}`}>
            <div className="flex justify-center mb-4">
              <span className="rounded-full border border-indigo-400/30 bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-cyan-300">
                Selected algorithm:{" "}
                <span className="text-white">{algorithm}</span>
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 mb-4 sm:grid-cols-2">
              <div className="p-3 text-center border rounded-xl border-indigo-500/20 bg-gray-800/60">
                <p className="text-xs tracking-wide uppercase text-slate-400">
                  Total Head Movement (THM)
                </p>
                <p className="text-xl font-bold text-cyan-300">
                  <span id="totalHeadMovement"></span>
                </p>
              </div>
              <div className="p-3 text-center border rounded-xl border-indigo-500/20 bg-gray-800/60">
                <p className="text-xs tracking-wide uppercase text-slate-400">
                  Seek Time (ST)
                </p>
                <p className="text-xl font-bold text-cyan-300">
                  <span id="seekTime"></span>
                </p>
              </div>
            </div>

            <h2 className="mb-2 text-lg font-semibold text-slate-200">Graph</h2>
            <div className="w-full h-64 p-2 rounded-xl bg-gray-950/50 sm:h-80 md:h-96">
              <canvas id="lineGraph"></canvas>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
