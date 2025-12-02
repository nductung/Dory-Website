import { LinearGradient } from "react-text-gradients";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Contact from "../components/Contact";
import Header from "../components/Header";
import FallingImages from "../components/FallingImages";

// Easing cực mượt (Fluid Motion)
const TRANSITION = { duration: 1.2, ease: [0.76, 0, 0.24, 1] };

// --- FIX: MASKED REVEAL (Hiệu ứng đòn bẩy: Trái cố định, Phải vung lên) ---
const MaskedReveal = ({ children, delay = 0, className = "" }) => {
  return (
    // pb-4 để đảm bảo khi chữ nghiêng không bị cắt mất phần đáy
    <div className={`pointer-events-none select-none overflow-hidden py-4 -my-4 px-2 -mx-2 ${className}`}>
      <motion.div
        initial={{ y: "110%", rotate: -5 }} // Bắt đầu: Chìm sâu xuống và Nghiêng đầu phải xuống (-5 độ)
        animate={{ y: "0%", rotate: 0 }} // Kết thúc: Thẳng hàng
        transition={{
          ...TRANSITION,
          delay: delay,
        }}
        // QUAN TRỌNG: Xoay từ góc dưới bên trái -> Tạo cảm giác "lật" từ trái qua phải lên
        style={{ transformOrigin: "left bottom" }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const TextLineReveal = ({ children, delay = 0, className = "" }) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: false, margin: "-10%" }} // Kích hoạt khi vào tầm nhìn
        transition={{
          duration: 0.9,
          ease: [0.33, 1, 0.68, 1], // Easing kiểu "trượt nhẹ rồi dừng"
          delay: delay,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const WorkReveal = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      className={className}
      initial={{ x: -100, opacity: 0 }} // Bắt đầu: Dịch sang trái 100px và ẩn
      whileInView={{ x: 0, opacity: 1 }} // Khi thấy: Trượt về 0 và hiện rõ
      viewport={{
        once: true, // Lặp lại khi scroll
        margin: "-10%",
      }}
      transition={{
        duration: 0.8,
        ease: TRANSITION.ease,
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  // --- LOGIC: KHÓA SCROLL KHI MỞ MENU ---
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    // Cleanup function
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const listWork = [
    { title: "Mo Branding", logo: "/images/Mo work.png", href: "/work/mo" },
    {
      title: "Men's Folio",
      logo: "/images/Folio work.png",
      href: "/work/folio",
    },
    {
      title: "Heineken",
      logo: "/images/henik work.png",
      href: "/work/heineken",
    },
    { title: "Me oi", logo: "/images/meoi work.png", href: "/work/meoi" },
    {
      title: "Bi Bong Branding",
      logo: "/images/bibong work.png",
      href: "/work/bibong",
    },
  ];

  const aboutLines = [
    "Dory is a designer based in Vietnam, driven by curiosity, softness, and a little bit of ",
    "chaos. With a background in Graphic Design and a passion for visual storytelling, ",
    "she explores how colors, forms, and emotions can shape human experience. ",
    "Her work moves between clarity and playfulness — blending graphic design, ",
    "illustration, and brand thinking. Whether it’s a children’s toy concept, a quirky ",
    "game world, or a clean visual system, Nhi seeks the sweet spot between logic and ",
    "feeling, intention and instinct. ",
    "Her portfolio is both a personal space and a design playground — where ideas ",
    "grow, rules bend, and creativity stays honest. ",
  ];

  return (
    <div className="w-full bg-primary">
      <Header isOpen={isOpen} setIsOpen={setIsOpen} indexHeader={0} />

      {/* Introduction */}
      <div className="relative px-[98px] flex flex-col items-center mob:px-[25px] h-[calc(100vh-130px)] overflow-hidden">
        <FallingImages />
        <MaskedReveal delay={0} className="leading-[189px] mob:leading-[90px]">
          <LinearGradient
            className="text-hello AristaProAlternateLighttrial p-[4px] mob:text-[18vw]"
            gradient={["to left", "#F1E306"]}
          >
            {`Hello,`}
          </LinearGradient>
        </MaskedReveal>
        <div className="flex flex-row gap-[60px] mob:gap-[20px]">
          <MaskedReveal
            delay={0.15}
            className="leading-[189px] mob:leading-[90px]"
          >
            <LinearGradient
              className="text-hello AristaProAlternateLighttrial p-[4px] mob:text-[18vw]"
              gradient={["to left", "#F1E306"]}
            >
              {"This"}
            </LinearGradient>
          </MaskedReveal>
          <MaskedReveal
            delay={0.3}
            className="leading-[189px] mob:leading-[90px]"
          >
            <LinearGradient
              className="text-hello AristaProAlternateLighttrial p-[4px] mob:text-[18vw]"
              gradient={["to left", "#F1E306"]}
            >
              {"is"}
            </LinearGradient>
          </MaskedReveal>
          <MaskedReveal
            delay={0.45}
            className="leading-[189px] mob:leading-[90px]"
          >
            <LinearGradient
              className="text-hello AristaProAlternateLighttrial p-[4px] mob:text-[18vw]"
              gradient={["to left", "#7BC14B"]}
            >
              {"Dory"}
            </LinearGradient>
          </MaskedReveal>
        </div>
      </div>
      {/* About Section */}
      <div className="px-[145px] py-[145px] bg-[#6956B2] flex flex-col gap-[50px] mob:px-[30px] mob:py-[90px]">
        <p className="AristaProAlternateLighttrial font-[700] text-[88px] leading-[76px] text-center text-[#F1E306] ">
          WHO IS DORY?
        </p>
        {/* Khối text được căn giữa, chiều rộng giới hạn để giống layout tạp chí */}
        <div className="flex flex-col items-center gap-[0.2em] max-w-[100%]">
          {aboutLines.map((line, index) => (
            <TextLineReveal
              key={index}
              delay={index * 0.05} // Stagger nhanh (0.05s) tạo hiệu ứng gợn sóng mượt
              className="text-center"
            >
              <span className="LexendRegular font-[400] text-[#020202] text-[25px] leading-[1.4] inline-block leading-[76px]">
                {line}
              </span>
            </TextLineReveal>
          ))}
        </div>
      </div>

      {/* Work Section - ĐÃ CẬP NHẬT HIỆU ỨNG TRÁI QUA PHẢI + LẶP LẠI */}
      <div className="px-[82px] py-[135px] mob:px-[30px] mob:py-[90px]">
        <p className="font-[700] text-[88px] leading-[76px] text-[#6956B2] pb-[100px]">
          Work
        </p>
        {listWork.map((item, index) => (
          // Bọc mỗi item trong WorkReveal
          <WorkReveal key={`listWork_${index}`} delay={0.1}>
            <div
              className="flex flex-col h-[132px]"
              onClick={() => window.open(item.href, "_blank")}
            >
              <div className="relative group flex items-center justify-between cursor-pointer overflow-hidden">
                <span className="font-[700] text-[48px] leading-[41px] text-[#7BC14B] transition-transform duration-300 group-hover:translate-x-4">
                  {item.title}
                </span>
                <img
                  src={item.logo}
                  alt={item.title}
                  className="h-[132px] w-[132px] opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300"
                />
              </div>
            </div>
          </WorkReveal>
        ))}
      </div>

      {/* Contact Section */}
      <Contact />
    </div>
  );
}
