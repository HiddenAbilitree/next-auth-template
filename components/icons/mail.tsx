import { SVGProps } from 'react';

export const Mail = (props: SVGProps<SVGSVGElement>) => (
  <svg
    height='1em'
    viewBox='0 0 24 24'
    width='1em'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    {/* Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE */}
    <g
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
    >
      <rect height='16' rx='2' width='20' x='2' y='4' />
      <path d='m22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7' />
    </g>
  </svg>
);
