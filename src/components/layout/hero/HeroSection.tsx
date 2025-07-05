import Image from "next/image";
import React from "react";
import management from "@/assets/pictures/heroSection.jpg";

const HeroSection = () => {
  return (
    <div className="grid grid-cols-4 h-fit py-15 gap-5 px-15">
      <div className="col-start-1 col-end-3 row-start-1 row-end-2">
        <div className="w-full h-full">
          <Image
            src={management}
            alt="Management"
            className="w-full rounded-lg h-full object-center object-cover"
          />
        </div>
      </div>
      <div className="col-start-3 col-end-5 row-start-1 row-end-2 text-foreground flex flex-col items-start justify-center p-5 gap-10">
        <h1 className="md:text-5xl text-3xl font-bold">Still curious? </h1>
        <p className="text-sm md:text-xl text-justify">
          This website is created using <code> Next.js </code>, giving it a fast
          and smooth user experience. For the design,<code> Tailwind CSS </code>
          brings flexibility and consistency to the layout and styles. All data
          is handled using <code> Supabase</code>, which works seamlessly with
          <code> PostgreSQL </code> as the main database. To complete the look
          and feel, <code> shadcn/ui </code> provides a set of elegant,
          customizable components that make the interface clean, modern, and
          easy to navigate.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
