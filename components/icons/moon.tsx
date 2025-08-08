import { SVGProps } from 'react';

export const Moon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    height='1em'
    viewBox='0 0 24 24'
    width='1em'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    {/* Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE */}
    <path
      d='M12 3a6 6 0 0 0 9 9a9 9 0 1 1-9-9'
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
    />
  </svg>
);
