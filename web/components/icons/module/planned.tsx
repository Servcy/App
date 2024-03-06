import React from "react";

type Props = {
    width?: string;
    height?: string;
    className?: string;
    color?: string;
};

export const ModulePlannedIcon: React.FC<Props> = ({ width = "20", height = "20", className }) => (
    <svg
        width={width}
        height={height}
        className={className}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M8.57177 7.43329L11.3665 10.228C11.4883 10.3498 11.5441 10.4809 11.5339 10.6213C11.5238 10.7617 11.4578 10.8928 11.336 11.0146C11.2142 11.1364 11.0794 11.1973 10.9317 11.1973C10.784 11.1973 10.6492 11.1364 10.5274 11.0146L7.64476 8.12349C7.57709 8.05582 7.52408 7.98139 7.48574 7.90018C7.4474 7.81898 7.42823 7.72538 7.42823 7.61936V3.51362C7.42823 3.35574 7.48405 3.22097 7.5957 3.10932C7.70734 2.99768 7.84211 2.94185 8 2.94185C8.15789 2.94185 8.29266 2.99768 8.4043 3.10932C8.51595 3.22097 8.57177 3.35574 8.57177 3.51362V7.43329ZM0.806954 11.4933C0.573486 11.04 0.390212 10.5655 0.257131 10.0698C0.124064 9.57411 0.0383541 9.07477 0 8.57177H1.15709C1.18077 8.98793 1.24646 9.38746 1.35418 9.77036C1.46188 10.1533 1.60427 10.5297 1.78133 10.8996L0.806954 11.4933ZM0.021992 7.42823C0.0603462 6.92523 0.143806 6.4273 0.272371 5.93444C0.400937 5.4416 0.579131 4.96567 0.806954 4.50665L1.80333 5.07842C1.62062 5.44834 1.47315 5.82983 1.36093 6.22287C1.24872 6.61591 1.18077 7.0177 1.15709 7.42823H0.021992ZM3.52381 14.6128C3.10877 14.3286 2.71855 14.0103 2.35315 13.6578C1.98774 13.3054 1.66294 12.9217 1.37872 12.5067L2.3751 11.9044C2.5939 12.2507 2.84879 12.5656 3.13976 12.8492C3.43073 13.1329 3.74934 13.3914 4.09558 13.6249L3.52381 14.6128ZM2.3751 4.09558L1.37872 3.52381C1.66294 3.09411 1.98408 2.70163 2.34215 2.34637C2.70023 1.99112 3.09411 1.67139 3.52381 1.38719L4.09558 2.3751C3.75837 2.60856 3.44568 2.86571 3.15753 3.14653C2.86937 3.42736 2.60856 3.7437 2.3751 4.09558ZM7.42823 16C6.92523 15.9616 6.4273 15.8745 5.93444 15.7386C5.4416 15.6027 4.96567 15.4209 4.50665 15.193L5.07842 14.2187C5.44834 14.4014 5.82983 14.5452 6.22287 14.6501C6.61591 14.7549 7.0177 14.8192 7.42823 14.8429V16ZM5.10042 1.80333L4.50665 0.806954C4.96567 0.579131 5.4416 0.397272 5.93444 0.261376C6.4273 0.125479 6.92523 0.0383541 7.42823 0V1.15709C7.0177 1.18077 6.61957 1.24872 6.23386 1.36093C5.84815 1.47315 5.47034 1.62062 5.10042 1.80333ZM8.57177 16V14.8429C8.9823 14.8192 9.38409 14.7549 9.77713 14.6501C10.1702 14.5452 10.5517 14.4014 10.9216 14.2187L11.4933 15.193C11.0343 15.4209 10.5584 15.6027 10.0656 15.7386C9.5727 15.8745 9.07477 15.9616 8.57177 16ZM10.9216 1.78133C10.5517 1.59862 10.1702 1.45482 9.77713 1.34994C9.38409 1.24505 8.9823 1.18077 8.57177 1.15709V0C9.07477 0.0383541 9.5727 0.125479 10.0656 0.261376C10.5584 0.397272 11.0343 0.579131 11.4933 0.806954L10.9216 1.78133ZM12.4762 14.6128L11.9044 13.6469C12.2563 13.4134 12.5726 13.149 12.8535 12.8535C13.1343 12.558 13.3914 12.2416 13.6249 11.9044L14.6128 12.4982C14.3286 12.9132 14.0052 13.297 13.6426 13.6494C13.28 14.0018 12.8912 14.323 12.4762 14.6128ZM13.6249 4.08713C13.3914 3.74991 13.1306 3.43862 12.8425 3.15328C12.5543 2.86796 12.2416 2.60856 11.9044 2.3751L12.4762 1.38719C12.8912 1.67703 13.28 1.99817 13.6426 2.3506C14.0052 2.70304 14.3314 3.08678 14.6213 3.50181L13.6249 4.08713ZM14.8429 7.42823C14.8192 7.0177 14.7535 6.61957 14.6458 6.23386C14.5381 5.84815 14.3929 5.46752 14.2102 5.09197L15.193 4.50665C15.4265 4.96003 15.6098 5.43314 15.7429 5.926C15.8759 6.41884 15.9616 6.91958 16 7.42823H14.8429ZM15.193 11.4933L14.2187 10.9216C14.4014 10.5517 14.5452 10.1702 14.6501 9.77713C14.7549 9.38409 14.8192 8.9823 14.8429 8.57177H16C15.9616 9.07477 15.8745 9.5727 15.7386 10.0656C15.6027 10.5584 15.4209 11.0343 15.193 11.4933Z"
            fill="#3f76ff"
        />
    </svg>
);
