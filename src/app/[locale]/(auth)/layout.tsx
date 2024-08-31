import { Logo } from '@/components/Logo';
import { useTranslations } from 'next-intl';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations('Auth');

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-secondary/30 to-primary/20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/30 rounded-full mix-blend-multiply filter blur-xl animate-blob will-change-transform"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl animate-blob delay-2000 will-change-transform"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl animate-blob delay-4000 will-change-transform"></div>
      </div>

      {/* Main content */}
      <div className="relative flex flex-col items-center justify-center w-full p-8 z-10">
        <div className="w-full max-w-md backdrop-blur-lg bg-background/70 p-8 rounded-lg shadow-2xl border border-primary/30">
          {/* Logo */}
          <div className="mb-12 text-center">
            <Logo />
          </div>

          {/* Auth form */}
          <h2 className="text-2xl font-semibold mb-6 text-center text-card-foreground">
            {t('welcomeBack')}
          </h2>
          {children}
        </div>
      </div>
    </div>
  );
}
