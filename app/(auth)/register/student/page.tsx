"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Chrome, ArrowRight, Gamepad2, Trophy, Rocket, User, Calendar, Mail, Lock } from "lucide-react"

export default function RegisterStudentPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  
  // STATE
  const [formData, setFormData] = useState({
    role: 'student',
    name: '',
    birthDate: '',
    email: '',
    password: '',
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
      alert("Pendaftaran Berhasil! Silakan Login lalu masukkan Kode Kelas dari Gurumu.")
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
      <div className="hidden lg:block relative h-full bg-indigo-600 overflow-hidden">
        {/* Gambar Anak Belajar / Ceria */}
        <img 
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop"
            alt="Student Learning"
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900 via-indigo-800/50 to-purple-500/30" />

        <div className="relative z-10 h-full flex flex-col justify-between p-12 text-white">
            <div className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                    <Rocket size={24} className="text-yellow-300" />
                </div>
                Sinau Student.
            </div>

            <div className="space-y-6 max-w-lg">
                <h2 className="text-4xl font-bold leading-tight">
                    Ubah Matematika jadi Petualangan Seru! 🚀
                </h2>
                <div className="space-y-4 text-indigo-100">
                    <div className="flex items-center gap-4 bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                        <div className="bg-green-500/20 p-2 rounded-lg">
                            <Gamepad2 className="text-green-300" size={24} />
                        </div>
                        <div>
                            <p className="font-bold text-white">Belajar Sambil Bermain</p>
                            <p className="text-xs text-indigo-200">Mainkan game seru untuk selesaikan tugas.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                         <div className="bg-yellow-500/20 p-2 rounded-lg">
                            <Trophy className="text-yellow-300" size={24} />
                        </div>
                        <div>
                            <p className="font-bold text-white">Kumpulkan Lencana</p>
                            <p className="text-xs text-indigo-200">Jadilah juara kelas dan koleksi piala.</p>
                        </div>
                    </div>
                </div>
            </div>

            <p className="text-xs text-indigo-200/60">© 2024 Sinau Education Platform.</p>
        </div>
      </div>

      {/* ================= BAGIAN KANAN (FORM) ================= */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-24 bg-white">
        
        <div className="w-full max-w-md mx-auto space-y-8">
            
            {/* Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Halo, Calon Juara! 👋</h1>
                <p className="text-slate-500">Buat akun barumu untuk mulai bermain dan belajar.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Nama Lengkap */}
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-slate-700">Nama Lengkap</Label>
                    <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input 
                            id="name" name="name" 
                            placeholder="Contoh: Budi Santoso" 
                            required 
                            value={formData.name} onChange={handleChange}
                            className="pl-9 bg-slate-50 border-slate-200 focus:bg-white transition-all"
                        />
                    </div>
                </div>

                {/* Tanggal Lahir */}
                <div className="space-y-2">
                    <Label htmlFor="birthDate" className="text-sm font-medium text-slate-700">Tanggal Lahir</Label>
                    <div className="relative">
                         <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input 
                            id="birthDate" name="birthDate" 
                            type="date" 
                            required 
                            value={formData.birthDate} onChange={handleChange}
                            className="pl-9 bg-slate-50 border-slate-200 focus:bg-white transition-all"
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-slate-700">Email (Sekolah/Pribadi)</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input 
                            id="email" name="email" 
                            type="email" 
                            placeholder="siswa@sekolah.com" 
                            required 
                            value={formData.email} onChange={handleChange}
                            className="pl-9 bg-slate-50 border-slate-200 focus:bg-white transition-all"
                        />
                    </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-slate-700">Kata Sandi Rahasia</Label>
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
                    <p className="text-[10px] text-slate-400">Minimal 6 karakter, jangan kasih tau siapa-siapa ya!</p>
                </div>

                {/* Submit Button */}
                <Button 
                    type="submit" 
                    disabled={isLoading} 
                    className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] rounded-xl"
                >
                    {isLoading ? "Sedang Membuat Akun..." : "Mulai Petualangan Sekarang"}
                    {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
                </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100" /></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400">Atau</span></div>
            </div>

            {/* Google Button */}
            <Button variant="outline" className="w-full h-11 border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl">
                <Chrome className="mr-2 h-4 w-4" /> Daftar dengan Google
            </Button>
            
            <p className="text-center text-sm text-slate-600">
                Sudah punya akun? <Link href="/login" className="font-bold text-indigo-600 hover:underline">Masuk disini</Link>
            </p>

        </div>
      </div>
    </div>
  )
}