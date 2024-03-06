import React from "react";

import type { Props } from "./types";

export const ClipboardIcon: React.FC<Props> = ({ width = "24", height = "24", className }) => (
    <svg
        width={width}
        height={height}
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M4.5 21C4.08333 21 3.72917 20.8542 3.4375 20.5625C3.14583 20.2708 3 19.9167 3 19.5V4.5C3 4.08333 3.14583 3.72917 3.4375 3.4375C3.72917 3.14583 4.08333 3 4.5 3H9.625C9.70833 2.41667 9.975 1.9375 10.425 1.5625C10.875 1.1875 11.4 1 12 1C12.6 1 13.125 1.1875 13.575 1.5625C14.025 1.9375 14.2917 2.41667 14.375 3H19.5C19.9167 3 20.2708 3.14583 20.5625 3.4375C20.8542 3.72917 21 4.08333 21 4.5V19.5C21 19.9167 20.8542 20.2708 20.5625 20.5625C20.2708 20.8542 19.9167 21 19.5 21H4.5ZM4.5 19.5H19.5V4.5H4.5V19.5ZM7 17H13.825V15.5H7V17ZM7 12.75H17V11.25H7V12.75ZM7 8.5H17V7H7V8.5ZM12 4.075C12.2333 4.075 12.4375 3.9875 12.6125 3.8125C12.7875 3.6375 12.875 3.43333 12.875 3.2C12.875 2.96667 12.7875 2.7625 12.6125 2.5875C12.4375 2.4125 12.2333 2.325 12 2.325C11.7667 2.325 11.5625 2.4125 11.3875 2.5875C11.2125 2.7625 11.125 2.96667 11.125 3.2C11.125 3.43333 11.2125 3.6375 11.3875 3.8125C11.5625 3.9875 11.7667 4.075 12 4.075ZM4.5 19.5V4.5V19.5Z"
            fill="black"
        />
    </svg>
);
