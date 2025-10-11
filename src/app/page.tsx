"use client";

import About from "@/components/about";
import EducationSkills from "@/components/education";
import Footer from "@/components/footer";
import DockNavbar from "@/components/navbar";
import Project from "@/components/project";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <>
      {/* Fixed Dot Pattern Background - covers entire viewport */}
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "fixed inset-0 h-screen w-screen -z-10",
          "[mask-image:radial-gradient(circle_at_center,white,rgba(255,255,255,0.4))]"
        )}
      />

      <main className="relative w-full flex flex-col items-center">
        <div className="w-full max-w-[1400px]">
          <About />
          <EducationSkills />
          <Project />
          <Footer />
          <div className="fixed bottom-4 pt-2 left-1/2 -translate-x-1/2 flex flex-col items-center z-50">
            <DockNavbar />
          </div>
        </div>
      </main>
    </>
  );
}
