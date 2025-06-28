import Image from "next/image";
import task from "@/assets/pictures/task.jpg";
import React from "react";

const About = () => {
  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#222831"
          fillOpacity="1"
          d="M0,256L48,218.7C96,181,192,107,288,112C384,117,480,203,576,224C672,245,768,203,864,165.3C960,128,1056,96,1152,90.7C1248,85,1344,107,1392,117.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
      <div className="h-fit w-screen flex justify-between gap-10 px-15 bg-[#222831]">
        <div className="flex flex-col text-white  gap-10 w-full h-full">
          <h1 className="text-6xl font-semibold">What is Ngatur all about?</h1>
          <p className="w-3/4 text-lg ngaturDesc">
            Ngatur Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Quidem repellat qui quo dolor eveniet, consequuntur est laborum
            suscipit quas, rem, soluta excepturi perspiciatis ratione non ut
            distinctio fugit deserunt odio! is Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Laudantium iusto magni quis nesciunt,
            sunt velit?
          </p>
        </div>
        <Image
          src={task}
          alt="Management picture"
          className="w-1/2 rounded-full border-4 border-[#471396] h-full object-center object-cover"
        />
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#222831"
          fillOpacity="1"
          d="M0,224L48,213.3C96,203,192,181,288,144C384,107,480,53,576,64C672,75,768,149,864,154.7C960,160,1056,96,1152,69.3C1248,43,1344,53,1392,58.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>
    </div>
  );
};

export default About;
