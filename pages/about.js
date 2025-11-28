import { useState } from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
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

        <div className="absolute top-[236px] w-full h-[600px] pointer-events-none">
          {/* --- CENTRAL IMAGE (ĐÃ SỬA HIỆU ỨNG LẬT) --- */}
          {/* 1. Container chính: giữ vị trí và tạo chiều sâu 3D (perspective) */}
          <div className="group absolute left-1/2 -translate-x-1/2 w-[300px] z-10 [perspective:1000px] pointer-events-auto">
            {/* 2. Inner Wrapper: Phần thực hiện xoay */}
            <div className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              {/* MẶT TRƯỚC (Ảnh gốc) */}
              <img
                src="/images/Layer_1.png"
                alt="Dory Front"
                className="w-full h-auto object-cover [backface-visibility:hidden]"
              />

              {/* MẶT SAU (Ảnh khi lật) */}
              {/* Bạn nhớ thay đường dẫn ảnh thứ 2 vào src bên dưới */}
              <img
                src="/images/Gemini_Generated_Image_dkmpshdkmpshdkmp 1.png"
                alt="Dory Back"
                className="absolute top-0 left-0 w-full h-full object-cover [backface-visibility:hidden] [transform:rotateY(180deg)]"
              />
            </div>
          </div>
          {/* ------------------------------------------- */}

          {/* FLOATING WORDS */}
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
