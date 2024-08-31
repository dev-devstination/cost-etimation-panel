import { useTranslations } from 'next-intl';

import { Logo } from '@/components/Logo';
import { ToggleThemeButton } from '@/components/ToggleThemeButton';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations('Auth');

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-secondary/30 to-primary/20 dark:from-gray-900 dark:via-purple-900/30 dark:to-blue-900/20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/30 dark:bg-blue-400/40 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-blob will-change-transform"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary/20 dark:bg-purple-400/40 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-blob delay-2000 will-change-transform"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-primary/10 dark:bg-teal-400/40 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-blob delay-4000 will-change-transform"></div>
      </div>

      {/* Main content */}
      <div className="relative flex flex-col items-center justify-center w-full p-8 z-10 dark:bg-gray-800/70">
        <div className="w-full max-w-md backdrop-blur-lg bg-background/70 p-8 rounded-lg shadow-2xl border border-primary/30 dark:border-blue-500/30">
          {/* Theme Toggle */}
          <div className="absolute top-4 right-4">
            <ToggleThemeButton />
          </div>

          {/* Logo */}
          <div className="mb-12 text-center">
            <Logo />
          </div>

          {/* Auth form */}
          <h2 className="text-2xl font-semibold mb-6 text-center text-card-foreground dark:text-white">
            {t('welcomeBack')}
          </h2>
          {children}
        </div>
      </div>
    </div>
  );
}
