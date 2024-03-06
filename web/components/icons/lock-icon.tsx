import React from "react"
import type { Props } from "./types"

export const LockIcon: React.FC<Props> = ({ width = "24", height = "24", className }) => (
    <svg
        width={width}
        height={height}
        className={className}
        viewBox="0 0 25 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M6 22C5.58333 22 5.22917 21.8542 4.9375 21.5625C4.64583 21.2708 4.5 20.9167 4.5 20.5V9.65C4.5 9.23333 4.64583 8.87917 4.9375 8.5875C5.22917 8.29583 5.58333 8.15 6 8.15H7.75V5.75C7.75 4.43333 8.2125 3.3125 9.1375 2.3875C10.0625 1.4625 11.1833 1 12.5 1C13.8167 1 14.9375 1.4625 15.8625 2.3875C16.7875 3.3125 17.25 4.43333 17.25 5.75V8.15H19C19.4167 8.15 19.7708 8.29583 20.0625 8.5875C20.3542 8.87917 20.5 9.23333 20.5 9.65V20.5C20.5 20.9167 20.3542 21.2708 20.0625 21.5625C19.7708 21.8542 19.4167 22 19 22H6ZM6 20.5H19V9.65H6V20.5ZM12.5 17C13.0333 17 13.4875 16.8167 13.8625 16.45C14.2375 16.0833 14.425 15.6417 14.425 15.125C14.425 14.625 14.2375 14.1708 13.8625 13.7625C13.4875 13.3542 13.0333 13.15 12.5 13.15C11.9667 13.15 11.5125 13.3542 11.1375 13.7625C10.7625 14.1708 10.575 14.625 10.575 15.125C10.575 15.6417 10.7625 16.0833 11.1375 16.45C11.5125 16.8167 11.9667 17 12.5 17ZM9.25 8.15H15.75V5.75C15.75 4.85 15.4333 4.08333 14.8 3.45C14.1667 2.81667 13.4 2.5 12.5 2.5C11.6 2.5 10.8333 2.81667 10.2 3.45C9.56667 4.08333 9.25 4.85 9.25 5.75V8.15ZM6 20.5V9.65V20.5Z" />
    </svg>
)
