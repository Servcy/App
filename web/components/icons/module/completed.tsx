import React from "react";

type Props = {
    width?: string;
    height?: string;
    className?: string;
    color?: string;
};

export const ModuleCompletedIcon: React.FC<Props> = ({ width = "20", height = "20", className }) => (
    <svg
        width={width}
        height={height}
        className={className}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M6.80486 9.80731L4.84856 7.85103C4.73197 7.73443 4.58542 7.67478 4.4089 7.67208C4.23238 7.66937 4.08312 7.72902 3.96113 7.85103C3.83913 7.97302 3.77814 8.12093 3.77814 8.29474C3.77814 8.46855 3.83913 8.61645 3.96113 8.73844L6.27206 11.0494C6.42428 11.2016 6.60188 11.2777 6.80486 11.2777C7.00782 11.2777 7.18541 11.2016 7.33764 11.0494L12.0227 6.36435C12.1393 6.24776 12.1989 6.10121 12.2016 5.92469C12.2043 5.74817 12.1447 5.59891 12.0227 5.47692C11.9007 5.35493 11.7528 5.29393 11.579 5.29393C11.4051 5.29393 11.2572 5.35493 11.1353 5.47692L6.80486 9.80731ZM8.00141 16C6.89494 16 5.85491 15.79 4.88132 15.3701C3.90772 14.9502 3.06082 14.3803 2.34064 13.6604C1.62044 12.9405 1.05028 12.094 0.63017 11.1208C0.210057 10.1477 0 9.10788 0 8.00141C0 6.89494 0.209966 5.85491 0.629896 4.88132C1.04983 3.90772 1.61972 3.06082 2.33958 2.34064C3.05946 1.62044 3.90598 1.05028 4.87915 0.630171C5.8523 0.210058 6.89212 0 7.99859 0C9.10506 0 10.1451 0.209966 11.1187 0.629897C12.0923 1.04983 12.9392 1.61972 13.6594 2.33959C14.3796 3.05946 14.9497 3.90598 15.3698 4.87915C15.7899 5.8523 16 6.89212 16 7.99859C16 9.10506 15.79 10.1451 15.3701 11.1187C14.9502 12.0923 14.3803 12.9392 13.6604 13.6594C12.9405 14.3796 12.094 14.9497 11.1208 15.3698C10.1477 15.7899 9.10788 16 8.00141 16ZM8 14.7369C9.88071 14.7369 11.4737 14.0842 12.779 12.779C14.0842 11.4737 14.7369 9.88071 14.7369 8C14.7369 6.11929 14.0842 4.52631 12.779 3.22104C11.4737 1.91577 9.88071 1.26314 8 1.26314C6.11929 1.26314 4.52631 1.91577 3.22104 3.22104C1.91577 4.52631 1.26314 6.11929 1.26314 8C1.26314 9.88071 1.91577 11.4737 3.22104 12.779C4.52631 14.0842 6.11929 14.7369 8 14.7369Z"
            fill="#16a34a"
        />
    </svg>
);
