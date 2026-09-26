import { AccountForm } from '@/components/account-form';
import { PageHeader } from '@/components/page-header';
import { PasswordForm } from '@/components/password-form';
import { apiFetch } from '@/lib/api';

export const metadata = { title: 'Profil' };

export default async function ProfilePage() {
  const data = await apiFetch('/auth/me');

  return (
    <>
      <PageHeader title="Profil" />

      <div className="grid items-start gap-4 lg:grid-cols-2">
        <AccountForm admin={data.admin} />
        <PasswordForm />
      </div>
    </>
  );
}
