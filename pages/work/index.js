import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import thêm AnimatePresence
import Contact from "../../components/Contact";

const cards = [
  {
    id: 1,
    color: "bg-red-400",
    label: "Pair 1",
    img: "/images/work/heniken/[Copy] Mo work.png",
    bg: "/images/work/heniken/henback 1.png",
  },
  {
    id: 2,
    color: "bg-red-300",
    label: "Pair 1",
    img: "/images/work/heniken/[Copy] Mo work 2.png",
    bg: "/images/work/heniken/henback 1.png",
  },
  {
    id: 3,
    color: "bg-purple-400",
    label: "Pair 5",
    img: "/images/work/meoi/bibong2 2.png",
    bg: "/images/work/meoi/henback 1.png",
  },
  {
    id: 4,
    color: "bg-purple-300",
    label: "Pair 5",
    img: "/images/work/meoi/[Copy] Mo work.png",
    bg: "/images/work/meoi/henback 1.png",
  },
  {
    id: 5,
    color: "bg-green-500",
    label: "WINNER",
    img: "/images/work/mo/bibong2 2.png",
    bg: "/images/work/mo/henback 1.png",
  },
  {
    id: 6,
    color: "bg-green-400",
    label: "WINNER",
    img: "/images/work/mo/[Copy] Mo work.png",
    bg: "/images/work/mo/henback 1.png",
  },

  {
    id: 7,
    color: "bg-orange-400",
    label: "Pair 2",
    img: "/images/work/bibong/bibong2 1.png",
    bg: "/images/work/bibong/henback 1.png",
  },
  {
    id: 8,
    color: "bg-orange-300",
    label: "Pair 2",
    img: "/images/work/bibong/[Copy] Mo work.png",
    bg: "/images/work/bibong/henback 1.png",
  },

  {
    id: 9,
    color: "bg-blue-400",
    label: "Pair 4",
    img: "/images/work/folio/bibong2 2.png",
    bg: "/images/work/folio/henback 1.png",
  },
  {
    id: 10,
    color: "bg-blue-300",
    label: "Pair 4",
    img: "/images/work/folio/[Copy] Mo work.png",
    bg: "/images/work/folio/henback 1.png",
  },
];

const TOTAL_PAIRS = 5;
const RADIUS = 400;
const ANIMATION_DURATION = 800;

// --- CẤU HÌNH ĐỘ NHẠY ---
// Số pixel cần cuộn để kích hoạt chuyển đổi.
// Tăng số này lên = Cần cuộn nhiều hơn (Nặng hơn)
// Giảm số này xuống = Nhạy hơn
const SCROLL_THRESHOLD = 150;

export default function LessSensitiveWheel() {
  const [animationStep, setAnimationStep] = useState("scatter");
  const [activeIndex, setActiveIndex] = useState(2);
  const isLocked = useRef(false);
  const scrollAccumulator = useRef(0);
  const resetTimeout = useRef(null);

  useEffect(() => {
    const t1 = setTimeout(() => setAnimationStep("filter"), 2000);
    const t2 = setTimeout(() => setAnimationStep("wheel"), 4000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    const handleWheel = (e) => {
      if (animationStep !== "wheel" || isLocked.current) return;

      scrollAccumulator.current += e.deltaY;
      clearTimeout(resetTimeout.current);
      resetTimeout.current = setTimeout(() => {
        scrollAccumulator.current = 0;
      }, 200);

      if (Math.abs(scrollAccumulator.current) > SCROLL_THRESHOLD) {
        isLocked.current = true;
        const direction = scrollAccumulator.current > 0 ? 1 : -1;

        setActiveIndex((prev) => {
          let next = prev + direction;
          if (next >= TOTAL_PAIRS) next = 0;
          if (next < 0) next = TOTAL_PAIRS - 1;
          return next;
        });

        scrollAccumulator.current = 0;
        setTimeout(() => {
          isLocked.current = false;
        }, ANIMATION_DURATION);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [animationStep]);

  const cardVariants = {
    hidden: { y: "120vh", x: 0, opacity: 0, rotate: 0 },
    scatter: (index) => ({
      x: (index - 5) * 60 + (Math.random() * 40 - 20),
      y: (index % 2 === 0 ? -1 : 1) * (Math.random() * 100 + 50),
      opacity: 1,
      scale: 1,
      rotate: Math.random() * 40 - 20,
      transition: { delay: Math.floor(index / 2) * 0.1, type: "spring" },
    }),
    filter: (index) => {
      if (index < 4)
        return { x: "-120vw", opacity: 0, transition: { duration: 1 } };
      if (index > 5)
        return { x: "120vw", opacity: 0, transition: { duration: 1 } };
      return {
        x: index === 4 ? -20 : 20,
        y: 0,
        scale: 1.3,
        rotate: index === 4 ? -5 : 5,
        opacity: 1,
        zIndex: 10,
        transition: { duration: 1, type: "spring" },
      };
    },
    wheel: (index) => {
      const pairIndex = Math.floor(index / 2);
      let diff = pairIndex - activeIndex;
      if (diff > TOTAL_PAIRS / 2) diff -= TOTAL_PAIRS;
      if (diff < -TOTAL_PAIRS / 2) diff += TOTAL_PAIRS;

      const isActive = diff === 0;
      const angle = diff * 45;
      const rad = (angle * Math.PI) / 180;

      return {
        x: RADIUS * Math.sin(rad),
        y: isActive ? 0 : RADIUS * (1 - Math.cos(rad)) + 100,
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1.4 : 0.6,
        rotate: angle + (index % 2 === 0 ? -5 : 5),
        zIndex: isActive ? 100 : 0,
        transition: { duration: ANIMATION_DURATION / 1000, ease: "easeInOut" },
      };
    },
  };

  return (
    <div className="bg-primary relative w-full h-screen overflow-hidden">
      {/* --- PHẦN BACKGROUND XỬ LÝ RIÊNG (FIX LỖI) --- */}
      <div className="absolute inset-0 w-full h-full z-0">
        <AnimatePresence mode="popLayout">
          <motion.img
            // Key quan trọng: Khi key đổi, ảnh cũ fade out, ảnh mới fade in
            key={activeIndex}
            // Lấy ảnh của thẻ đầu tiên trong cặp (Index chẵn: 0, 2, 4...)
            src={cards[activeIndex * 2].bg}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full object-cover"
            alt="background"
          />
          {/* Lớp phủ đen mờ để thẻ nổi bật hơn trên nền ảnh */}
          <div className="absolute inset-0 bg-black/40" />
        </AnimatePresence>
      </div>

      {/* --- PHẦN NỘI DUNG CHÍNH (Wheel) --- */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <div className="relative w-10 h-10 flex items-center justify-center">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={animationStep}
              className={`absolute w-56 h-64 flex flex-col items-center justify-center`}
              style={{ transformOrigin: "center 150%" }}
            >
              {/* Ảnh thẻ */}
              <img
                src={card.img}
                alt="img"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative z-50">
        <Contact />
      </div>
    </div>
  );
}
