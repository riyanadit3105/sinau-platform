"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label" // Pastikan ada component Label
import { Building2, ArrowRight, CheckCircle2, MapPin } from "lucide-react"

export default function RegisterSchoolPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // State Data
  const [formData, setFormData] = useState({
    role: 'school',
    name: '',       
    email: '',      
    password: '',   
    village: '',    
    district: '',   
    regency: ''     
  })

  // Handler Input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Handler Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Payload (Gabung alamat untuk kemudahan, tapi tetap kirim raw data)
      const payload = {
        ...formData,
        address: `${formData.village}, ${formData.district}, ${formData.regency}`
      }

      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      // Sukses
      // Anda bisa ganti alert dengan Toast jika sudah install (cth: sonner/radix)
      alert("Registrasi Berhasil! Silakan Login.") 
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
        {/* Gambar Sekolah/Gedung */}
        <img 
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2000&auto=format&fit=crop"
            alt="School Building"
            className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/90 via-indigo-900/40 to-slate-900/60" />

        <div className="relative z-10 h-full flex flex-col justify-between p-12 text-white">
            <div className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                <div className="bg-white/20 p-2 rounded-lg backdrop-blur-md">
                    <Building2 size={24} />
                </div>
                Sinau for Schools.
            </div>

            <div className="space-y-6 max-w-lg">
                <h2 className="text-4xl font-bold leading-tight">
                    Digitalisasi Sekolah Anda dalam hitungan menit.
                </h2>
                <div className="space-y-4 text-indigo-100">
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="text-green-400" size={20} />
                        <span>Dashboard Manajemen Kelas Terpusat</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="text-green-400" size={20} />
                        <span>Laporan Perkembangan Siswa Real-time</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="text-green-400" size={20} />
                        <span>Akses Materi Kurikulum Standar Nasional</span>
                    </div>
                </div>
            </div>

            <p className="text-xs text-indigo-200/60">Bergabung dengan jaringan sekolah digital Indonesia.</p>
        </div>
      </div>

      {/* ================= BAGIAN KANAN (FORM) ================= */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-24 bg-white overflow-y-auto">
        
        <div className="w-full max-w-lg mx-auto space-y-8">
            
            {/* Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-slate-900">Daftarkan Sekolah</h1>
                <p className="text-slate-500">Lengkapi data sekolah untuk membuat akun admin.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* SECTION 1: AKUN SEKOLAH */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-indigo-600 uppercase tracking-wider flex items-center gap-2">
                        <Building2 size={16}/> Informasi Akun
                    </h3>
                    
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nama Sekolah</Label>
                            <Input 
                                id="name" name="name"
                                placeholder="Contoh: SD Negeri 1 Nusantara" 
                                required 
                                value={formData.name} onChange={handleChange}
                                className="bg-slate-50 border-slate-200 focus:bg-white"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Admin</Label>
                                <Input 
                                    id="email" name="email" type="email"
                                    placeholder="admin@sekolah.sch.id" 
                                    required 
                                    value={formData.email} onChange={handleChange}
                                    className="bg-slate-50 border-slate-200 focus:bg-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Kata Sandi</Label>
                                <Input 
                                    id="password" name="password" type="password"
                                    placeholder="••••••••" 
                                    required 
                                    value={formData.password} onChange={handleChange}
                                    className="bg-slate-50 border-slate-200 focus:bg-white"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider Halus */}
                <div className="border-t border-slate-100" />

                {/* SECTION 2: ALAMAT */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-indigo-600 uppercase tracking-wider flex items-center gap-2">
                        <MapPin size={16}/> Lokasi Sekolah
                    </h3>
                    
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="village">Desa / Kelurahan</Label>
                            <Input 
                                id="village" name="village"
                                placeholder="Nama Desa" 
                                required 
                                value={formData.village} onChange={handleChange}
                                className="bg-slate-50 border-slate-200 focus:bg-white"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="district">Kecamatan</Label>
                                <Input 
                                    id="district" name="district"
                                    placeholder="Kecamatan" 
                                    required 
                                    value={formData.district} onChange={handleChange}
                                    className="bg-slate-50 border-slate-200 focus:bg-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="regency">Kabupaten / Kota</Label>
                                <Input 
                                    id="regency" name="regency"
                                    placeholder="Kabupaten" 
                                    required 
                                    value={formData.regency} onChange={handleChange}
                                    className="bg-slate-50 border-slate-200 focus:bg-white"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* BUTTON SUBMIT */}
                <div className="pt-4">
                    <Button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]"
                    >
                        {isLoading ? "Sedang Mendaftarkan..." : "Buat Akun Sekolah"}
                        {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                </div>

            </form>

            {/* Footer Link */}
            <p className="text-center text-sm text-slate-600">
                Sudah memiliki akun?{" "}
                <Link href="/login" className="font-bold text-indigo-600 hover:underline">
                    Masuk disini
                </Link>
            </p>

        </div>
      </div>
    </div>
  )
}