import { useNavigate } from 'react-router-dom';

function Home() {
  const algos = [
    'First-In, First-Out',
    'Least Recently Used',
    'Least Frequently Used',
    'Optimal Page Replacement',
  ];

  const algoAcronyms = {
    'First-In, First-Out': 'FIFO',
    'Least Recently Used': 'LFU',
    'Least Frequently Used': 'LFU',
    'Optimal Page Replacement': 'OPT',
  };

  const navigate = useNavigate();

  const handleNavigate = (algorithm) => {
    const algorithmAcronym = algoAcronyms[algorithm];
    sessionStorage.setItem('selectedAlgorithm', algorithmAcronym);

    switch (algorithm) {
      case 'First-In, First-Out':
        navigate('/input');
        break;
      case 'Least Recently Used':
        navigate('/input');
        break;
      case 'Least Frequently Used':
        navigate('/input');
        break;
      case 'Optimal Page Replacement':
        navigate('/optimal-input');
        break;
      default:
        navigate('/input');
    }
  };

  const displayButtons = (datum) => {
    return (
      <>
        <div className="col-md-6">
          <button
            type="button"
            onClick={() => handleNavigate(datum)}
            className="w-100 m-1 mt-3 btn btn-lg btn-danger btn-block"
          >
            {datum}
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="text-center">
      <h1>Page Replacement Simulator</h1>
      <h4>By Gallego & Garcia</h4>
      <div className='m-5'>
        <h3 className="text-start">Choose an Algorithm:</h3>

        <div className="container" style={{ maxWidth: '950px' }}>
          <div className="row">
            {algos.map((data, index) => {
              return displayButtons(data, index);
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
