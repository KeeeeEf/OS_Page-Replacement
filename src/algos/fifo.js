function calculateReplacement(pages,nof) {
    const frames = Array(nof).fill(null); // Array to represent frames, initially empty
    const pageQueue = []; // Queue to keep track of page order
  
    const frameResults = []; // Array to store the frames at each step
    let pageFaults = 0;
    let pageHits = 0;
  
    for (let i = 0; i < pages.length; i++) {
      const currentPage = pages[i];
  
      // Check if the page is already in a frame
      if (!frames.includes(currentPage)) {
        pageFaults++;
  
        // If there is an empty frame, add the page to it
        if (frames.includes(null)) {
          const emptyFrameIndex = frames.indexOf(null);
          frames[emptyFrameIndex] = currentPage;
        } else {
          // If all frames are occupied, remove the oldest page (front of the queue)
          const replacedPage = pageQueue.shift();
          const replacedPageIndex = frames.indexOf(replacedPage);
          frames[replacedPageIndex] = currentPage;
        }
  
        // Update the page order queue
        pageQueue.push(currentPage);
  
        // Store a copy of the current frames in the result array
        frameResults.push({
          frames: [...frames],
          pageFault: true,
          pageHit: false,
        });
      } else {
        // Page is already in a frame, it's a hit
        pageHits++;
  
        // Store a copy of the current frames in the result array
        frameResults.push({
          frames: [...frames],
          pageFault: false,
          pageHit: true,
        });
      }
    }
  
    return { frameResults, pageFaults, pageHits };
  }

function decalre(){
    const processList = [7, 0, 1, 2, 0, 3, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7]
    const frameNo = 3;

    let f1 = []
    let f2 = []
    let f3 = []

    let fullList = [f1,f2,f3]

    let value = calculateReplacement(processList, frameNo);

    value.frameResults.forEach((data)=>{
        console.log(data)
    })


}

decalre();