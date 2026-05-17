// apps/web/src/app/(dashboard)/layout.tsx
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { ThemeProvider } from '@/components/theme-provider'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lisena Apparel - ERP Management System',
  description: 'Smart Factory Management untuk Apparel & Konveksi'
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="flex">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-6 md:p-8 space-y-6 overflow-hidden">
              {children}
            </main>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}
