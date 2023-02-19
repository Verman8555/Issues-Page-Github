import React from 'react';
import { UserDetails, TimeAgo } from '../- Joint components -/AllJointComponents';
import ReactMarkdown from 'react-markdown';
import './Styles/IssueComment.css';

export function IssueComment({ comment }) {

    const { user, created_at, body } = comment;

    return (
        <div id='issue-comment'>
            <UserDetails userImage={user.avatar_url}
                         userName={user.login} />
            <div id='issue-comment-wrap'>
                <div id='comment-time'>
                    commented&nbsp;
                    <TimeAgo time={created_at} />
                </div>
                <div>
                    <ReactMarkdown source={body} 
                                   className={`markdown ${!body && 'fake_comment'}`} />
                </div>
            </div>
        </div>
    );
}
