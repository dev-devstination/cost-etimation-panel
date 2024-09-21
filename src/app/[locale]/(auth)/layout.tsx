import { AuthLogo } from "@/components/Logo"
import { ToggleThemeButton } from "@/components/ToggleThemeButton"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen overflow-hidden bg-gradient-to-br from-background via-secondary/30 to-primary/20 dark:from-gray-900 dark:via-purple-900/30 dark:to-blue-900/20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 size-64 animate-blob rounded-full bg-primary/30 mix-blend-multiply blur-xl will-change-transform dark:bg-blue-400/40 dark:mix-blend-screen"></div>
        <div className="absolute right-1/4 top-1/3 size-64 animate-blob rounded-full bg-primary/20 mix-blend-multiply blur-xl will-change-transform delay-2000 dark:bg-purple-400/40 dark:mix-blend-screen"></div>
        <div className="absolute bottom-1/4 left-1/3 size-64 animate-blob rounded-full bg-primary/10 mix-blend-multiply blur-xl will-change-transform delay-4000 dark:bg-teal-400/40 dark:mix-blend-screen"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex w-full flex-col items-center justify-center p-4 dark:bg-gray-800/70 sm:p-8">
        <div className="w-full max-w-md rounded-lg border border-primary/30 bg-background/70 p-6 shadow-2xl backdrop-blur-lg dark:border-blue-500/30 sm:p-8">
          {/* Theme Toggle */}
          <div className="absolute right-4 top-4">
            <ToggleThemeButton />
          </div>

          {/* Logo */}
          <div className="mb-8 text-center sm:mb-12">
            <AuthLogo />
          </div>

          {/* Auth form */}
          {children}
        </div>
      </div>
    </div>
  )
}
