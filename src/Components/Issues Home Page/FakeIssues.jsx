import React from 'react';
import { FakeIssuesList } from './FakeIssuesList';

export function FakeIssues() {
    return (
        <main id='issues-home-page'>
        <form>
            <input type='search' 
                   placeholder='Enter :org/:repo (e.g., github/hub)' 
            />
            <input type='submit' value='Search' />
        </form>
        <FakeIssuesList />
    </main>
    )
}
