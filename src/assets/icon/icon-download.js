import React from 'react';

export default (props) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity={props.opacity || ''} d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"
            fill={props.fill || "#FFFFFF"}
        />
    </svg>
);