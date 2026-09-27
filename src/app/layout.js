import './globals.css';

export const metadata = {
  title: {
    default: "Tadbirkorga ko'mak",
    template: "%s — Tadbirkorga ko'mak",
  },
  description: 'Murojaatlar boshqaruv paneli',
  icons: { icon: '/logo.svg' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
