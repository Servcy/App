import React from "react";

import type { Props } from "./types";

export const ClockIcon: React.FC<Props> = ({ width = "24", height = "24", className, color }) => (
    <svg
        width={width}
        height={height}
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M12.6876 11.7513V8.1888C12.6876 8.00825 12.6286 7.85894 12.5105 7.74088C12.3924 7.62283 12.2431 7.5638 12.0626 7.5638C11.882 7.5638 11.7327 7.62283 11.6147 7.74088C11.4966 7.85894 11.4376 8.00825 11.4376 8.1888V12.0013C11.4376 12.0846 11.4515 12.161 11.4792 12.2305C11.507 12.2999 11.5487 12.3694 11.6042 12.4388L14.6042 15.543C14.7292 15.6819 14.8855 15.7478 15.073 15.7409C15.2605 15.7339 15.4167 15.668 15.5417 15.543C15.6667 15.418 15.7292 15.2652 15.7292 15.0846C15.7292 14.9041 15.6667 14.7513 15.5417 14.6263L12.6876 11.7513ZM12.0001 20.3346C10.8612 20.3346 9.7848 20.1159 8.77091 19.6784C7.75703 19.2409 6.87161 18.6437 6.11466 17.8867C5.35772 17.1298 4.7605 16.2444 4.323 15.2305C3.8855 14.2166 3.66675 13.1402 3.66675 12.0013C3.66675 10.8624 3.8855 9.78602 4.323 8.77213C4.7605 7.75825 5.35772 6.87283 6.11466 6.11589C6.87161 5.35894 7.75703 4.76172 8.77091 4.32422C9.7848 3.88672 10.8612 3.66797 12.0001 3.66797C13.139 3.66797 14.2154 3.88672 15.2292 4.32422C16.2431 4.76172 17.1286 5.35894 17.8855 6.11589C18.6424 6.87283 19.2397 7.75825 19.6772 8.77213C20.1147 9.78602 20.3334 10.8624 20.3334 12.0013C20.3334 13.1402 20.1147 14.2166 19.6772 15.2305C19.2397 16.2444 18.6424 17.1298 17.8855 17.8867C17.1286 18.6437 16.2431 19.2409 15.2292 19.6784C14.2154 20.1159 13.139 20.3346 12.0001 20.3346ZM12.0001 19.0846C13.9445 19.0846 15.6112 18.3902 17.0001 17.0013C18.389 15.6124 19.0834 13.9457 19.0834 12.0013C19.0834 10.0569 18.389 8.39019 17.0001 7.0013C15.6112 5.61241 13.9445 4.91797 12.0001 4.91797C10.0556 4.91797 8.38897 5.61241 7.00008 7.0013C5.61119 8.39019 4.91675 10.0569 4.91675 12.0013C4.91675 13.9457 5.61119 15.6124 7.00008 17.0013C8.38897 18.3902 10.0556 19.0846 12.0001 19.0846Z"
            fill={color ? color : "currentColor"}
        />
    </svg>
);
