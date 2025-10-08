"use client";

import About from "@/components/about";
import EducationSkills from "@/components/education";
import Footer from "@/components/footer";
import DockNavbar from "@/components/navbar";
import Project from "@/components/project";

export default function Home() {
  return (
    <main className="w-full flex flex-col items-center">
      <div className="w-full max-w-[1400px]">
        <About />
        <EducationSkills />
        <Project />
        <Footer />
        <div className="fixed bottom-4 pt-2 left-1/2 -translate-x-1/2  flex  flex-col items-center">
          <DockNavbar />
        </div>
      </div>
    </main>
  );
}
