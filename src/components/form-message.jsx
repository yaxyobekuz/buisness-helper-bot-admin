/**
 * Forma natijasi haqidagi xabar.
 *
 * @param {{ state?: { error?: string | null, success?: string | null } }} props
 */
export function FormMessage({ state }) {
  if (state?.error) {
    return <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>;
  }

  if (state?.success) {
    return (
      <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{state.success}</p>
    );
  }

  return null;
}
