import { PublicNavbar } from '@/components/public/public-navbar';
import { PublicFooter } from '@/components/public/public-footer';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
   <PublicNavbar />
      {children}
      <PublicFooter />
    </div>
  );
}
