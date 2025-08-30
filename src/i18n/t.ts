import { defaultLang } from './ui';
import { useTranslations } from './utils';

export function getT(lang: string | undefined) {
	return useTranslations(lang || defaultLang);
}
