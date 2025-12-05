import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion"; 
import Contact from "../components/Contact";
import Header from "../components/Header";

const About = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // 1. Ref cho container dài (timeline chính)
  const containerRef = useRef(null);
  
  // Lấy tiến độ cuộn của container (0 -> 1)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"] 
  });

  // --- 2. LOGIC SMART HEADER CÓ ĐIỀU KIỆN ---
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const { scrollY } = useScroll(); // Lấy scroll pixel thực tế của cả trang

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    
    // Lấy giá trị progress hiện tại của animation chữ
    // Lưu ý: scrollYProgress là MotionValue, cần dùng .get() để lấy số thực
    const progress = scrollYProgress.get(); 

    // MỐC 0.8: Là điểm kết thúc animation chữ (xem phần useTransform bên dưới)
    
    if (progress < 0.8) {
      // GIAI ĐOẠN 1: Chữ đang bay vào -> LUÔN HIỆN HEADER
      setIsHeaderHidden(false);
    } else {
      // GIAI ĐOẠN 2: Chữ đã xong -> ÁP DỤNG SMART SCROLL (Xuống ẩn, Lên hiện)
      if (latest > previous && latest > 100) {
        setIsHeaderHidden(true); // Cuộn xuống -> Ẩn
      } else {
        setIsHeaderHidden(false); // Cuộn lên -> Hiện
      }
    }
  });

  // --- 3. CẤU HÌNH ANIMATION ---
  const doryX = useTransform(scrollYProgress, [0, 1], ["30%", "0%"]);
  
  // Animation chữ chạy từ 0 -> 0.8
  const leftWordsX = useTransform(scrollYProgress, [0, 0.8], ["-50vw", "0vw"]);
  const rightWordsX = useTransform(scrollYProgress, [0, 0.8], ["50vw", "0vw"]);
  const wordsOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <div className="bg-primary relative">
      
      {/* --- HEADER --- */}
      <motion.div 
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={isHeaderHidden ? "hidden" : "visible"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 w-full z-50"
      >
        <Header isOpen={isOpen} setIsOpen={setIsOpen} indexHeader={1} />
      </motion.div>

      {/* CONTAINER CUỘN */}
      <div ref={containerRef} className="relative h-[250vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-start pt-[100px]">
          
          <motion.p 
            style={{ x: doryX }} 
            className="font-[700] text-[525px] leading-[451px] text-[#F1E306] text-center mob:text-[40vw] whitespace-nowrap select-none"
          >
            DORY
          </motion.p>

          <div className="absolute top-[236px] w-full h-[600px] pointer-events-none">
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

            <motion.div style={{ opacity: wordsOpacity }} className="w-full h-full">
                <motion.p style={{ x: leftWordsX }} className="font-[700] text-[70px] leading-[60px] text-[#7BC14B] absolute top-[25%] left-[29%] z-20">the</motion.p>
                <motion.p style={{ x: leftWordsX }} className="font-[700] text-[70px] leading-[60px] text-[#7BC14B] absolute top-[50%] left-[28%] z-20">idea</motion.p>
                <motion.p style={{ x: leftWordsX }} className="font-[700] text-[70px] leading-[60px] text-[#7BC14B] absolute top-[38%] left-[10%] z-20">Make</motion.p>

                <motion.p style={{ x: rightWordsX }} className="font-[700] text-[70px] leading-[60px] text-[#7BC14B] absolute top-[27%] right-[20%] z-20">become</motion.p>
                <motion.p style={{ x: rightWordsX }} className="font-[700] text-[70px] leading-[60px] text-[#7BC14B] absolute top-[48%] right-[10%] z-20">real</motion.p>
            </motion.div>
          </div>
        </div>
      </div>

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