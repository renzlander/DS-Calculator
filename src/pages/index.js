"use client";
import { useState } from "react";
import { handleSubmit } from "../utils/formUtils";

import { Button, Card, FloatingLabel } from "flowbite-react";

export default function Home() {
  const [startingTrack, setStartingTrack] = useState(0);
  const [endingTrack, setEndingTrack] = useState(0);
  const [initialHeadPosition, setInitialHeadPosition] = useState(0);
  const [previousHeadPosition, setpreviousHeadPosition] = useState(0);
  const [armMovement, setArmMovement] = useState(0);
  const [diskRequests, setDiskRequests] = useState([]);

  const gradientBG =
    "bg-gradient-to-tr from-green-200 via-blue-200 to-indigo-400 dark:from-green-900 dark:via-blue-900 dark:to-indigo-900";

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
      algorithm
    );
    setDiskRequests(diskRequests);
  }

  return (
    <main
      className={`relative min-h-screen p-8 md:p-20 flex flex-col md:flex-row items-start justify-between gap-4 overflow-x-auto ${gradientBG}`}
    >
      <Card className="w-full md:w-1/3 dark:bg-gray-900">
        <form className="space-y-6" onSubmit={formHandleSubmit}>
          <h5 className="text-xl text-center font-extrabold text-gray-900 dark:text-gray-100">
            DISK SCHEDULING CALCULATOR
          </h5>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <FloatingLabel
                variant="outlined"
                type="number"
                label="Starting Track"
                min="0"
                onChange={(e) => setStartingTrack(e.target.value)}
                required
              />
              <FloatingLabel
                variant="outlined"
                type="number"
                label="Ending Track"
                min="0"
                onChange={(e) => setEndingTrack(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <FloatingLabel
                variant="outlined"
                type="number"
                label="Start Position (SP)"
                min="0"
                onChange={(e) => setInitialHeadPosition(e.target.value)}
                required
              />
              <FloatingLabel
                variant="outlined"
                type="number"
                label="Previously Served (PS)"
                min="0"
                onChange={(e) => setpreviousHeadPosition(e.target.value)}
                required
              />
            </div>
          </div>
          <FloatingLabel
            variant="outlined"
            type="number"
            label="Arm Movement"
            min="0"
            onChange={(e) => setArmMovement(e.target.value)}
            required
          />
          <FloatingLabel
            variant="outlined"
            type="text"
            label="Disk Requests (Separated by space)"
            onChange={(e) => setDiskRequests(e.target.value)}
            required
          />
          <div className="flex flex-row items-center justify-around">
            <Button
              type="submit"
              color="blue"
              onClick={() => setAlgorithm('fifo')}
            >
              FIFO
            </Button>
            <Button
              type="submit"
              color="blue"
              onClick={() => setAlgorithm('sstf')}
            >
              SSTF
            </Button>
            <Button
              type="submit"
              color="blue"
              onClick={() => setAlgorithm('scan')}
            >
              SCAN
            </Button>
            <Button
              type="submit"
              color="blue"
              onClick={() => setAlgorithm('cscan')}
            >
              C-SCAN
            </Button>
            <Button
              type="submit"
              color="blue"
              onClick={() => setAlgorithm('look')}
            >
              LOOK
            </Button>
            <Button
              type="submit"
              color="blue"
              onClick={() => setAlgorithm('clook')}
            >
              CLOOK
            </Button>
          </div>
        </form>
      </Card>

      <Card className="w-full md:w-2/3 h-full p-6 dark:bg-gray-900">
        <div className="flex justify-center">
          <h2 className="w-4/12 text-center text-white text-md bg-gray-600 rounded-md backdrop-blur-lg bg-opacity-40 border border-gray-900 font-semibold p-2 mb-2">
            Selected algorithm:
            <span className="uppercase"> {algorithm}</span>
          </h2>
        </div>
        <div className="flex flex-row items-start justify-center">
          <h2 className="text-white text-md bg-gray-600 rounded-md backdrop-blur-lg bg-opacity-40 border border-gray-900 font-semibold p-2 mr-2">
            Total Head Movement (THM): <span id="totalHeadMovement"></span>
          </h2>

          <h2 className="text-white text-md bg-gray-600 rounded-md backdrop-blur-lg bg-opacity-40 border border-gray-900 font-semibold p-2 mr-2">
            Seek Time (ST): <span id="seekTime"></span>
          </h2>
        </div>
        <h2 className="text-white text-xl my-3 font-semibold">GRAPH:</h2>
        <canvas id="lineGraph" className="p-2 rounded-md"></canvas>
      </Card>
    </main>
  );
}
