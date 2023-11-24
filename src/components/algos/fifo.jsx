function calculateReplacement(pages,nof) {
  const frames = Array(nof).fill(null);
  const queue = [];

  const frameResults = [];
  let pageFaults = 0;
  let pageHits = 0;

  for (let i = 0; i < pages.length; i++) {
    const currentPage = pages[i];

    if (!frames.includes(currentPage)) {
      pageFaults++;

      if (frames.includes(null)) {
        const emptyIndex = frames.indexOf(null);
        frames[emptyIndex] = currentPage;
      } else {
        const replacedPage = queue.shift();
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
    }
  }
  return { frameResults, pageFaults, pageHits };
}

export { calculateReplacement};