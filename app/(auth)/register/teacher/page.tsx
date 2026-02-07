"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { GraduationCap, ArrowRight, BookOpen, Users, BarChart3, User, Mail, Lock, BadgeCheck } from "lucide-react"

export default function RegisterTeacherPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  
  // STATE
  const [formData, setFormData] = useState({
    role: 'teacher',
    name: '',
    email: '',
    password: '',
    nip: '' 
  })

  // HANDLER
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error)

      // Sukses
      alert("Pendaftaran Guru Berhasil! Silakan Login.")
      router.push('/login')

    } catch (error: any) {
      alert(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col lg:grid lg:grid-cols-2 bg-white">
      
      {/* ================= BAGIAN KIRI (VISUAL) ================= */}
      <div className="hidden lg:block relative h-full bg-slate-900 overflow-hidden">
        {/* Gambar Guru / Kelas Profesional */}
        <img 
            src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1974&auto=format&fit=crop"
            alt="Teacher Teaching"
            className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-indigo-900/80 to-slate-900/60" />

        <div className="relative z-10 h-full flex flex-col justify-between p-12 text-white">
            <div className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                <div className="bg-white/10 p-2 rounded-lg backdrop-blur-md border border-white/10">
                    <GraduationCap size={24} className="text-indigo-200" />
                </div>
                Sinau for Teachers.
            </div>

            <div className="space-y-6 max-w-lg">
                <h2 className="text-4xl font-bold leading-tight">
                    Revolusi Cara Mengajar Matematika di Kelas Anda.
                </h2>
                <div className="space-y-4 text-indigo-100">
                    <div className="flex items-start gap-4">
                        <div className="bg-indigo-500/20 p-2 rounded-lg mt-1">
                            <BookOpen size={20} className="text-indigo-300" />
                        </div>
                        <div>
                            <p className="font-semibold text-white">Kurikulum Terstruktur</p>
                            <p className="text-sm text-slate-300">Akses materi siap pakai sesuai standar nasional.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="bg-indigo-500/20 p-2 rounded-lg mt-1">
                            <Users size={20} className="text-indigo-300" />
                        </div>
                        <div>
                            <p className="font-semibold text-white">Manajemen Kelas Mudah</p>
                            <p className="text-sm text-slate-300">Pantau aktivitas seluruh siswa dalam satu layar.</p>
                        </div>
                    </div>
                </div>
            </div>

            <p className="text-xs text-indigo-200/50">Bergabung dengan ribuan pengajar inspiratif lainnya.</p>
        </div>
      </div>

      {/* ================= BAGIAN KANAN (FORM) ================= */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-24 bg-white">
        
        <div className="w-full max-w-md mx-auto space-y-8">
            
            {/* Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Bergabung sebagai Pengajar</h1>
                <p className="text-slate-500">Buat akun untuk mulai mengelola kelas digital Anda.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Nama Lengkap */}
                <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap & Gelar</Label>
                    <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input 
                            id="name" name="name" 
                            placeholder="Contoh: Budi Santoso, S.Pd." 
                            required 
                            value={formData.name} onChange={handleChange}
                            className="pl-9 bg-slate-50 border-slate-200 focus:bg-white transition-all"
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input 
                            id="email" name="email" 
                            type="email" 
                            placeholder="guru@sekolah.sch.id" 
                            required 
                            value={formData.email} onChange={handleChange}
                            className="pl-9 bg-slate-50 border-slate-200 focus:bg-white transition-all"
                        />
                    </div>
                </div>

                {/* NIP (Optional) */}
                <div className="space-y-2">
                    <div className="flex justify-between">
                         <Label htmlFor="nip">NIP / ID Guru</Label>
                         <span className="text-xs text-slate-400 italic">(Opsional)</span>
                    </div>
                    <div className="relative">
                        <BadgeCheck className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input 
                            id="nip" name="nip" 
                            placeholder="1980xxxx..." 
                            value={formData.nip} onChange={handleChange}
                            className="pl-9 bg-slate-50 border-slate-200 focus:bg-white transition-all"
                        />
                    </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <Label htmlFor="password">Kata Sandi</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input 
                            id="password" name="password" 
                            type="password" 
                            placeholder="••••••••" 
                            required 
                            value={formData.password} onChange={handleChange}
                            className="pl-9 bg-slate-50 border-slate-200 focus:bg-white transition-all"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <Button 
                    type="submit" 
                    disabled={isLoading} 
                    className="w-full h-12 bg-indigo-700 hover:bg-indigo-800 text-white font-bold shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]"
                >
                    {isLoading ? "Sedang Mendaftar..." : "Daftar Akun Guru"}
                    {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
                </Button>
            </form>

            {/* Footer */}
            <p className="text-center text-sm text-slate-600">
                Sudah memiliki akun? <Link href="/login" className="font-bold text-indigo-700 hover:underline">Masuk disini</Link>
            </p>

        </div>
      </div>
    </div>
  )
}