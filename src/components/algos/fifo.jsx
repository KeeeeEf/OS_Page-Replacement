function calculateReplacement(pages,nof) {
  const frames = Array(nof).fill(null);
  const queue = [];

  const frameResults = [];
  const replacedPages = new Array(pages.length);
  
  let pageFaults = 0;
  let pageHits = 0;

  for (let i = 0; i < pages.length; i++) {
    const currentPage = pages[i];

    if (!frames.includes(currentPage)) {
      pageFaults++;

      if (frames.includes(null)) {
        const emptyIndex = frames.indexOf(null);
        frames[emptyIndex] = currentPage;
        replacedPages.push(null);
      } else {
        const replacedPage = queue.shift();
        replacedPages.push(replacedPage);
        
        const replacedPageIndex = frames.indexOf(replacedPage);
        frames[replacedPageIndex] = currentPage;
      }

      queue.push(currentPage);
      frameResults.push({
        frames: [...frames],
        pageFault: true,
        pageHit: false,
      });

    } else {
      pageHits++;
      frameResults.push({
        frames: [...frames],
        pageFault: false,
        pageHit: true,
      });
      replacedPages.push(null);
    }
  }
  
  return { frameResults, pageFaults, pageHits, replacedPages };
  
}

export { calculateReplacement};