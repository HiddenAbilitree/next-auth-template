import { authClient } from '@/lib/auth-client';
import { QRCodeSVG } from 'qrcode.react';

export default function UserCard() {
  const { data: session } = authClient.useSession();
  const { data: qr } = useQuery({
    queryKey: ['two-factor-qr'],
    queryFn: async () => {
      const res = await authClient.twoFactor.getTotpUri();
      return res.data;
    },
    enabled: !!session?.user.twoFactorEnabled,
  });
  return <QRCodeSVG value={qr?.totpURI || ''} />;
}
