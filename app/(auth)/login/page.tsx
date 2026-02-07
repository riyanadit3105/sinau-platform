"use client"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Chrome, Tv, ArrowRight, BookOpen, CheckCircle2, 
  User, GraduationCap, Building2 // Import Icon tambahan
} from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import Logo from "@/components/shared/Logo"

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await login(email, password);
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen w-full flex flex-col lg:grid lg:grid-cols-2 bg-white">
      
      {/* ================= BAGIAN 1: VISUAL (LAPTOP ONLY) ================= */}
      <div className="hidden lg:block relative h-full bg-slate-900 overflow-hidden">
        <img 
            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2600&auto=format&fit=crop"
            alt="School Background"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 via-indigo-900/50 to-slate-900/80" />

        <div className="relative z-10 h-full flex flex-col justify-between p-12 text-white">
            <div className="flex items-center gap-3 font-bold text-3xl tracking-tight">
                {/* Container putih semi-transparan agar logo hitam/ungu terbaca */}
                <div className="bg-white/90 backdrop-blur-md py-2 px-4 rounded-xl shadow-lg border border-white/20">
                    <Logo className="h-8" withText={true} />
                </div>
            </div>

            <div className="space-y-8 max-w-lg">
                <h2 className="text-4xl font-bold leading-tight">
                    Platform Pembelajaran Digital Masa Depan.
                </h2>
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-indigo-100 bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                        <CheckCircle2 className="text-green-400 shrink-0" size={20} />
                        <span className="font-medium">Metode CPA (Concrete-Pictorial-Abstract)</span>
                    </div>
                    <div className="flex items-center gap-3 text-indigo-100 bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                        <CheckCircle2 className="text-green-400 shrink-0" size={20} />
                        <span className="font-medium">Gamifikasi Terintegrasi Kurikulum</span>
                    </div>
                </div>
            </div>
            <p className="text-xs text-indigo-300/80">© 2026 Sinau Education Platform.</p>
        </div>
      </div>

      {/* ================= BAGIAN 2: FORM (RESPONSIVE) ================= */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-24 bg-white relative">
        
        {/* Tombol TV Mode */}
        <div className="absolute top-4 right-4 lg:top-8 lg:right-8">
            <Link href="/tv/login">
                <Button variant="ghost" className="gap-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200">
                    <Tv size={18} />
                    <span className="text-xs font-semibold uppercase tracking-wide hidden sm:inline">Mode TV</span>
                    <span className="text-xs font-semibold uppercase tracking-wide sm:hidden">TV</span>
                </Button>
            </Link>
        </div>

        {/* LOGO MOBILE */}
        <div className="lg:hidden mb-8 flex items-center gap-2 font-bold text-2xl text-indigo-900">
            <div className="bg-indigo-600 text-white p-1.5 rounded-lg">
                <BookOpen size={20} />
            </div>
            Sinau.
        </div>

        <div className="w-full max-w-md mx-auto">
            {/* Header */}
            <div className="space-y-2 mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Selamat Datang</h1>
                <p className="text-slate-500">Silakan masuk menggunakan akun sekolah Anda.</p>
            </div>

            {/* Form Login */}
            <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                        id="email"
                        type="email" 
                        placeholder="contoh@sekolah.sch.id" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-all"
                    />
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <Label htmlFor="password">Kata Sandi</Label>
                        <Link href="#" className="text-xs font-semibold text-indigo-600 hover:underline">
                            Lupa sandi?
                        </Link>
                    </div>
                    <Input 
                        id="password"
                        type="password" 
                        placeholder="••••••••" 
                        required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-all"
                    />
                </div>

                <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] text-base"
                >
                    {isLoading ? "Memproses..." : "Masuk Sekarang"}
                    {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
                </Button>
            </form>

            <div className="relative my-8">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100" /></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400">Atau</span></div>
            </div>

            {/* OPSI DAFTAR BARU (CARD STYLE) */}
            <div>
                <p className="text-center text-sm text-slate-500 mb-4 font-medium">Belum punya akun? Daftar sebagai:</p>
                <div className="grid grid-cols-3 gap-3">
                    {/* Daftar Siswa */}
                    <Link href="/register/student" className="group">
                        <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-indigo-500 hover:shadow-md transition-all h-full cursor-pointer">
                            <div className="bg-white p-2 rounded-full shadow-sm mb-2 group-hover:text-indigo-600 text-slate-600">
                                <User size={20} />
                            </div>
                            <span className="text-xs font-bold text-slate-600 group-hover:text-indigo-700">Siswa</span>
                        </div>
                    </Link>

                    {/* Daftar Guru */}
                    <Link href="/register/teacher" className="group">
                        <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-indigo-500 hover:shadow-md transition-all h-full cursor-pointer">
                            <div className="bg-white p-2 rounded-full shadow-sm mb-2 group-hover:text-indigo-600 text-slate-600">
                                <GraduationCap size={20} />
                            </div>
                            <span className="text-xs font-bold text-slate-600 group-hover:text-indigo-700">Guru</span>
                        </div>
                    </Link>

                    {/* Daftar Sekolah */}
                    <Link href="/register/school" className="group">
                        <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-indigo-500 hover:shadow-md transition-all h-full cursor-pointer">
                            <div className="bg-white p-2 rounded-full shadow-sm mb-2 group-hover:text-indigo-600 text-slate-600">
                                <Building2 size={20} />
                            </div>
                            <span className="text-xs font-bold text-slate-600 group-hover:text-indigo-700">Sekolah</span>
                        </div>
                    </Link>
                </div>
            </div>

        </div>
      </div>
    </div>
  )
}