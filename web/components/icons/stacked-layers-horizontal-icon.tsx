import React from "react";

import type { Props } from "./types";

export const StackedLayersHorizontalIcon: React.FC<Props> = ({
    width = "24",
    height = "24",
    className,
    color = "rgb(var(--color-text-200))",
}) => (
    <svg
        width={width}
        height={height}
        className={className}
        viewBox="0 0 17 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M4.16567 12.75C3.849 12.75 3.56862 12.6312 3.32452 12.3937C3.08042 12.1562 2.95837 11.8792 2.95837 11.5625V4.81354C2.95837 4.64531 3.0156 4.5043 3.13007 4.39049C3.24454 4.27669 3.38638 4.21979 3.55559 4.21979C3.72481 4.21979 3.86549 4.27669 3.97764 4.39049C4.0898 4.5043 4.14587 4.64531 4.14587 4.81354V11.5625H12.5177C12.686 11.5625 12.827 11.6197 12.9408 11.7342C13.0546 11.8487 13.1115 11.9905 13.1115 12.1597C13.1115 12.3289 13.0546 12.4696 12.9408 12.5818C12.827 12.6939 12.686 12.75 12.5177 12.75H4.16567ZM6.52087 10.375C6.20421 10.375 5.92712 10.2562 5.68962 10.0187C5.45212 9.78125 5.33337 9.50417 5.33337 9.1875V2.0625C5.33337 1.74583 5.45212 1.46875 5.68962 1.23125C5.92712 0.99375 6.20421 0.875 6.52087 0.875H15.2292C15.5459 0.875 15.823 0.99375 16.0605 1.23125C16.298 1.46875 16.4167 1.74583 16.4167 2.0625V9.1875C16.4167 9.50417 16.298 9.78125 16.0605 10.0187C15.823 10.2562 15.5459 10.375 15.2292 10.375H6.52087ZM6.52087 9.1875H15.2292V3.28958H6.52087V9.1875ZM1.77087 15.125C1.45421 15.125 1.17712 15.0062 0.939624 14.7687C0.702124 14.5312 0.583374 14.2542 0.583374 13.9375V7.18854C0.583374 7.02031 0.640605 6.8793 0.755067 6.76549C0.869542 6.65169 1.01138 6.59479 1.18059 6.59479C1.34981 6.59479 1.49049 6.65169 1.60264 6.76549C1.7148 6.8793 1.77087 7.02031 1.77087 7.18854V13.9375H10.123C10.2912 13.9375 10.4322 13.9947 10.546 14.1092C10.6598 14.2237 10.7167 14.3655 10.7167 14.5347C10.7167 14.7039 10.6598 14.8446 10.546 14.9568C10.4322 15.0689 10.2912 15.125 10.123 15.125H1.77087Z"
            fill={color}
        />
    </svg>
);
