import { SVGProps } from 'react';

export const Smartphone = (props: SVGProps<SVGSVGElement>) => (
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
      <rect height='20' rx='2' ry='2' width='14' x='5' y='2' />
      <path d='M12 18h.01' />
    </g>
  </svg>
);
