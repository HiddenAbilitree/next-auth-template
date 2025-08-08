import { SVGProps } from 'react';

export const Circle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    height='1em'
    viewBox='0 0 24 24'
    width='1em'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    {/* Icon from Lucide by Lucide Contributors - https://github.com/lucide-icons/lucide/blob/main/LICENSE */}
    <circle
      cx='12'
      cy='12'
      fill='none'
      r='10'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
    />
  </svg>
);
