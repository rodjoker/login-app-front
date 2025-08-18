// components/CheckIcon.tsx
import { FC } from 'react';

interface CheckIconProps {
  className?: string;
}

const CheckIcon: FC<CheckIconProps> = ({ className = "h-6 w-6 text-green-500" }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
};

export default CheckIcon;