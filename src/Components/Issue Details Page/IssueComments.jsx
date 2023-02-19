import React from 'react';
import { IssueComment } from './IssueComment';
import './Styles/IssueComments.css';

const fakeComment = {
    user : {
        avatar_url: require('../../Images/no-avatar.png'),
        login: 'user_name'
    },
    created_at: new Date().getTime()
};

export function IssueComments({ commentsArray, commentsNum }) {

    if (commentsNum > 0) {
        const fakeCommentsArr = [...Array(commentsNum).keys()];
        const fakeComments = fakeCommentsArr.map((fakeComm, i) => 
            <IssueComment key={i}
                          comment={fakeComment} />
        );
        const comments = commentsArray.map(comm => 
            <IssueComment key={comm.id}
                          comment={comm} />
        );
    
        return (
            <section id='issue-comments'>
                <h3>Comments:</h3>
                {commentsArray.length > 0 ? comments : fakeComments}
            </section>
        );
    }

    else {
        return (
            <p>No comments</p>
        );
    }
}