import React, { useRef } from 'react';
import { IssuesList } from './IssuesList';
import { Pagination } from './Pagination';
import './Styles/IssuesHomePage.css';

export function IssuesHomePage(props) {

    const { issues, 
            fullName, 
            openIssuesNum, 
            pageNum,
            itemsPerPage, 
            handleSearchSubmit, 
            handleSetPageNumber,
            handleItemsPerPage
    } = props;
     
    const inputValue = useRef(null);

    return (
        <main id='issues-home-page'>
            <form onSubmit={e => handleSearchSubmit(e, inputValue.current.value)}>
                <input type='search' 
                       placeholder='Enter :org/:repo (e.g., github/hub)'
                       ref={inputValue} />
                <input type='submit' value='Search' />
            </form>
            <IssuesList issues={issues}
                        fullName={fullName}
                        openIssuesNum={openIssuesNum}
                        pageNum={pageNum}
                        handleItemsPerPage={handleItemsPerPage}
                        itemsPerPage={itemsPerPage}
            />
            <Pagination openIssuesNum={openIssuesNum}
                        pageNum={pageNum}
                        itemsPerPage={itemsPerPage}
                        handleSetPageNumber={handleSetPageNumber}
            />
        </main>
    )
}
