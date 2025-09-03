import React, { JSX } from "react";

type SvgElement = [keyof JSX.IntrinsicElements, React.SVGProps<SVGElement>];

interface CustomIconProps extends React.SVGProps<SVGSVGElement> {
    svg?: SvgElement[];
    color?: string;
    size?: number;
    strokeWidth?: number;
}

const LogoIcon: React.FC<CustomIconProps> = ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    ...props
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 80 80"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
  <rect x="-8.5" y="-8.5" width="40" height="17.5" rx="8.5" ry="8.5" stroke="transparent" fill="tomato"
        transform="translate(10 10) rotate(45 0 0)" />

  <rect x="-8.5" y="-8.5" width="40" height="17.5" rx="8.5" ry="8.5" stroke="transparent" fill="dodgerblue"
        transform="translate(70 10) rotate(135 0 0)" />

  <rect x="-8.5" y="-8.5" width="40" height="17.5" rx="8.5" ry="8.5" stroke="transparent" fill="limegreen"
        transform="translate(70 70) rotate(225 0 0)" />

  <rect x="-8.5" y="-8.5" width="40" height="17.5" rx="8.5" ry="8.5" stroke="transparent" fill="orange"
        transform="translate(10 70) rotate(315 0 0)" />
        </svg>
    );
};

export default LogoIcon;
