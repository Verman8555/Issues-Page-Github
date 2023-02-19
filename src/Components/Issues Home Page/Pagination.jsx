import React, { useState } from 'react';
import './Styles/Pagination.css'

export function Pagination({ pageNum, itemsPerPage, openIssuesNum, handleSetPageNumber}) {

    /*Because this component rerenders every time we press one of its number buttons, 
    we need to implement logic to move buttons left or right depending on which pageNum
    is recieved from props. This is why me make that its midPaginateBtnsArr state 
    is directly depending on pageNum prop.*/

    const firstPageNum = 1;

    const lastPageNum = Math.ceil(openIssuesNum / itemsPerPage);

    // eslint-disable-next-line no-unused-vars
    const [paginateBtnsTotal, setPaginButtonsTotal] = useState(7); 
    // set this state to be not smaller than 5 and not larger than 10

    const midBtnsTotal = paginateBtnsTotal - 2;

    const startMidBtnsArr = Array.from({length: midBtnsTotal}, (v, i) => i + 2);

    const endMidBtnsArr = Array.from({length: midBtnsTotal}, (v, i) => i + (lastPageNum - midBtnsTotal));

    const initialMidBtnsArr = () => {
        if (pageNum <= midBtnsTotal) return startMidBtnsArr;
        if (pageNum >= lastPageNum - (midBtnsTotal - 1)) return endMidBtnsArr;
        const midBtnsArr = Array.from({length: midBtnsTotal}, (v, i) => 
            midBtnsTotal <= 4 ? i + (pageNum - 1) : i + (pageNum - 2)
        );
        return midBtnsArr;
    };


    const [midPaginateBtnsArr, setMidPaginateBtnsArr] = useState(initialMidBtnsArr());

    
    const moveToFirstPage = () => {
        setMidPaginateBtnsArr(startMidBtnsArr);
        return firstPageNum;
    };

    const moveToLastPage = () => {
        setMidPaginateBtnsArr(endMidBtnsArr);
        return lastPageNum;
    };

    const showThreeDots = {
        begin: midPaginateBtnsArr[0] !== 2,
        end: midPaginateBtnsArr[midBtnsTotal - 1] !== (lastPageNum - 1)
    }

    const paginateBtnsNumbers = midPaginateBtnsArr.map(number => 
        <li key={number}
            className={`pagin-numbers ${number === pageNum && 'selected'}`}
            onClick={() => handleSetPageNumber(number)} 
        >
            {number}
        </li>
    )

    return (
        <section id="pagination">
            <div onClick={() => handleSetPageNumber(moveToFirstPage())}
                className={`pagin-numbers ${firstPageNum === pageNum && "selected"}`}>
                {firstPageNum}
            </div>
            {showThreeDots.begin && 
                <div className='three-dots'>...</div>
            }
            <ol>{paginateBtnsNumbers}</ol>
            {showThreeDots.end && 
                <div className='three-dots'>...</div>
            }
            <div onClick={() => handleSetPageNumber(moveToLastPage())}
                className={`pagin-numbers ${lastPageNum === pageNum && "selected"}`} >
                {lastPageNum}
            </div>
    </section>
    )
}


