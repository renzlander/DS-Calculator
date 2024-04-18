"use client";
import { handleSubmit } from '../utils/formUtils';
import { useState } from 'react';

export default function Home() {
    const [startingTrack, setStartingTrack] = useState(0);
    const [endingTrack, setEndingTrack] = useState(0);
    const [initialHeadPosition, setInitialHeadPosition] = useState(0);
    const [previousHeadPosition, setpreviousHeadPosition] = useState(0);
    const [armMovement, setArmMovement] = useState(0);
    const [diskRequests, setDiskRequests] = useState([]);

    const algorithmOptions = ['none', 'fifo', 'sstf', 'scan', 'cscan', 'look', 'clook'];
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
    };

    return (
        <main className="p-2 flex flex-row-reverse items-center justify-between overflow-x-auto bg-custom-image">
            <div className='h-screen w-3/4 p-6 rounded-r-lg border-r border-y bg-white backdrop-blur-lg bg-opacity-20 dark:bg-opacity-20 dark:backdrop-blur-lg dark:bg-gray-600'>
                <div className='flex justify-center'>
                    <h2 className="w-4/12 text-center text-white text-md bg-gray-600 backdrop-blur-lg bg-opacity-40 border border-gray-900 font-semibold p-2 mb-2">Selected algorithm:  
                        <span className='uppercase'> {algorithm}</span>
                    </h2>
                </div>
                <div className="flex flex-row items-start justify-center">
                    <h2 className="text-white text-md bg-gray-600 backdrop-blur-lg bg-opacity-40 border border-gray-900 font-semibold p-2 mr-2">Total Head Movement (THM):  <span id='totalHeadMovement'></span></h2>

                    <h2 className="text-white text-md bg-gray-600 backdrop-blur-lg bg-opacity-40 border border-gray-900 font-semibold p-2 mr-2">Seek Time (ST): <span id='seekTime'></span></h2>
                </div>
                <h2 className="text-white text-xl my-3 font-semibold">GRAPH:</h2>
                <canvas id='lineGraph' className='p-2 rounded-md'></canvas>
            </div>
            <div className="w-1/2 h-screen p-4 rounded-l-lg bg-gray-400 sm:p-6 md:p-8 border backdrop-blur-lg bg-opacity-20 dark:bg-opacity-40 dark:backdrop-blur-lg dark:bg-gray-900">
                <form className="space-y-6" onSubmit={formHandleSubmit}>
                    <h5 className="text-xl text-center font-extrabold text-white">DISK SCHEDULING CALCULATOR</h5>
                    <div className='flex flex-row justify-between'>
                        <div className='flex flex-col'>
                            <div className="relative mb-3">
                                <input
                                    type="number"
                                    name="startingTrack"
                                    id="startingTrack"
                                    onChange={(e) => setStartingTrack(e.target.value)}
                                    className="block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-white bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    min="0"
                                    required
                                />
                                <label htmlFor="startingTrack" className="absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
                                    Starting Track
                                </label>
                            </div>
                            <div className="relative">
                                <input
                                    type="number"
                                    name="endingTrack"
                                    id="endingTrack"
                                    onChange={(e) => setEndingTrack(e.target.value)}
                                    className="block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-white bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    min="0"
                                    required
                                />
                                <label
                                    htmlFor="endingTrack"
                                    className="absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                                >
                                    Ending Track
                                </label>
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <div className="relative mb-3">
                                <input
                                    type="number"
                                    name="initialHeadPosition"
                                    id="initialHeadPosition"
                                    onChange={(e) => setInitialHeadPosition(e.target.value)}
                                    className="block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-white bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    required
                                />
                                <label
                                    htmlFor="initialHeadPosition"
                                    className="absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                                >
                                    Starting Position (SP)
                                </label>
                            </div>
                            <div className="relative">
                                <input
                                    type="number"
                                    name="previousHeadPosition"
                                    id="previousHeadPosition"
                                    onChange={(e) => setpreviousHeadPosition(e.target.value)}
                                    className="block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-white bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    required
                                />
                                <label
                                    htmlFor="previousHeadPosition"
                                    className="absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                                >
                                    Previously Served (PS)
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <input
                            type="number"
                            name="armMovement"
                            id="armMovement"
                            onChange={(e) => setArmMovement(e.target.value)}
                            className="block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-white bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="armMovement"
                            className="absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                        >
                            Arm Movement
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            name="diskRequests"
                            id="diskRequests"
                            value={diskRequests}
                            onChange={(e) => setDiskRequests(e.target.value)}
                            className="block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-white bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="diskRequests"
                            className="absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                        >
                            Disk Requests (Separate by space)
                        </label>
                    </div>
                    <div className='flex flex-row items-center justify-around'>
                        <button
                            type="submit"
                            value="fifo"
                            onClick={(e) => setAlgorithm(e.target.value)}
                            className="w-3/12 text-white bg-gray-300 hover:bg-gray-400 backdrop-blur-md bg-opacity-20 font-medium rounded-lg text-sm px-5 py-2.5 text-center border dark:backdrop-blur-md dark:bg-opacity-20 dark:bg-gray-100 dark:hover:bg-gray-600"
                        >
                            FIFO
                        </button>
                        <button
                            type="submit"
                            value="sstf"
                            onClick={(e) => setAlgorithm(e.target.value)}
                            className="w-3/12 text-white bg-gray-300 hover:bg-gray-400 backdrop-blur-md bg-opacity-20 font-medium rounded-lg text-sm px-5 py-2.5 text-center border dark:backdrop-blur-md dark:bg-opacity-20 dark:bg-gray-100 dark:hover:bg-gray-600"
                        >
                            SSTF
                        </button>
                        <button
                            type="submit"
                            value="scan"
                            onClick={(e) => setAlgorithm(e.target.value)}
                            className="w-3/12 text-white bg-gray-300 hover:bg-gray-400 backdrop-blur-md bg-opacity-20 font-medium rounded-lg text-sm px-5 py-2.5 text-center border dark:backdrop-blur-md dark:bg-opacity-20 dark:bg-gray-100 dark:hover:bg-gray-600"
                        >
                            SCAN
                        </button>
                    </div>
                    <div className='flex flex-row items-center justify-around'>
                        <button
                            type="submit"
                            value="cscan"
                            onClick={(e) => setAlgorithm(e.target.value)}
                            className="w-3/12 text-white bg-gray-300 hover:bg-gray-400 backdrop-blur-md bg-opacity-20 font-medium rounded-lg text-sm px-5 py-2.5 text-center border dark:backdrop-blur-md dark:bg-opacity-20 dark:bg-gray-100 dark:hover:bg-gray-600"
                        >
                            C-SCAN
                        </button>
                        <button
                            type="submit"
                            value="look"
                            onClick={(e) => setAlgorithm(e.target.value)}
                            className="w-3/12 text-white bg-gray-300 hover:bg-gray-400 backdrop-blur-md bg-opacity-20 font-medium rounded-lg text-sm px-5 py-2.5 text-center border dark:backdrop-blur-md dark:bg-opacity-20 dark:bg-gray-100 dark:hover:bg-gray-600"
                        >
                            LOOK
                        </button>
                        <button
                            type="submit"
                            value="clook"
                            onClick={(e) => setAlgorithm(e.target.value)}
                            className="w-3/12 text-white bg-gray-300 hover:bg-gray-400 backdrop-blur-md bg-opacity-20 font-medium rounded-lg text-sm px-5 py-2.5 text-center border dark:backdrop-blur-md dark:bg-opacity-20 dark:bg-gray-100 dark:hover:bg-gray-600"
                        >
                            C-LOOK
                        </button>
                    </div>
                </form>
            </div>
        </main>
        )
    }