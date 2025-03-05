import { themes } from '../constants/index.js'
import { useThemeStore } from "../store/useThemeStore";
import Layout from '../components/Layout';

const ThemePage = () => {
  const { theme, setTheme } = useThemeStore();
  return (
    <Layout>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-primary">Theme</h2>
        <p className="text-sm">Choose a theme for your chat interface</p>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 pt-4">
        {themes.map((t) => (
          <button key={t} className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
            ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}`}
            onClick={() => setTheme(t)}
          >
            <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
              <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                <div className="rounded bg-primary"></div>
                <div className="rounded bg-secondary"></div>
                <div className="rounded bg-accent"></div>
                <div className="rounded bg-neutral"></div>
              </div>
            </div>
            <span className="text-[11px] font-medium truncate w-full text-center">
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </span>
          </button>
        ))}
      </div>
    </Layout>
  );
};

export default ThemePage;