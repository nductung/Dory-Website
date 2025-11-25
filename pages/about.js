import { useState } from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
// Data
import Contact from "../components/Contact";

const About = () => {
  const router = useRouter();
  const theme = useTheme();
  const [mount, setMount] = useState(false);

  return (
    <div className="bg-primary">
      <div className="relative">
        <p className="font-[700] text-[525px] leading-[451px] text-[#F1E306] text-center mob:text-[40vw]">
          DORY
        </p>
        {/* --- CONTAINER CHO ẢNH VÀ TEXT --- */}
        {/* Dùng container absolute chung để dễ căn chỉnh vị trí tương đối với nhau */}
        <div className="absolute top-[236px] w-full h-[600px] pointer-events-none">
          {/* CENTRAL IMAGE */}
          <img
            src="/images/Layer_1.png"
            alt="Dory Portrait"
            className="absolute left-1/2 -translate-x-1/2 w-[300px]  h-auto z-10 object-cover"
          />

          {/* --- FLOATING WORDS (CSS từng chữ theo design) --- */}

          {/* 1. "the" - Bên trái ảnh, ngang tầm vai */}
          <p className="font-[700] text-[70px] leading-[60px] text-[#7BC14B] absolute top-[25%] left-[29%] z-20">
            the
          </p>
          <p className="font-[700] text-[70px] leading-[60px] text-[#7BC14B] absolute top-[50%] left-[28%] z-20">
            idea
          </p>
          <p className="font-[700] text-[70px] leading-[60px] text-[#7BC14B] absolute top-[27%] right-[20%] z-20">
            become
          </p>
          <p className="font-[700] text-[70px] leading-[60px] text-[#7BC14B] absolute top-[48%] right-[10%] z-20">
            real
          </p>
          <p className="font-[700] text-[70px] leading-[60px] text-[#7BC14B] absolute top-[38%] left-[10%] z-20">
            Make
          </p>
        </div>
      </div>
      <div className="mt-[236px] flex w-full justify-between px-[82px] mob:px-[30px]">
        <p className="LexendLight font-[300] text-[28px] leading-[35px] text-[#6956B2] max-w-[33vw] text-left">
          {`Through every project, I aim to turn creativity into something that sparks joy and connection`}
        </p>
        <p className="LexendRegular font-[400] text-[16px] leading-[20px] text-[#F1E306] max-w-[40vw] text-right mt-[90px]">
          {`I’m Dory, a Graphic Designer with an unlimited passion for turning creative ideas into reality. I always seek diversity and newness in design style; believing that every challenge is an opportunity to learn and grow. With experience working on many projects from brand identity, illustration, to digital communication, I always aim to create unique design products that reflect the spirit and values ​​of the client. Let's turn your ideas into inspiring works of art!`}
        </p>
      </div>

      <div className="mt-[200px]">
        <Contact />
      </div>
    </div>
  );
};

export default About;
