import React from "react";

import type { Props } from "./types";

export const EllipsisHorizontalIcon: React.FC<Props> = ({ width, height, className }) => (
    <svg
        width={width}
        height={height}
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M5.2 13.1998C4.86667 13.1998 4.58333 13.0831 4.35 12.8498C4.11667 12.6165 4 12.3331 4 11.9998C4 11.6665 4.11667 11.3831 4.35 11.1498C4.58333 10.9165 4.86667 10.7998 5.2 10.7998C5.53333 10.7998 5.81667 10.9165 6.05 11.1498C6.28333 11.3831 6.4 11.6665 6.4 11.9998C6.4 12.3331 6.28333 12.6165 6.05 12.8498C5.81667 13.0831 5.53333 13.1998 5.2 13.1998ZM12 13.1998C11.6667 13.1998 11.3833 13.0831 11.15 12.8498C10.9167 12.6165 10.8 12.3331 10.8 11.9998C10.8 11.6665 10.9167 11.3831 11.15 11.1498C11.3833 10.9165 11.6667 10.7998 12 10.7998C12.3333 10.7998 12.6167 10.9165 12.85 11.1498C13.0833 11.3831 13.2 11.6665 13.2 11.9998C13.2 12.3331 13.0833 12.6165 12.85 12.8498C12.6167 13.0831 12.3333 13.1998 12 13.1998ZM18.8 13.1998C18.4667 13.1998 18.1833 13.0831 17.95 12.8498C17.7167 12.6165 17.6 12.3331 17.6 11.9998C17.6 11.6665 17.7167 11.3831 17.95 11.1498C18.1833 10.9165 18.4667 10.7998 18.8 10.7998C19.1333 10.7998 19.4167 10.9165 19.65 11.1498C19.8833 11.3831 20 11.6665 20 11.9998C20 12.3331 19.8833 12.6165 19.65 12.8498C19.4167 13.0831 19.1333 13.1998 18.8 13.1998Z"
            fill="black"
        />
    </svg>
);
