import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { motion, useScroll, useTransform } from "framer-motion";
import Contact from "../components/Contact";

const About = () => {
  const router = useRouter();
  
  // 1. Ref cho container dài để tạo timeline
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"] // Tính toán từ lúc container chạm đỉnh đến khi đáy chạm đáy
  });

  // --- CẤU HÌNH ANIMATION ---

  // 1. Chữ DORY: Trượt nhẹ sang trái để tạo chiều sâu
  const doryX = useTransform(scrollYProgress, [0, 1], ["30%", "0%"]);

  // 2. Nhóm chữ bên TRÁI (Make, the, idea): 
  // Ban đầu nằm tít bên trái (-100vw), khi cuộn thì về vị trí cũ (0vw)
  const leftWordsX = useTransform(scrollYProgress, [0, 0.8], ["-50vw", "0vw"]);
  
  // 3. Nhóm chữ bên PHẢI (become, real):
  // Ban đầu nằm tít bên phải (100vw), khi cuộn thì về vị trí cũ (0vw)
  const rightWordsX = useTransform(scrollYProgress, [0, 0.8], ["50vw", "0vw"]);

  // 4. Opacity: Mờ dần hiện rõ để mượt hơn
  const wordsOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <div className="bg-primary">
      
      {/* 1. CONTAINER CUỘN (Cao 250vh để tạo hành trình cuộn dài) */}
      <div ref={containerRef} className="relative h-[250vh]">
        
        {/* 2. STICKY VIEWPORT (Ghim màn hình lại để diễn hoạt cảnh) */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-start pt-[50px]">
          
          {/* --- DORY TEXT (Layer 0) --- */}
          <motion.p 
            style={{ x: doryX }} 
            className="font-[700] text-[525px] leading-[451px] text-[#F1E306] text-center mob:text-[40vw] whitespace-nowrap select-none"
          >
            DORY
          </motion.p>

          {/* Wrapper chứa Ảnh và Chữ nhỏ (Layer 1) */}
          <div className="absolute top-[300px] w-full h-[600px] pointer-events-none">
            
            {/* --- CENTRAL IMAGE --- */}
            <div className="group absolute left-1/2 -translate-x-1/2 w-[300px] z-10 [perspective:1000px] pointer-events-auto">
              <div className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <img
                  src="/images/Layer_1.png"
                  alt="Dory Front"
                  className="w-full h-auto object-cover [backface-visibility:hidden]"
                />
                <img
                  src="/images/Gemini_Generated_Image_dkmpshdkmpshdkmp 1.png"
                  alt="Dory Back"
                  className="absolute top-0 left-0 w-full h-full object-cover [backface-visibility:hidden] [transform:rotateY(180deg)]"
                />
              </div>
            </div>

            {/* --- FLOATING WORDS --- */}
            {/* Áp dụng opacity chung */}
            <motion.div style={{ opacity: wordsOpacity }} className="w-full h-full">
                
                {/* NHÓM BÊN TRÁI (Trượt từ trái vào) */}
                <motion.p 
                  style={{ x: leftWordsX }} 
                  className="font-[700] text-[70px] leading-[60px] text-[#7BC14B] absolute top-[25%] left-[29%] z-20"
                >
                  the
                </motion.p>
                <motion.p 
                  style={{ x: leftWordsX }} 
                  className="font-[700] text-[70px] leading-[60px] text-[#7BC14B] absolute top-[50%] left-[28%] z-20"
                >
                  idea
                </motion.p>
                <motion.p 
                  style={{ x: leftWordsX }} 
                  className="font-[700] text-[70px] leading-[60px] text-[#7BC14B] absolute top-[38%] left-[10%] z-20"
                >
                  Make
                </motion.p>

                {/* NHÓM BÊN PHẢI (Trượt từ phải vào) */}
                <motion.p 
                  style={{ x: rightWordsX }} 
                  className="font-[700] text-[70px] leading-[60px] text-[#7BC14B] absolute top-[27%] right-[20%] z-20"
                >
                  become
                </motion.p>
                <motion.p 
                  style={{ x: rightWordsX }} 
                  className="font-[700] text-[70px] leading-[60px] text-[#7BC14B] absolute top-[48%] right-[10%] z-20"
                >
                  real
                </motion.p>
            </motion.div>

          </div>
        </div>
      </div>

      {/* --- CONTENT TIẾP THEO (Chỉ hiện khi cuộn hết phần trên) --- */}
      <div className="relative z-20 bg-primary pt-[50px]">
        <div className="flex w-full justify-between px-[82px] mob:px-[30px]">
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
    </div>
  );
};

export default About;