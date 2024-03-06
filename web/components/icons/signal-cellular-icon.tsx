import React from "react";

import type { Props } from "./types";

export const SignalCellularIcon: React.FC<Props> = ({ width = "24", height = "24", className }) => (
    <svg
        width={width}
        height={height}
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M18.75 20C18.4 20 18.1042 19.8792 17.8625 19.6375C17.6208 19.3958 17.5 19.1 17.5 18.75V5.25C17.5 4.9 17.6208 4.60417 17.8625 4.3625C18.1042 4.12083 18.4 4 18.75 4C19.1 4 19.3958 4.12083 19.6375 4.3625C19.8792 4.60417 20 4.9 20 5.25V18.75C20 19.1 19.8792 19.3958 19.6375 19.6375C19.3958 19.8792 19.1 20 18.75 20ZM6.275 20C6.09167 20 5.92083 19.9667 5.7625 19.9C5.60417 19.8333 5.47083 19.7458 5.3625 19.6375C5.25417 19.5292 5.16667 19.3958 5.1 19.2375C5.03333 19.0792 5 18.9167 5 18.75V15.25C5 14.9 5.12083 14.6042 5.3625 14.3625C5.60417 14.1208 5.9 14 6.25 14C6.6 14 6.89583 14.1208 7.1375 14.3625C7.37917 14.6042 7.5 14.9 7.5 15.25V18.75C7.5 18.9167 7.46667 19.0792 7.4 19.2375C7.33333 19.3958 7.24583 19.5292 7.1375 19.6375C7.02917 19.7458 6.9 19.8333 6.75 19.9C6.6 19.9667 6.44167 20 6.275 20ZM12.5 20C12.15 20 11.8542 19.8792 11.6125 19.6375C11.3708 19.3958 11.25 19.1 11.25 18.75V10.25C11.25 9.9 11.3708 9.60417 11.6125 9.3625C11.8542 9.12083 12.15 9 12.5 9C12.85 9 13.1458 9.12083 13.3875 9.3625C13.6292 9.60417 13.75 9.9 13.75 10.25V18.75C13.75 19.1 13.6292 19.3958 13.3875 19.6375C13.1458 19.8792 12.85 20 12.5 20Z"
            fill="#212529"
        />
    </svg>
);
