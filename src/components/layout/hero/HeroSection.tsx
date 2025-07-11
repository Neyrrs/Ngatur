import Image from "next/image";
import React from "react";
import management from "@/assets/pictures/heroSection.jpg";

const HeroSection = () => {
  return (
    <div className="py-15 gap-5 md:px-15 px-10 grid md:grid-cols-2 h-fit">
      {/* Gambar hanya muncul di md (desktop) */}
      <div className="hidden md:block">
        <Image
          src={management}
          alt="Management"
          className="w-full h-full object-cover object-center rounded-lg"
        />
      </div>

      {/* Teks - Selalu tampil, tapi menyatu jika mobile */}
      <div className="text-center md:text-left text-foreground flex flex-col items-start justify-center md:p-5 px-5 gap-5 md:gap-y-10">
        <h1 className="md:text-5xl text-3xl font-bold">Still curious?</h1>
        <p className="text-sm md:text-xl text-justify">
          This website is created using <code>Next.js</code>, giving it a fast
          and smooth user experience. For the design, <code>Tailwind CSS</code>
          brings flexibility and consistency to the layout and styles. All data
          is handled using <code>Supabase</code>, which works seamlessly with
          <code>PostgreSQL</code> as the main database. To complete the look
          and feel, <code>shadcn/ui</code> provides a set of elegant,
          customizable components that make the interface clean, modern, and
          easy to navigate.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
