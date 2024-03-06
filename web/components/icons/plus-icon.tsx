import React from "react"
import type { Props } from "./types"

export const PlusIcon: React.FC<Props> = ({ width = "24", height = "24", className }) => (
    <svg
        width={width}
        height={height}
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M12 19C11.7833 19 11.6042 18.9292 11.4625 18.7875C11.3208 18.6458 11.25 18.4667 11.25 18.25V12.75H5.75C5.53333 12.75 5.35417 12.6792 5.2125 12.5375C5.07083 12.3958 5 12.2167 5 12C5 11.7833 5.07083 11.6042 5.2125 11.4625C5.35417 11.3208 5.53333 11.25 5.75 11.25H11.25V5.75C11.25 5.53333 11.3208 5.35417 11.4625 5.2125C11.6042 5.07083 11.7833 5 12 5C12.2167 5 12.3958 5.07083 12.5375 5.2125C12.6792 5.35417 12.75 5.53333 12.75 5.75V11.25H18.25C18.4667 11.25 18.6458 11.3208 18.7875 11.4625C18.9292 11.6042 19 11.7833 19 12C19 12.2167 18.9292 12.3958 18.7875 12.5375C18.6458 12.6792 18.4667 12.75 18.25 12.75H12.75V18.25C12.75 18.4667 12.6792 18.6458 12.5375 18.7875C12.3958 18.9292 12.2167 19 12 19Z"
            fill="#FFFFFF"
        />
    </svg>
)
