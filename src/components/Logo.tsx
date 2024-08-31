import { useTranslations } from 'next-intl';

export const Logo = () => {
  const t = useTranslations('Logo');

  return (
    <>
      <div className="inline-block relative">
        <span className="text-5xl font-black text-primary">
          {t('firstLetter')}
          <span className="text-foreground">{t('secondLetter')}</span>
          {t('restOfWord')}
        </span>
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-ping"></span>
      </div>
      <div className="mt-2">
        <span className="text-3xl font-light tracking-wide text-foreground">
          {t('subtitle')}
        </span>
      </div>
    </>
  );
};
