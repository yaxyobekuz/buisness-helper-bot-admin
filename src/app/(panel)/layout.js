import { redirect } from 'next/navigation';

import { logoutAction } from '@/app/actions/auth';
import { Sidebar } from '@/components/sidebar';
import { ApiRequestError, apiFetch } from '@/lib/api';

export default async function PanelLayout({ children }) {
  let admin = null;

  try {
    const data = await apiFetch('/auth/me');
    admin = data.admin;
  } catch (error) {
    if (error instanceof ApiRequestError && error.status === 401) {
      redirect('/login');
    }

    throw error;
  }

  return (
    <div className="min-h-screen">
      <Sidebar adminName={admin.fullName || admin.login} logoutAction={logoutAction} />
      <div className="lg:pl-64">
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
