import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: string | undefined) {
  // Determine which language to use, falling back to the default
  const langCode = lang && lang in ui ? lang as keyof typeof ui : defaultLang;

  // The returned `t` function is now simpler and uses the safe langCode
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    // The fallback logic is no longer needed here
    return ui[langCode][key];
  }
}