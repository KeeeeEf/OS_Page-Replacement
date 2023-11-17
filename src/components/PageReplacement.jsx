import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const PageReplacement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pages, nof } = location.state;

  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [noFrames, setNoFrames] = useState('');

//   const [schedulingData, setSchedulingData] = useState([]);
//   const [timelineData, setTimelineData] = useState([]);
//   const [quantumTime, setQuantumTime] = useState([]);

//   const [averageTurnaroundTime, setAverageTurnaroundTime] = useState(0);
//   const [averageWaitingTime, setAverageWaitingTime] = useState(0);
//   const [cpuUtilization, setCpuUtilization] = useState(0);
//   const [totalCpuBurst, setTotalCpuBurst] = useState(0);
//   const [finalEndTime, setFinalEndTime] = useState(0);

//   const [totalTAT, setTotalTAT] = useState(0);
//   const [totalAWT, setTotalAWT] = useState(0);
//   const [totalProcesses, setTotalProcesses] = useState(0);

  useEffect(() => {
    const selectedAlgo = sessionStorage.getItem('selectedAlgorithm');

    import(/* @vite-ignore */ `./algos/${selectedAlgo.toLowerCase()}`).then((module) => {
      const { calculateReplacement } = module;
      
      const frames = parseInt(nof, 10);
      const functionCall = calculateReplacement(pages, frames);

//       const originalData = functionCall.schedulingData;
//       const sortedData = [...originalData].sort((a, b) => a.process.id.localeCompare(b.process.id));
//       const timeline = functionCall.timelineList;

//       const totalTurnaroundTime = sortedData.reduce((acc, data) => acc + data.turnaroundTime, 0);
//       const avgTurnaroundTime = totalTurnaroundTime / sortedData.length;

//       const totalWaitingTime = sortedData.reduce((acc, data) => acc + data.waitingTime, 0);
//       const avgWaitingTime = totalWaitingTime / sortedData.length;

//       const ttlCpuBurst = sortedData.reduce((acc, data) => acc + data.process.cpuBurst, 0);
//       const finEndTime = sortedData.reduce((maxEndTime, data) => { return Math.max(maxEndTime, data.endTime); }, 0);
//       const cpuUtil = (ttlCpuBurst / finEndTime) * 100;

//       setSchedulingData(sortedData);
//       setTimelineData(timeline);

//       setTotalTAT(totalTurnaroundTime);
//       setTotalAWT(totalWaitingTime);
//       setTotalProcesses(sortedData.length);

//       setAverageTurnaroundTime(avgTurnaroundTime);
//       setAverageWaitingTime(avgWaitingTime);
//       setTotalCpuBurst(ttlCpuBurst);
//       setFinalEndTime(finEndTime);
//       setCpuUtilization(cpuUtil);

        setSelectedAlgorithm(selectedAlgo);
        setNoFrames(nof);
        console.log("Algo: "+ selectedAlgorithm);
    });
  }, [pages, nof]);

  const handleBack = () => {
    navigate('/input');
    window.location.reload();
  };

  const handleSimulateAgain = () => {
    navigate('/', { state: { key: Date.now() } });
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <div>
      <h1>{selectedAlgorithm} Page Replacement</h1>
      <h5>No. of Frames: {nof}</h5>
      {/* <table className="table">
        <thead>
          <tr>
            <th>Process ID</th>
            <th>Arrival Time</th>
            <th>CPU Burst</th>
            <th>End Time</th>
            <th>Turnaround Time</th>
            <th>Waiting Time</th>
          </tr>
        </thead>
        <tbody>
          {schedulingData.map((data, index) => (
            <tr key={index}>
              <td>{data.process.id}</td>
              <td>{data.process.arrivalTime}</td>
              <td>{data.process.cpuBurst}</td>
              <td>{data.endTime}</td>
              <td>{data.turnaroundTime}</td>
              <td>{data.waitingTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
          */}

      <button onClick={handleBack} className="btn btn-primary">Back to Input Parameters</button>
    
        {/*
      <div className="container">
      <h2>Performance</h2>
        <div className="row">
          <div className="col">
            <h5>
              CPU Utilization is at <sup>{totalCpuBurst}</sup>/<sub>{finalEndTime}</sub> = {cpuUtilization.toFixed(2)}%
            </h5>
          </div>
        </div>
        <div className="row">
          <div className="col">{schedulingData.map((data, index) => (
            <p key={index}>
              TAT<sub>{data.process.id}</sub> = {data.endTime} - {data.process.arrivalTime} = {data.turnaroundTime} ms
            </p>
            ))}
            <h5>
              The average turnaround time is
              <br/>{'('}{schedulingData.map((data) => data.turnaroundTime).join(' + ')}{')'} / {totalProcesses} 
              <br/>= {totalTAT} / {totalProcesses} = {averageTurnaroundTime.toFixed(2)}{' '}ms
            </h5>
          </div>

          <div className="col">
            {schedulingData.map((data, index) => (
            <p key={index}>
              WT<sub>{data.process.id}</sub> = {data.turnaroundTime} - {data.process.cpuBurst} = {data.waitingTime} ms
            </p>
            ))}
            <h5>
              The average waiting time is
              <br/>{'('}{schedulingData.map((data) => data.waitingTime).join(' + ')}{')'} / {totalProcesses} 
              <br/>= {totalAWT} / {totalProcesses} = {averageWaitingTime.toFixed(2)}{' '}ms
            </h5>
          </div>
        </div>
      </div>
       */}
      <button onClick={handleSimulateAgain} className="btn btn-danger btn-lg mt-5">Simulate Again</button>
    </div>
  );
};