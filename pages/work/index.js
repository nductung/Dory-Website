import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Contact from "../../components/Contact";
import Header from "../../components/Header";

const cards = [
   {
    id: 1,
    img: "/images/work_2/M0 2.png",
    bg: "/images/work_2/moback 1.png",
    href: "/work/mo",
    text1: "Branding & identity",
    text2: "2023",
    text3: "MO",
  },
   {
    id: 2,
    img: "/images/work_2/M0 1.png",
    bg: "/images/work_2/folioback 1.png",
    href: "/work/folio",
    text1: "Publising",
    text2: "2023",
    text3: "Men’s Folio",
  },
   {
    id: 3,
    img: "/images/work_2/meoi2 2.png",
    bg: "/images/work_2/henback 2.png",
    href: "/work/heineken",
    text1: "Advertising Campaign",
    text2: "2023",
    text3: "Heineken",
  },
   {
    id: 4,
    img: "/images/work_2/meoi2 3.png",
    bg: "/images/work_2/meoiback 1.png",
    href: "/work/meoi",
    text1: "Advertising Campaign",
    text2: "2024",
    text3: "Me oi",
  },
   {
    id: 5,
    img: "/images/work_2/Ig điện thoại 1.png",
    bg: "/images/work_2/bibongback 1.png",
    href: "/work/bibong",
    text1: "Branding & identity",
    text2: "2025",
    text3: "Bi Bong",
  },
];

export default function SunHungStyle() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"] 
  });
  const [isOpen, setIsOpen] = useState(false);

  // Điều chỉnh x: Giữ nguyên logic trượt
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  return (
    <div className="relative bg-primary">
      
      {/* === LAYER 0: CONTACT === */}
      <motion.div 
        className="fixed inset-0 z-0 w-full h-screen bg-black flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
         <div className="w-full h-full px-4 flex items-center justify-center">
            <div className="w-full">
                <Contact />
            </div>
         </div>
      </motion.div>

      {/* === LAYER 1: NỘI DUNG CHÍNH === */}
      <div className="relative z-10">
        
        <div className="w-full pb-[50px] bg-primary">
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
            >
                <Header isOpen={isOpen} setIsOpen={setIsOpen} indexHeader={2} />
            </motion.div>
            
            <div className="flex flex-col items-start mt-[80px] overflow-hidden px-[60px]">
                <motion.p 
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="AristaProAlternateBoldtrial text-[100px] leading-[0.9] text-[#F1E306]"
                >
                    DESIGNS SHAPED
                </motion.p>
                <motion.p 
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                    className="AristaProAlternateBoldtrial text-[100px] leading-[0.9] text-[#F1E306]"
                >
                    BY CURIOSITY AND INTENTION
                </motion.p>
            </div>
        </div>

        {/* 2. KHU VỰC CARDS */}
        <div ref={targetRef} className="relative h-[350vh]">
            
            <div className="sticky top-0 h-screen overflow-hidden flex items-center">
               
               <motion.div style={{ x }} className="flex flex-row h-full">
                  
                  {/* Cards Container */}
                  <motion.div 
                      initial={{ y: 200, opacity: 0 }} 
                      animate={{ y: 0, opacity: 1 }}   
                      transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                      
                      // Thêm items-center để căn giữa dọc
                      className="flex flex-row gap-[40px] pl-[60px] pr-[100px] h-full items-center bg-primary"
                  >
                      {cards.map((card) => (
                        <div 
                            key={card.id} 
                            onClick={() => window.open(card.href, "_blank")}
                            className={`
                                group relative
                                flex-shrink-0 
                                flex flex-col // Xếp dọc: Ảnh trên, Chữ dưới
                                w-[55vh]      // Chiều rộng bằng chiều cao ảnh để khớp
                                cursor-pointer
                            `}
                        >
                          {/* --- PHẦN 1: ẢNH (GIỮ NGUYÊN) --- */}
                          <div className="relative w-full h-[55vh] aspect-square overflow-hidden shadow-xl bg-gray-200 mb-4"> 
                              {/* Layer 1: Background */}
                              <div className="absolute inset-0 z-0">
                                 <img 
                                    src={card.bg} 
                                    alt="bg" 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                 />
                                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                              </div>

                              {/* Layer 2: Main Image */}
                              <div className="absolute inset-0 z-10 flex items-center justify-center transition-transform duration-500 ease-in-out group-hover:scale-50">
                                 <img 
                                    src={card.img} 
                                    alt="main" 
                                    className="w-full h-full object-cover rounded-none shadow-none group-hover:shadow-2xl transition-all duration-500"
                                 />
                              </div>
                          </div>

                          {/* --- PHẦN 2: TEXT INFO (MỚI) --- */}
                          <div className="flex flex-col gap-1 w-full">
                              
                              {/* Hàng trên: Loại hình & Năm */}
                              <div className="flex justify-between items-center w-full text-sm  tracking-wide font-medium">
                                  <span className="capitalize whitespace-nowrap text-[#6956B2] transition-colors duration-300 group-hover:text-[#F1E306] text-[20px] leading-[38px] text-white LexendLight">
                                      {card.text1}
                                  </span>
                                  <span className="capitalize whitespace-nowrap text-[#6956B2] transition-colors duration-300 group-hover:text-[#F1E306] text-[20px] leading-[38px] text-white LexendLight">
                                      {card.text2}
                                  </span>
                              </div>

                              {/* Hàng dưới: Tên dự án */}
                              <h3 className="whitespace-nowrap text-3xl font-bold  leading-none text-[#F1E306] transition-colors duration-300 group-hover:text-[#F1E306] text-[40==35px] leading-[50px] text-white LexendRegular">
                                  {card.text3}
                              </h3>
                          </div>

                        </div>
                      ))}
                  </motion.div>
                  
                  {/* Cánh cửa trong suốt */}
                  <div className="flex-shrink-0 w-[100vw] h-full bg-transparent" />
                  
               </motion.div>
            </div>
        </div>

      </div>
    </div>
  );
}