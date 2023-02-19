import React from 'react';
import { FakeIssue } from './FakeIssue';

export function FakeIssuesList() {

    const randomInteger = (min, max) => (
        Math.floor(Math.random() * (max - min) + min)
    ); 

    const array = [...Array(20).keys()];  
    
    const fakeList = array.map(num => 
        <li key={num}>
            <FakeIssue />
        </li>
    );

    return (
        <section className='issues-list'>
            <h2>{randomInteger(100, 1000)} open issues for :org/:repo </h2>
            <div className='list-header'>
                <p>Page 1/1</p>
                <div>
                    <label>Issues per page:&nbsp;</label>
                    <select name='per-page'></select>
                </div>
            </div>
            <ol>{fakeList}</ol>
        </section>
    );
}