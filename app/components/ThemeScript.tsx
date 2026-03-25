/**
 * Inline script runs before paint to avoid a flash of wrong theme.
 * Must stay in sync with ThemeContext (localStorage key "theme", default dark).
 */
export default function ThemeScript() {
  const bootstrap = `
(function() {
  try {
    var t = localStorage.getItem('theme');
    if (t === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
`;

  return <script dangerouslySetInnerHTML={{ __html: bootstrap }} />;
}
