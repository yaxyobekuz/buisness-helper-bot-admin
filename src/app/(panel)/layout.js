import { logoutAction } from '@/app/actions/auth';
import { Sidebar } from '@/components/sidebar';
import { apiFetchPage } from '@/lib/api';

export default async function PanelLayout({ children }) {
  const { admin } = await apiFetchPage('/auth/me');

  return (
    <div className="min-h-screen">
      <Sidebar adminName={admin.fullName || admin.login} logoutAction={logoutAction} />
      <div className="lg:pl-64">
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
