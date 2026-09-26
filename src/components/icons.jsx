const PATHS = {
  home: 'M3 10.5 12 3l9 7.5M5.25 9.75V20a1 1 0 0 0 1 1h3.5v-5.5h4.5V21h3.5a1 1 0 0 0 1-1V9.75',
  document:
    'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Zm0 0v5h5M9 13h6M9 17h6',
  building: 'M3 21h18M5 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M15 9h2a2 2 0 0 1 2 2v10M9 7h2M9 11h2M9 15h2',
  settings:
    'M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm8.4-2.4.9 1.6-2 3.4-1.8-.5a7.6 7.6 0 0 1-1.6.9l-.4 1.9h-3.9l-.4-1.9a7.6 7.6 0 0 1-1.6-.9l-1.8.5-2-3.4.9-1.6a7 7 0 0 1 0-1.8l-.9-1.6 2-3.4 1.8.5c.5-.4 1-.7 1.6-.9l.4-1.9h3.9l.4 1.9c.6.2 1.1.5 1.6.9l1.8-.5 2 3.4-.9 1.6a7 7 0 0 1 0 1.8Z',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-8 9a8 8 0 0 1 16 0',
  logout: 'M15 17l5-5-5-5M20 12H9M13 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h7',
  search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm10 2-4.35-4.35',
  chevron: 'm9 6 6 6-6 6',
  file: 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Zm0 0v5h5',
  download: 'M12 3v12m0 0 4-4m-4 4-4-4M4 19h16',
  inbox: 'M4 13h4l2 3h4l2-3h4M4 13 6.5 5h11L20 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6Z',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-14v5l3 2',
  check: 'M20 6 9 17l-5-5',
  arrowLeft: 'm12 19-7-7 7-7M5 12h14',
};

/**
 * @param {{ name: keyof typeof PATHS, className?: string }} props
 */
export function Icon({ name, className = 'size-5' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={PATHS[name] ?? PATHS.document} />
    </svg>
  );
}
