import { MagicLinkForm } from '@/components/auth/forms/magic-link';
import { sectionStyles } from '@/styles';

export default function MagicLink() {
  return (
    <div className={sectionStyles}>
      <MagicLinkForm />
    </div>
  );
}
