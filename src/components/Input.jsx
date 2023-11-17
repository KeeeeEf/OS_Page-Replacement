import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Input = () => {
  const navigate = useNavigate();
  const [pages, setPages] = useState([]);
  const [numberOfFrames, setNumberOfFrames] = useState('');
  const [editId, setEditId] = useState(null);
  const [currentPageId, setCurrentPageId] = useState('');

  useEffect(() => {
    const storedPages = JSON.parse(sessionStorage.getItem('inputPages')) || [];
    const storedNumberOfFrames = JSON.parse(sessionStorage.getItem('nof')) || [];
    setNumberOfFrames(storedNumberOfFrames);
    setPages(storedPages);
  }, []);

  const storePagesData = (data, nof) => {
    sessionStorage.setItem('inputPages', JSON.stringify(data));
    sessionStorage.setItem('nof', JSON.stringify(nof));
  };

  const validateInput = () => {
    if (currentPageId === '' || isNaN(currentPageId) || currentPageId < 0) {
      alert('Please enter a valid positive integer for Page Reference');
      return false;
    }

    return true;
  };

  const handleAddPage = () => {
    if (!validateInput()) {
      return;
    }

    if (editId !== null) {
      const updatedPages = pages.map((page) =>
        page.id === editId ? { ...page } : page
      );
      setPages(updatedPages);
      setEditId(null);
    } else {
      const newPage = {
        id: parseInt(currentPageId, 10),
      };

      setPages([...pages, newPage]);
    }

    setCurrentPageId('');
    setNumberOfFrames('');
  };

  const handleEditPage = (id) => {
    const pageToEdit = pages.find((page) => page.id === id);
    if (pageToEdit) {
      setCurrentPageId(pageToEdit.id.toString());
      setEditId(id);
    }
  };

  const handleDeletePage = (id) => {
    setPages((prevPages) => prevPages.filter((page) => page.id !== id));
    setEditId(null);

    setPages((prevPages) =>
      prevPages.map((page, index) => ({
        ...page
      }))
    );
  };

  const handleSimulate = () => {
    if (pages.length < 2) {
      alert('Please add at least two pages before simulating.');
      return;
    }

    const parsedNumberOfFrames = parseInt(numberOfFrames, 10);

    if (isNaN(parsedNumberOfFrames) || parsedNumberOfFrames < 1) {
      alert('Please enter a valid number of frames.');
      return;
    }

    storePagesData(pages, parsedNumberOfFrames);

    navigate('/page-replacement', {
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
    <div>
      <h1>Input Parameters</h1>
      <button onClick={handleBack} className="btn btn-primary">
        Back to Home
      </button>
      <div className="row justify-content-end">
        <div className="col form-group col-auto ml-auto">
          <h5 className="bold">No. of Frames</h5>
          <input
            type="number"
            value={numberOfFrames}
            onChange={(e) => setNumberOfFrames(e.target.value)}
            className="form-control"
            style={{ maxWidth: '150px' }}
          />
        </div>
      </div>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Page Reference</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pages.map((page) => (
            <tr key={page.id}>
              <td>
                {editId === page.id ? (
                  <input
                    type="number"
                    value={currentPageId}
                    onChange={(e) => setCurrentPageId(e.target.value)}
                    onBlur={() => setEditId(null)}
                    className="form-control w-50"
                  />
                ) : (
                  page.id
                )}
              </td>
              <td>
                <>
                  <button
                    onClick={() => handleEditPage(page.id)}
                    className="btn btn-warning mx-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePage(page.id)}
                    className="btn btn-danger mx-2"
                  >
                    Delete
                  </button>
                </>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="row mt-5">
        <div className="col">
          <div className="form-group">
            <h5 className="bold">Page Reference</h5>
            <input
              type="number"
              value={currentPageId}
              onChange={(e) => setCurrentPageId(e.target.value)}
              className="form-control"
            />
          </div>
        </div>

        <div className="col mt-2">
          <button onClick={handleAddPage} className="btn btn-primary m-4">
            {editId !== null ? 'Save' : 'Add Page'}
          </button>
        </div>
      </div>

      <button onClick={handleSimulate} className="btn btn-lg btn-danger mx-2 mt-5">
        Simulate Page Replacement
      </button>
    </div>
  );
};
