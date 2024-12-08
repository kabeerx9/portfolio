import { GraduationCap, MapPin } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

export default function About() {
  return (
    <section className="py-24 px-4 max-w-5xl mx-auto" id="about">
      <SectionHeader 
        title="About Me" 
        subtitle="Get to know me better" 
      />
      
      <div className="grid md:grid-cols-[2fr,1fr] gap-12">
        {/* Main Content */}
        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
            Hi, I&apos;m Kabeer Joshi, a passionate Frontend Developer with a keen eye for creating 
            engaging user experiences. I specialize in building modern web applications using 
            cutting-edge technologies like React, Next.js, and TypeScript.
          </p>
          
          <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
            With a strong foundation in computer science and hands-on experience in full-stack 
            development, I bring a comprehensive approach to frontend development. I&apos;m particularly 
            interested in building scalable applications and implementing efficient state management 
            solutions.
          </p>

          <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
            Currently, I&apos;m focused on creating intuitive user interfaces and optimizing web 
            performance at Goreeva, where I&apos;ve contributed to significant improvements in our 
            school management system.
          </p>
        </div>

        {/* Info Cards */}
        <div className="space-y-6">
          {/* Location Card */}
          <div className="p-6 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
              <h3 className="font-semibold">Location</h3>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400">
              Dehradun, Uttarakhand
            </p>
          </div>

          {/* Education Card */}
          <div className="p-6 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-3 mb-3">
              <GraduationCap className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
              <h3 className="font-semibold">Education</h3>
            </div>
            <div className="space-y-2">
              <p className="font-medium">BE Computer Science</p>
              <p className="text-zinc-600 dark:text-zinc-400">
                Thapar University, Patiala
              </p>
              <p className="text-zinc-600 dark:text-zinc-400">
                GPA: 7.21
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 