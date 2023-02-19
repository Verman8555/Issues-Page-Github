import React, { useEffect, useState } from 'react';
import { IssueDetails } from './IssueDetails';
import { IssueSummary } from './IssueSummary';
import { IssueComments } from './IssueComments';
import { getIssueComments } from '../../Api/api';
import { Link, useLocation } from 'react-router-dom';
import './Styles/IssueDetailsPage.css';

export function IssueDetailsPage({ issues, handleApiLimitReached }) {

    const location = useLocation();

    const { state } = location;

    const { issueNumber } = state;

    const [issueComments, setIssueComments] = useState([]);

    const chosenIssue = issues && issues.filter(issue => issue.number === issueNumber)[0];

    const commentsExist = chosenIssue && chosenIssue.comments > 0;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (chosenIssue && commentsExist) {
            getIssueComments(chosenIssue.comments_url).then(res => {
                /* check if incoming result is array, if it isn't - we've 
                reached the api calls limit, and result is an object with message key */
                if (Array.isArray(res)) setIssueComments(res);
                else handleApiLimitReached(res);
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <main id='issue-details-page'>
            <Link className='link' to={{pathname: '/'}}>
                    <p className='back'>&lsaquo; Back to all Issues</p>
            </Link>
            {chosenIssue ?
                <div id='issue-details-content-wrap'>
                    <IssueDetails chosenIssue={chosenIssue}/>
                    <IssueSummary body={chosenIssue.body}/>
                    <IssueComments commentsArray={issueComments}
                                commentsNum={chosenIssue.comments} />
                </div>
            :   <p>Something went wrong. Go back to home page and restart the browser, to see all issues.</p>
            }
        </main>
    )
}
