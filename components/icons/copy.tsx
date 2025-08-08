import { SVGProps } from 'react';

export const Copy = (props: SVGProps<SVGSVGElement>) => (
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
      <rect height='14' rx='2' ry='2' width='14' x='8' y='8' />
      <path d='M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2' />
    </g>
  </svg>
);
