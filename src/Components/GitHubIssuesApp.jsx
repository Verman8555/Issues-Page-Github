import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar/Navbar';
import { IssuesHomePage } from './Issues Home Page/IssuesHomePage';
import { IssueDetailsPage } from './Issue Details Page/IssueDetailsPage';
import { FakeIssues } from '../Components/Issues Home Page/FakeIssues';
import { getAllData } from '../Api/api';
import { Switch, Route, useLocation, Link } from 'react-router-dom';
import './GitHubIssuesApp.css';

export function GitHubIssuesApp() {

    const location = useLocation();

    const { pathname, state } = location;

    const isHomeUrl = pathname === '/';

    const homeOrgRepo = {org: 'facebook', repo: 'react'};

    //Set these values as default on first render or pages refresh:
    const urlOrgRepo = () => {
        if (isHomeUrl) return homeOrgRepo;
    //if state is undefined or doesn't exist, something in the URL has been changed;
        if (!state) return {org:'', repo: ''};
    //Otherwise the page is refreshed on /issue_(someNumber) Url, which has a state:
        const { issueNumber, pageNumber, ...orgRepo } = state;
        return orgRepo;
    }

    const urlPageNum = () => {
        if (isHomeUrl) return 1;
        if (!state) return 1;
        return state.pageNumber;
    }

    const [orgRepoValue, setOrgRepoValue] = useState(urlOrgRepo());

    const { org , repo } = orgRepoValue;
    

    const [pageNum, setPageNum] = useState(urlPageNum());

    const [itemsPerPage, setItemsPerPage] = useState(20);


    const [allData, setAllData] = useState({});

    const { issues, full_name, open_issues_count } = allData;
    

    const handleSearchSubmit = (e, currentInputValue) => {
        e.preventDefault();
        const input = currentInputValue;
        if (!input) return;
        //search input value has to contain one slash (/) (e.g: github/hub)
        const slashArr = input.match(/\//g);
        //if it doesn't or it contains multiple slashes, then:
        if (!slashArr || slashArr.length > 1 ) {
            setOrgRepoValue({org:'Invalid search', repo:''})
        }
        else {
            const orgRepo = input.split('/');
            const org = orgRepo[0].toLowerCase();
            const repo = orgRepo[1].toLowerCase();
            setAllData({});
            setOrgRepoValue({org: org, repo: repo});
            setPageNum(1);
        }
    }

    const handleBackHomeClick = () => {
        if (orgRepoValue !== homeOrgRepo) {
            setAllData({});
            setOrgRepoValue(homeOrgRepo);
        }
        else return;
    };

    const handleSetPageNumber = num => {
        setPageNum(num);
        setAllData({});
    };

    const handleItemsPerPage = num => {
        setItemsPerPage(num);
        setPageNum(1);
        setAllData({});
    }

    const handleApiLimitReached = res => {
        setAllData(res);
    }

    useEffect(() => {
        getAllData(org , repo, pageNum, itemsPerPage).then(res =>
            setAllData(res),
            )
    }, [org, repo, pageNum, itemsPerPage]);

    //scroll to top when clicked on some other pageNum
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pageNum]);

    const allDataExists = Object.keys(allData).length > 2;

    if (!allDataExists) {
        if (allData.message) return (
            <React.Fragment>
                <Navbar />
                <div id='alldata_message'>
                    <p>{allData.message}</p>
                    {!allData.message.includes('API') &&
                    <Link to='/' className='message_link'
                        onClick={handleBackHomeClick}
                    >
                       &lt; Back to home page
                    </Link>
                    }
                </div>
            </React.Fragment>
        );
        else return (
            <React.Fragment>
                <Navbar />
                {isHomeUrl ?
                    <FakeIssues />
                  : <div id='loading_issue'><p>Loading Issue...</p></div>
                }
            </React.Fragment>
        );    
    }
    else return (
        <React.Fragment>
            <Navbar />
            <Switch>
                <Route exact path='/'>
                    <IssuesHomePage issues={issues}
                                    fullName={full_name}
                                    openIssuesNum={open_issues_count}
                                    pageNum={pageNum}
                                    itemsPerPage={itemsPerPage}
                                    handleSearchSubmit={handleSearchSubmit}
                                    handleSetPageNumber={handleSetPageNumber}
                                    handleItemsPerPage={handleItemsPerPage}
                    />
                </Route>       
                <Route path='/issue_:issueNum' >
                        <IssueDetailsPage issues={issues}
                                          handleApiLimitReached={handleApiLimitReached} 
                        />
                </Route>
            </Switch>
        </React.Fragment>
    );
}