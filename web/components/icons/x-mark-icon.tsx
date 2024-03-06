import React from "react"
import type { Props } from "./types"

export const XMarkIcon: React.FC<Props> = ({ width = "24", height = "24", className, color }) => (
    <svg
        width={width}
        height={height}
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M12 12.875L7.625 17.25C7.5 17.375 7.35417 17.4375 7.1875 17.4375C7.02083 17.4375 6.875 17.375 6.75 17.25C6.625 17.125 6.5625 16.9792 6.5625 16.8125C6.5625 16.6458 6.625 16.5 6.75 16.375L11.125 12L6.75 7.625C6.625 7.5 6.5625 7.35417 6.5625 7.1875C6.5625 7.02083 6.625 6.875 6.75 6.75C6.875 6.625 7.02083 6.5625 7.1875 6.5625C7.35417 6.5625 7.5 6.625 7.625 6.75L12 11.125L16.375 6.75C16.5 6.625 16.6458 6.5625 16.8125 6.5625C16.9792 6.5625 17.125 6.625 17.25 6.75C17.375 6.875 17.4375 7.02083 17.4375 7.1875C17.4375 7.35417 17.375 7.5 17.25 7.625L12.875 12L17.25 16.375C17.375 16.5 17.4375 16.6458 17.4375 16.8125C17.4375 16.9792 17.375 17.125 17.25 17.25C17.125 17.375 16.9792 17.4375 16.8125 17.4375C16.6458 17.4375 16.5 17.375 16.375 17.25L12 12.875Z"
            fill={color ? color : "currentColor"}
        />
    </svg>
)
