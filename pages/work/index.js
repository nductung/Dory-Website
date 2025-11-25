import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Contact from "../../components/Contact";

const cards = [
  { id: 1, color: "bg-red-400" },
  { id: 2, color: "bg-orange-300" },
  { id: 3, color: "bg-yellow-200" },
  { id: 4, color: "bg-lime-300" },
  { id: 5, color: "bg-green-400" },
  { id: 6, color: "bg-teal-300" },
  { id: 7, color: "bg-cyan-300" },
  { id: 8, color: "bg-blue-400" },
  { id: 9, color: "bg-indigo-300" },
  { id: 10, color: "bg-purple-400" },
];

function CardFountain() {
  const cardVariants = {
    // 1. Xuất phát: Ở dưới đáy màn hình và ở giữa
    hidden: {
      y: "110vh",
      x: 0,
      opacity: 0,
      scale: 0.5,
      rotate: 0,
    },

    // 2. Điểm đến: Bay thẳng đến vị trí toả ra
    visible: (index) => {
      // Tính toán vị trí ngẫu nhiên (Scatter Logic)
      // X: Rải đều từ trái qua phải
      const spreadX =
        (index - cards.length / 2) * 60 + (Math.random() * 40 - 20);

      // Y: Rải ngẫu nhiên lên xuống xung quanh tâm
      const spreadY = (index % 2 === 0 ? -1 : 1) * (Math.random() * 100 + 50);

      // Góc xoay ngẫu nhiên
      const rotation = Math.random() * 60 - 30;

      return {
        x: spreadX,
        y: spreadY,
        opacity: 1,
        scale: 1,
        rotate: rotation,

        transition: {
          // Logic cặp: 2 thẻ bay lên cùng lúc
          // Mỗi cặp cách nhau 0.2 giây (nhanh hơn để tạo cảm giác tuôn trào)
          delay: Math.floor(index / 2) * 0.2,

          type: "spring",
          stiffness: 70, // Độ nảy lò xo
          damping: 15, // Độ cản (giảm rung)
          mass: 1.2, // Độ nặng (tạo cảm giác vật lý)
        },
      };
    },
  };

  return (
    <div className="h-screen w-full bg-[#051f10] flex items-center justify-center overflow-hidden relative">
      {/* Container trung tâm */}
      <div className="relative flex items-center justify-center">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            custom={index}
            variants={cardVariants}
            initial="hidden" // Bắt đầu ở dưới
            animate="visible" // Bay thẳng đến vị trí toả ra
            className={`absolute w-56 h-56 rounded-xl shadow-2xl flex flex-col items-center justify-center p-4 border-[3px] border-white/80 ${card.color}`}
            style={{
              zIndex: index,
              transformOrigin: "center center",
            }}
          >
            {/* Giả lập nội dung */}
            <div className="w-full h-3/4 bg-white/20 rounded-lg mb-2 backdrop-blur-sm"></div>
          </motion.div>
        ))}
      </div>

      <div className="absolute bottom-10 text-white/40 text-sm">
        <button
          onClick={() => window.location.reload()}
          className="hover:text-white transition"
        >
          Reload Animation
        </button>
      </div>
    </div>
  );
}

export default function Work() {
  return (
    <div className="bg-primary">
      <CardFountain />
    </div>
  );
}
