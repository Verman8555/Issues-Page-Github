import React from 'react';

export function UserDetails({ userImage, userName }) {

    return (
        <figure>
            <img src={userImage} alt={`${userName}-avatar`} />
            <figcaption>
                {userName}
            </figcaption>
        </figure>
    );
}