import React from 'react';
import { IssueTitle, IssueNumber, TimeAgo, IssueLabels, IssueStatus, UserDetails } from '../- Joint components -/AllJointComponents';
import './Styles/IssueDetails.css'
export function IssueDetails({ chosenIssue }) {

    const {
        user,
        number,
        state,
        created_at,
        title,
        labels
    } = chosenIssue;

    return (
        <section id='issue-details'>
            <IssueTitle title={title} />
            <div id='issue-details-wrap'>
                <div id='left-wrap'>
                    <div id='upper-wrap'>          
                        <IssueNumber issueNumber={number}/>
                        created&nbsp;
                        <TimeAgo time={created_at}/>                        
                    </div>
                    <IssueLabels labels={labels} />
                </div>
                <div id='status-wrap'>
                    <IssueStatus status={state} /> 
                </div>
                <div id='ud-wrap'>
                <UserDetails userImage={user.avatar_url}
                             userName={user.login} />
                </div>
            </div>
        </section>
    );
}
