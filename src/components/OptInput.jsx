import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const OptInput = () => {
  const navigate = useNavigate();
  const [pages, setPages] = useState([]);
  const [numberOfFrames, setNumberOfFrames] = useState('');

  useEffect(() => {
    const storedPages = JSON.parse(sessionStorage.getItem('inputPages')) || [];
    const storedNumberOfFrames = JSON.parse(sessionStorage.getItem('nof')) || '';
    setNumberOfFrames(storedNumberOfFrames);
    setPages(storedPages);

  }, []);

  const storePagesData = (data, nof) => {
    sessionStorage.setItem('inputPages', JSON.stringify(data));
    sessionStorage.setItem('nof', JSON.stringify(nof));
  };

  const validateInput = () => {
    const pageValues = pages.map(Number);

    if (pageValues.some(isNaN) || pageValues.some(val => val < 0)) {
      alert('Please enter valid non-negative integers for Pages.');
      return false;
    }

    if (pageValues.length < 2) {
      alert('Please enter at least two pages.');
      return false;
    }

    const parsedNumberOfFrames = parseInt(numberOfFrames, 10);
    if (isNaN(parsedNumberOfFrames) || parsedNumberOfFrames < 3) {
      alert('Please enter a valid number of frames (at least 3).');
      return false;
    }

    return true;
  };

  const handleSimulate = () => {

    if(!validateInput()){
      return;
    }

    const parsedNumberOfFrames = parseInt(numberOfFrames, 10);

    storePagesData(pages, parsedNumberOfFrames);

    navigate('/opt-page-replacement', {
      state: {
        pages,
        nof: parsedNumberOfFrames,
      },
    });
  };

  const handleBack = () => {
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="text-center">
      <h1>Input Parameters</h1>
      <button onClick={handleBack} className="btn btn-primary">
        Back to Home
      </button>

      <div className="mt-5 text-center mx-auto w-25">
        <div className="form-group">
          <h5><b>No. of Frames</b></h5>
          <input
            type="number"
            value={numberOfFrames}
            onChange={(e) => setNumberOfFrames(e.target.value)}
            className="form-control text-center"
          />
        </div>
        <div className="form-group mt-5">
          <h5><b>Page References</b></h5>
          <h6>(separate by comma)</h6>
          <input
            type="text"
            value={pages.join(',')}
            onChange={(e) => setPages(e.target.value.split(',').map(Number))}
            className="form-control text-center"
          />
        </div>
      </div>

      <button onClick={handleSimulate} className="btn btn-lg btn-danger mx-2 mt-5">
        Simulate Page Replacement
      </button>
    </div>
  );
};
