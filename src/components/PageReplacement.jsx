import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const PageReplacement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pages, nof } = location.state;
  console.log("Frames: "+ nof);
  console.log("Pages: "+ pages);

  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [noFrames, setNoFrames] = useState('');
  const [tableData, setTableData] = useState([]);
  const [pageFaults, setPageFaults] = useState(0);
  const [pageHits, setPageHits] = useState(0);

  useEffect(() => {
    const selectedAlgo = sessionStorage.getItem('selectedAlgorithm');

    import(/* @vite-ignore */ `./algos/${selectedAlgo.toLowerCase()}`).then((module) => {
      const { calculateReplacement } = module;
      
      const frames = parseInt(nof, 10);
      const functionCall = calculateReplacement(pages, frames);

      const resultData = functionCall.frameResults || [];
      const { pageFaults, pageHits } = functionCall;
      console.log("Results: "+ resultData);

      setSelectedAlgorithm(selectedAlgo);
      setNoFrames(frames);
      setTableData(resultData);

      setPageFaults(pageFaults);
      setPageHits(pageHits);
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
      <div className="text-center">
        <h1>{selectedAlgorithm} Page Replacement</h1>
        <button onClick={handleBack} className="btn btn-primary">
          Back to Input Parameters
        </button>
      </div>
      
      <div className='row mt-3'>
        <div className='col'>
          <h5><b>No. of Frames:</b> {noFrames}</h5>
          <h5><b>Total Memory References:</b> {pages.length}</h5>
        </div>
        <div className='col'>
        </div>
        <div className='col'>
        </div>
      </div>

      <table className="table mt-4 text-center table-striped">
        <thead>
          <tr>
            <th>Pages</th>
            {pages.map((page, pageIndex) => (
              <td key={pageIndex}>{page}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Iterations</th>
            {tableData.map((step, iteration) => (
              <React.Fragment key={iteration}>
                <td>{iteration + 1}</td>
              </React.Fragment>
            ))} 
          </tr>
            {Array.from({ length: noFrames }, (_, i) => (
            <React.Fragment key={i}>
              <tr>
                <th>Frame {i + 1}</th>
                {tableData.map((step, iteration) => (
                  <td key={iteration}>
                    {step.frames[i] !== null ? step.frames[i] : '-'}
                  </td>
                ))}
              </tr>
            </React.Fragment>
          ))}
          <tr>
            <th></th>
            {tableData.map((step, iteration) => (
              <td key={iteration}>
                {step.pageFault ? 'Fault' : step.pageHit ? 'Hit' : ''}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      
      <div className="row mt-4 text-center">
        <div className="col">
          <h5><b>Total Page Faults:</b> {pageFaults}</h5>
          <h5><b>Total Page Hits:</b> {pageHits}</h5>
        </div>
        <div className="col">
          <h5><b>Faults Ratio:</b> {(pageFaults / pages.length * 100).toFixed(2)}%</h5>
          <h5><b>Hits Ratio:</b> {(pageHits / pages.length * 100).toFixed(2)}%</h5>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={handleSimulateAgain}
          className="btn btn-danger btn-lg"
        >
          Simulate Again
        </button>
      </div>

    </div>
  );
};