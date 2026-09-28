import { proxyExport } from '@/lib/export-proxy';

export async function GET(request) {
  return proxyExport(request, '/applications/export');
}
