import React from 'react';
import { calcTimeAgo } from '../../Utilities/helperFunctions';

export function TimeAgo({ time }) {

    return (
        <p>{calcTimeAgo(time)}</p>
    );
}