import React from "react";

import type { Props } from "./types";

export const PeopleGroupIcon: React.FC<Props> = ({
    width = "24",
    height = "16",
    color = "rgb(var(--color-text-200))",
    className,
}) => (
    <svg
        width={width}
        height={height}
        className={className}
        viewBox="0 0 20 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fill={color}
            d="M12.2951 6.66667C13.1001 6.66667 13.7534 7.18933 13.7534 7.83333V10.9993C13.7534 11.7952 13.3582 12.5584 12.6548 13.1211C11.9514 13.6839 10.9974 14 10.0026 14C9.0078 14 8.05376 13.6839 7.35034 13.1211C6.64692 12.5584 6.25175 11.7952 6.25175 10.9993V7.83333C6.25175 7.18933 6.90425 6.66667 7.71008 6.66667H12.2951ZM12.2951 7.66667H7.71008C7.65483 7.66667 7.60184 7.68423 7.56277 7.71548C7.5237 7.74674 7.50175 7.78913 7.50175 7.83333V10.9993C7.50175 11.5299 7.76523 12.0388 8.23422 12.414C8.70322 12.7892 9.33932 13 10.0026 13C10.6658 13 11.3019 12.7892 11.7709 12.414C12.2399 12.0388 12.5034 11.5299 12.5034 10.9993V7.83333C12.5034 7.78913 12.4815 7.74674 12.4424 7.71548C12.4033 7.68423 12.3503 7.66667 12.2951 7.66667ZM3.12508 6.66667H5.94258C5.64858 6.95073 5.46903 7.29937 5.42758 7.66667H3.12508C3.06983 7.66667 3.01684 7.68423 2.97777 7.71548C2.9387 7.74674 2.91675 7.78913 2.91675 7.83333V9.99933C2.91669 10.2513 2.988 10.4999 3.12531 10.7266C3.26262 10.9533 3.46236 11.1522 3.70952 11.3083C3.95669 11.4644 4.24486 11.5737 4.55239 11.6279C4.85991 11.6821 5.17879 11.6799 5.48508 11.6213C5.55591 11.9573 5.68508 12.278 5.86258 12.576C5.36865 12.6817 4.85094 12.6951 4.34949 12.6152C3.84804 12.5353 3.37629 12.3642 2.9707 12.1151C2.56512 11.866 2.23657 11.5457 2.01047 11.1788C1.78436 10.8119 1.66676 10.4084 1.66675 9.99933V7.83333C1.66675 7.18933 2.32008 6.66667 3.12508 6.66667ZM14.0626 6.66667H16.8751C17.6801 6.66667 18.3334 7.18933 18.3334 7.83333V10C18.3335 10.4088 18.2162 10.8121 17.9904 11.1788C17.7646 11.5455 17.4365 11.8658 17.0314 12.1149C16.6262 12.364 16.155 12.5353 15.6539 12.6155C15.1529 12.6956 14.6355 12.6826 14.1417 12.5773C14.3201 12.2787 14.4492 11.958 14.5209 11.622C14.8268 11.6798 15.1451 11.6815 15.452 11.627C15.7588 11.5725 16.0463 11.4631 16.2928 11.307C16.5393 11.151 16.7384 10.9524 16.8754 10.726C17.0123 10.4997 17.0834 10.2515 17.0834 10V7.83333C17.0834 7.78913 17.0615 7.74674 17.0224 7.71548C16.9833 7.68423 16.9303 7.66667 16.8751 7.66667H14.5776C14.5361 7.29937 14.3566 6.95073 14.0626 6.66667ZM10.0001 2C10.6631 2 11.299 2.21071 11.7678 2.58579C12.2367 2.96086 12.5001 3.46957 12.5001 4C12.5001 4.53043 12.2367 5.03914 11.7678 5.41421C11.299 5.78929 10.6631 6 10.0001 6C9.33704 6 8.70115 5.78929 8.23231 5.41421C7.76347 5.03914 7.50008 4.53043 7.50008 4C7.50008 3.46957 7.76347 2.96086 8.23231 2.58579C8.70115 2.21071 9.33704 2 10.0001 2ZM15.4167 2.66667C15.9693 2.66667 16.4992 2.84226 16.8899 3.15482C17.2806 3.46738 17.5001 3.89131 17.5001 4.33333C17.5001 4.77536 17.2806 5.19928 16.8899 5.51184C16.4992 5.82441 15.9693 6 15.4167 6C14.8642 6 14.3343 5.82441 13.9436 5.51184C13.5529 5.19928 13.3334 4.77536 13.3334 4.33333C13.3334 3.89131 13.5529 3.46738 13.9436 3.15482C14.3343 2.84226 14.8642 2.66667 15.4167 2.66667ZM4.58341 2.66667C5.13595 2.66667 5.66585 2.84226 6.05655 3.15482C6.44725 3.46738 6.66675 3.89131 6.66675 4.33333C6.66675 4.77536 6.44725 5.19928 6.05655 5.51184C5.66585 5.82441 5.13595 6 4.58341 6C4.03088 6 3.50098 5.82441 3.11028 5.51184C2.71957 5.19928 2.50008 4.77536 2.50008 4.33333C2.50008 3.89131 2.71957 3.46738 3.11028 3.15482C3.50098 2.84226 4.03088 2.66667 4.58341 2.66667ZM10.0001 3C9.66856 3 9.35062 3.10536 9.1162 3.29289C8.88178 3.48043 8.75008 3.73478 8.75008 4C8.75008 4.26522 8.88178 4.51957 9.1162 4.70711C9.35062 4.89464 9.66856 5 10.0001 5C10.3316 5 10.6495 4.89464 10.884 4.70711C11.1184 4.51957 11.2501 4.26522 11.2501 4C11.2501 3.73478 11.1184 3.48043 10.884 3.29289C10.6495 3.10536 10.3316 3 10.0001 3ZM15.4167 3.66667C15.1957 3.66667 14.9838 3.7369 14.8275 3.86193C14.6712 3.98695 14.5834 4.15652 14.5834 4.33333C14.5834 4.51014 14.6712 4.67971 14.8275 4.80474C14.9838 4.92976 15.1957 5 15.4167 5C15.6378 5 15.8497 4.92976 16.006 4.80474C16.1623 4.67971 16.2501 4.51014 16.2501 4.33333C16.2501 4.15652 16.1623 3.98695 16.006 3.86193C15.8497 3.7369 15.6378 3.66667 15.4167 3.66667ZM4.58341 3.66667C4.3624 3.66667 4.15044 3.7369 3.99416 3.86193C3.83788 3.98695 3.75008 4.15652 3.75008 4.33333C3.75008 4.51014 3.83788 4.67971 3.99416 4.80474C4.15044 4.92976 4.3624 5 4.58341 5C4.80443 5 5.01639 4.92976 5.17267 4.80474C5.32895 4.67971 5.41675 4.51014 5.41675 4.33333C5.41675 4.15652 5.32895 3.98695 5.17267 3.86193C5.01639 3.7369 4.80443 3.66667 4.58341 3.66667Z"
        />
    </svg>
);
