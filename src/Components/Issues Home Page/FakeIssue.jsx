import React from 'react';
import {UserDetails, IssueLabels } from '../- Joint components -/AllJointComponents';

export function FakeIssue() {

    const fakeLabels = [
        {id: 1, name: 'please wait', color: '7FFFD4'},
        {id: 2, name: 'coming soon', color: 'F08080'},
        {id: 3, name: 'be patient', color: 'F0E68C'},
        {id: 4, name: 'just a sec', color: '98FB98'}
    ];

    const someFakeLabels = fakeLabels => {
        const upTo4 = Math.floor(Math.random() * 5);
        return fakeLabels.slice(0, upTo4);
    }

    return (
        <div className='issue_wrap_all fake_all'>
            <UserDetails userImage={require('./../../Images/no-avatar.png')}
                         userName='User' />
            <div className='issue_text_wrap'>
                <div className='issue_wrap_up fake_up'></div>
                <div className='issue_wrap_down fake_down'>
                    <div id='title_placeholder'></div>
                    <IssueLabels labels={someFakeLabels(fakeLabels)} />
                </div>
            </div>
        </div>
    );
}