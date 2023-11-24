function calculateReplacement(pages,nof) {
  const frames = Array(nof).fill(null);
  const pageQueue = [];

  const frameResults = [];
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
      
      frameResults.push({
        frames: [...frames],
        pageFault: false,
        pageHit: true,
      });
    }
  }

  return { frameResults, pageFaults, pageHits };
}

export { calculateReplacement};  

// Example to test the FIFO page replacement function
// const pagesToTest = [7, 0, 1, 2, 0, 3, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7];
// const { frameResults, pageFaults, pageHits } = calculateReplacement(pagesToTest);

// console.log("Frames at each step:");
// frameResults.forEach((step, index) => {
//   console.log(`Step ${index + 1}: [${step.frames.join(', ')}] - ${step.pageFault ? 'Page Fault' : step.pageHit ? 'Page Hit' : ''}`);
// });

// console.log(`Total Page Faults: ${pageFaults}`);
// console.log(`Total Page Hits: ${pageHits}`);
