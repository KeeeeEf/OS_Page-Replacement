function calculateReplacement(pages, nof){
    const frames = Array(nof).fill(null); 
    const pageQueue = [];
    const frameResults = [];
    let uniqueNum = [];
    const replacedPages = new Array(pages.length);

    let pageFaults = 0;
    let pageHits = 0;

    for(let i=0; i<pages.length; i++){

        const currentPage = pages[i];

        function getFreq(){
            //find and push unique frame num
            if(uniqueNum.length === 0 || !uniqueNum.some(num => num.value == currentPage)){
                uniqueNum.push({
                    value: currentPage,
                    used: 1
                })
            }else{//add frequencies of num
                let uNum = uniqueNum.find(num => num.value == currentPage);
                uNum.used += 1;
            }
        };

        if (!frames.includes(currentPage)){
            pageFaults++;
            getFreq();
            if(frames.includes(null)){
                const emptyFrameIndex = frames.indexOf(null);
                frames[emptyFrameIndex] = currentPage;
                replacedPages.push(null);
            }else{

                let queueList = uniqueNum.filter(num=>pageQueue.includes(num.value))

                let usedList = queueList.filter(num=>num.used!=0);
                let leastUsed = usedList.length!=0? Math.min(...usedList.map(num=>num.used)): null;

                let freqList = usedList.filter(num=>num.used===leastUsed);

                let queuePageIndex = 99;
                let chosenUnique = freqList[0];
                let tempPageIndex

                for(let freq in freqList){
                    tempPageIndex = pageQueue.indexOf(freqList[freq].value);
                    if(queuePageIndex >= tempPageIndex){
                        queuePageIndex = tempPageIndex;
                        chosenUnique = freqList[freq]
                    }
                }
                const replacedPage =                 pageQueue.splice(queuePageIndex, 1)[0]
                const replacedPageIndex = frames.indexOf(replacedPage);
                frames[replacedPageIndex] = currentPage
                replacedPages.push(replacedPage)

                chosenUnique.used = 0;
            }

            pageQueue.push(currentPage);

            frameResults.push({
                frames: [...frames],
                pageFault: true,
                pageHit: false
            })
        }else{
            pageHits ++;
            getFreq();
            frameResults.push({
                frames: [...frames],
                pageFault: false,
                pageHit: true
            })
            replacedPages.push(null);

        }
    }
    return { frameResults, pageFaults, pageHits, replacedPages };
}

export { calculateReplacement};

// function decalre(){
//     const processList = [7, 0, 1, 2, 0, 3, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7]
//     const frameNo = 3;

//     let value = lfu(processList, frameNo);

//     // console.log(value.frameList.length)

//     value.frameResults.forEach((data)=>{
//         console.log(data)
//     })

// }

// decalre();