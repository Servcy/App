import React from "react"
import type { Props } from "./types"

export const BlockedIcon: React.FC<Props> = ({ width = "24", height = "24", className }) => (
    <svg
        width={width}
        height={height}
        className={className}
        viewBox="0 0 23 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.5 4.8C0.5 3.52696 1.00797 2.30606 1.91216 1.40589C2.81636 0.505713 4.04271 0 5.32143 0H21.3929C21.6913 0 21.9839 0.0827435 22.2378 0.238959C22.4917 0.395174 22.6968 0.618689 22.8303 0.884458C22.9638 1.15023 23.0203 1.44775 22.9935 1.74369C22.9667 2.03963 22.8576 2.32229 22.6786 2.56L18.5804 8L22.6786 13.44C22.8576 13.6777 22.9667 13.9604 22.9935 14.2563C23.0203 14.5522 22.9638 14.8498 22.8303 15.1155C22.6968 15.3813 22.4917 15.6048 22.2378 15.761C21.9839 15.9173 21.6913 16 21.3929 16H5.32143C4.89519 16 4.4864 16.1686 4.18501 16.4686C3.88361 16.7687 3.71429 17.1757 3.71429 17.6V22.4C3.71429 22.8243 3.54496 23.2313 3.24356 23.5314C2.94217 23.8314 2.53338 24 2.10714 24C1.6809 24 1.27212 23.8314 0.970721 23.5314C0.669323 23.2313 0.5 22.8243 0.5 22.4V4.8Z"
            fill="#F76659"
        />
        <path
            d="M8.5918 20.4812H21.084C21.26 20.4812 21.4056 20.4237 21.5207 20.3086C21.6358 20.1935 21.6934 20.0479 21.6934 19.8719C21.6934 19.6958 21.6358 19.5503 21.5207 19.4352C21.4056 19.3201 21.26 19.2625 21.084 19.2625H8.57148L10.3184 17.5156C10.4267 17.4073 10.4809 17.2719 10.4809 17.1094C10.4809 16.9469 10.4199 16.8047 10.298 16.6828C10.1762 16.5609 10.034 16.5 9.87148 16.5C9.70899 16.5 9.5668 16.5609 9.44492 16.6828L6.68242 19.4453C6.61471 19.513 6.56732 19.5807 6.54023 19.6484C6.51315 19.7161 6.49961 19.7906 6.49961 19.8719C6.49961 19.9531 6.51315 20.0276 6.54023 20.0953C6.56732 20.163 6.61471 20.2307 6.68242 20.2984L9.44492 23.0609C9.58034 23.1964 9.72591 23.2607 9.88164 23.2539C10.0374 23.2471 10.1762 23.1828 10.298 23.0609C10.4199 22.9391 10.4809 22.7935 10.4809 22.6242C10.4809 22.4549 10.4267 22.3161 10.3184 22.2078L8.5918 20.4812Z"
            fill="#F76659"
        />
    </svg>
)
