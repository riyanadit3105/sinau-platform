// FILE: app/(auth)/layout.tsx
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    // Kita pastikan div ini full width dan full height
    <div className="min-h-screen w-full bg-slate-50">
      {children}
    </div>
  )
}