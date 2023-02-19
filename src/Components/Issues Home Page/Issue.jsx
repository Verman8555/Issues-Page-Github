import React from 'react';
import { UserDetails, IssueNumber, TimeAgo, IssueStatus, IssueTitle, IssueLabels } from '../- Joint components -/AllJointComponents';
import { Link } from 'react-router-dom';
import './Styles/Issue.css'

export function Issue({ issue, fullName, pageNum }) {

    const {
        user,
        number,
        state,
        created_at,
        comments,
        title,
        labels
    } = issue;

    const orgRepoArr = fullName.split('/');
    const org = orgRepoArr[0];
    const repo = orgRepoArr[1];

    const issueLink = {
        pathname: `/issue_${number}`, 
        state: {
            issueNumber: number,
            pageNumber: pageNum,
            org: org, 
            repo: repo,
        }
    };

    return (
        <div className='issue_wrap_all'>
            <UserDetails userImage={user.avatar_url}
                         userName={user.login} />
            <div className='issue_text_wrap'>
                <div className='issue_wrap_up'>
                    <div className='issue_wrap_left'>
                        <IssueNumber issueNumber={number} />
                        <IssueStatus status={state + 'ed'} />
                        <TimeAgo time={created_at} />
                    </div>
                    {comments > 0 &&
                        <div className='issue_wrap_right'>
                            <img src={require('../../Images/comment.png')} alt='comment_icon' />
                            {comments}
                        </div>
                    }
                </div>
                <div className='issue_wrap_down'>
                    <Link to={issueLink} className='link'>
                        <IssueTitle title={title} />
                    </Link>     
                    <IssueLabels labels={labels} />
                </div>
            </div>
        </div>
    );
}