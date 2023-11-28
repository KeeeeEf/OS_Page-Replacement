function calculateReplacement(pages, nof){
    const frames = Array(nof).fill(null); 
    const pageQueue = []; 
    const frameResults = [];
    const replacedPages = new Array(pages.length);

    let pageFaults = 0;
    let pageHits = 0;

    for(let i=0; i< pages.length; i++){
        const currentPage = pages[i];

        if(!frames.includes(currentPage)){
            pageFaults++;

            if(frames.includes(null)){
                const emptyFrameIndex = frames.indexOf(null);
                frames[emptyFrameIndex] = currentPage;
                replacedPages.push(null);
            }else{
                let leastUsedIndex = 0;
                let queueIndex;

                console.log(`index: ${i}`);
                for(let queue in pageQueue){
                    let tempIndex = pages.indexOf(pageQueue[queue], i);
                    console.log(tempIndex);

                    if(tempIndex === -1){
                        leastUsedIndex = tempIndex
                        queueIndex = queue
                        break
                    }

                    if(tempIndex>=leastUsedIndex){
                        leastUsedIndex = tempIndex
                        queueIndex = queue
                    }
                }
                const replacedPage = pageQueue.splice(queueIndex,1)[0]
                const replacedPageIndex = frames.indexOf(replacedPage);
                frames[replacedPageIndex] = currentPage;
                replacedPages.push(replacedPage);
            }   

            pageQueue.push(currentPage);

            frameResults.push({
                frames: [...frames],
                pageFault: true,
                pageHit: false
            })
        }else{
            pageHits++;

            frameResults.push({
                frames:[...frames],
                pageFault: false,
                pageHit: true,
            });
            replacedPages.push(null);
        }
    }
    return { frameResults, pageFaults, pageHits, replacedPages };
}

export { calculateReplacement};


// function decalre(){
//     const processList = [7, 0, 1, 2, 0, 3, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7]
//     const frameNo = 3;

//     let value = optimal(processList, frameNo);

//     // console.log(value.frameList.length)

//     // value.frameResults.forEach((data)=>{
//     //     console.log(data)
//     // })

// }

// decalre();