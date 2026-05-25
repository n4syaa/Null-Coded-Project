"use client";

import { motion } from "framer-motion";
import { Footer } from "@/components/layout/Footer";
import { BlurOrb } from "@/components/effects/BlurOrb";
import { Card } from "@/components/ui/Card";

const team = [
  { name: "Sarah Chen", role: "CEO & Co-founder", emoji: "👩‍💻", bio: "Mantan insinyur Google dengan 12 tahun pengalaman di EdTech." },
  { name: "Nasya Rivera", role: "CTO & Co-founder", emoji: "👨‍🔬", bio: "Mantan pemimpin infrastruktur Netflix. Penggemar open source." },
  { name: "Mia Fontaine", role: "Head of Content", emoji: "👩‍🎨", bio: "Desainer instruksional pemenang penghargaan. 200+ kursus dibuat." },
  { name: "Marcus Johnson", role: "Head of Community", emoji: "👨‍🏫", bio: "Pembangun komunitas. Membantu 50rb+ dev mendapatkan pekerjaan pertama." },
];

const values = [
  { icon: "🎯", title: "Pelajar Diutamakan", desc: "Setiap keputusan dimulai dengan apa yang terbaik bagi pelajar kami — bukan metrik belaka." },
  { icon: "🔓", title: "Keterbukaan Radikal", desc: "Kami percaya pengetahuan harus dapat diakses oleh siapa saja, tanpa memandang latar belakang." },
  { icon: "⚡", title: "Luncurkan Cepat", desc: "Kami membuat prototipe, menguji, dan mengulangi. Cukup baik hari ini lebih baik daripada sempurna tapi tak pernah ada." },
  { icon: "🌍", title: "Global Secara Alami", desc: "Komunitas kami tersebar di 180+ negara. Kami merancang untuk keberagaman sejak hari pertama." },
];

export default function AboutPage() {
  return (
    <>
      <div className="min-h-screen pt-24 pb-16">
        {/* Hero - Pastikan z-10 sesuai permintaan */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative py-20 overflow-hidden z-10"
        >
          <BlurOrb className="absolute top-0 left-1/2 -translate-x-1/2" color="sky" size="xl" delay={0} />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Kami sedang membangun
              <br />
              <span className="gradient-text">masa depan pendidikan</span>
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto">
              Null Coded lahir dari keyakinan sederhana: siapa pun, di mana pun, bisa menjadi pengembang kelas dunia.
              Kami menggabungkan instruksi ahli, proyek dunia nyata, dan personalisasi berbasis AI untuk mewujudkannya.
            </p>
          </div>
        </motion.section>

        {/* Stats */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 relative z-10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "120rb+", label: "Pelajar Aktif" },
              { value: "180+", label: "Negara" },
              { value: "94%", label: "Penempatan Kerja" },
              { value: "4.9★", label: "Rating Rata-rata" },
            ].map((s) => (
              <Card key={s.label} padding="lg" className="text-center">
                <p className="text-3xl font-bold text-white mb-1">{s.value}</p>
                <p className="text-sm text-zinc-400">{s.label}</p>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Mission */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Misi kami</h2>
          <blockquote className="text-xl sm:text-2xl text-zinc-300 leading-relaxed italic border-l-4 border-sky-500 pl-6 text-left">
            &ldquo;Menjadikan pendidikan coding kelas dunia dapat diakses oleh setiap orang di planet ini — tanpa memandang di mana mereka tinggal, berapa penghasilan mereka, atau apa yang sudah mereka ketahui.&rdquo;
          </blockquote>
        </section>

        {/* Values */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Apa yang kami yakini</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <Card key={v.title} hover padding="lg" className="text-center group">
                <span className="text-4xl block mb-4 group-hover:scale-110 transition-transform duration-300">{v.icon}</span>
                <h3 className="font-semibold text-white mb-2">{v.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{v.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <h2 className="text-3xl font-bold text-white text-center mb-4">Kenali tim kami</h2>
          <p className="text-zinc-400 text-center mb-12">Orang-orang di balik platform ini</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((member) => (
              <Card key={member.name} hover padding="lg" className="text-center group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500/20 to-blue-600/20 border border-sky-500/20 flex items-center justify-center text-3xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  {member.emoji}
                </div>
                <h3 className="font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-xs text-sky-400 mb-2">{member.role}</p>
                <p className="text-xs text-zinc-400 leading-relaxed">{member.bio}</p>
              </Card>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
