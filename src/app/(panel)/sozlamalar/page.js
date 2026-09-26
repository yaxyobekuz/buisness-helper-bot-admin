import { DirectionsManager } from '@/components/directions-manager';
import { PageHeader } from '@/components/page-header';
import { apiFetch } from '@/lib/api';

export const metadata = { title: 'Sozlamalar' };

export default async function SettingsPage() {
  const data = await apiFetch('/directions');

  return (
    <>
      <PageHeader title="Sozlamalar" />

      <section>
        <h2 className="mb-3 font-semibold text-slate-900">Yo'nalishlar</h2>

        <DirectionsManager directions={data.items} />
      </section>
    </>
  );
}
