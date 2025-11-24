import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// Dữ liệu mẫu
const projects = [
  { title: "Mo Branding", color: "#F1E306", image: "/images/Mo work.png" },
  { title: "Men's Folio", color: "#6956B2", image: "/images/Folio work.png" },
  { title: "Heineken", color: "#7BC14B", image: "/images/henik work.png" }, // Center ban đầu
  { title: "Me Oi", color: "#000000", image: "/images/meoi work.png" },
  { title: "Bi Bong", color: "#F1E306", image: "/images/bibong work.png" },
  { title: "Project 6", color: "#6956B2", image: "/images/Folio work.png" },
  { title: "Project 7", color: "#7BC14B", image: "/images/henik work.png" },
];

const CARD_WIDTH = 300; // Chiều rộng thẻ
const CARD_HEIGHT = 400; // Chiều cao thẻ
const RADIUS = 800; // Bán kính của vòng tròn ảo
const ANGLE_STEP = 25; // Khoảng cách góc giữa các thẻ

export default function Work() {
  const containerRef = useRef(null);
  
  // 1. Theo dõi scroll của container cha
  // Container này cần cao (vd: 400vh) để có không gian scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 2. Biến đổi scroll progress thành góc xoay (Rotation)
  // Scroll từ 0 -> 1 sẽ xoay vòng tròn một góc nhất định
  const rawRotate = useTransform(scrollYProgress, [0, 1], [0, -180]); 
  const rotateValue = useSpring(rawRotate, { stiffness: 80, damping: 30, mass: 1 });

  // 3. Animation lúc mới vào trang (Entrance Animation)
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full bg-white">
      
      {/* Sticky Container: Giữ nội dung ở giữa màn hình khi scroll */}
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden">
        
        {/* Tiêu đề */}
        <div className="absolute top-10 z-50 text-center">
          <h2 className="text-4xl font-bold text-gray-800">Selected Works</h2>
          <p className="text-gray-500">Scroll to explore</p>
        </div>

        {/* Vòng tròn chứa các thẻ */}
        <div className="relative flex h-full w-full items-center justify-center">
          {projects.map((project, index) => {
            return (
              <CarouselItem
                key={index}
                index={index}
                total={projects.length}
                rotateValue={rotateValue}
                project={project}
                isLoaded={isLoaded}
              />
            );
          })}
        </div>
        
      </div>
    </div>
  );
}

// --- COMPONENT ITEM CON ---
const CarouselItem = ({ index, total, rotateValue, project, isLoaded }) => {
  // Bắt đầu từ góc -90 (đỉnh 12 giờ của vòng tròn)
  // index 0 ở giữa, các index sau rải đều sang phải theo chiều kim đồng hồ
  // Để index 0 ở giữa, ta có thể shift góc khởi đầu
  const initialOffset = -90; 
  const baseAngle = index * ANGLE_STEP + initialOffset;

  // Biến đổi toạ độ dựa trên giá trị xoay chung (rotateValue)
  const x = useTransform(rotateValue, (val) => {
    const currentAngle = baseAngle + val;
    // x = R * cos(theta)
    return Math.cos((currentAngle * Math.PI) / 180) * RADIUS;
  });

  const y = useTransform(rotateValue, (val) => {
    const currentAngle = baseAngle + val;
    // y = R * sin(theta) + RADIUS (để đẩy tâm xuống dưới)
    return Math.sin((currentAngle * Math.PI) / 180) * RADIUS + RADIUS; 
  });

  const rotate = useTransform(rotateValue, (val) => {
    // Thẻ tự xoay để luôn hướng về tâm
    return baseAngle + val + 90; 
  });

  const zIndex = useTransform(rotateValue, (val) => {
    const currentAngle = (baseAngle + val) % 360;
    const distance = Math.abs(currentAngle - (-90));
    return 100 - Math.round(distance); 
  });

  const scale = useTransform(rotateValue, (val) => {
     const currentAngle = baseAngle + val;
     const distance = Math.abs((currentAngle + 90) % 360); 
     // Zoom nhẹ khi ở gần trung tâm
     return distance < 15 ? 1.1 : 0.9;
  });

  return (
    <motion.div
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        x, 
        y: isLoaded ? y : 500, // Animation: từ dưới lên (500) về vị trí y chuẩn
        rotate: isLoaded ? rotate : 0,
        zIndex,
        scale,
      }}
      initial={{ y: 1000, opacity: 0, x: 0 }}
      animate={{ 
        opacity: 1,
        // Khi isLoaded, vị trí sẽ do style (useTransform) kiểm soát
        // animate ở đây chủ yếu để fade in
        transition: { 
            duration: 1.2, 
            ease: [0.16, 1, 0.3, 1], 
            delay: index * 0.05 
        } 
      }}
      className="absolute left-[calc(50%-150px)] top-[calc(50%-200px)] flex flex-col items-center justify-center origin-center cursor-pointer will-change-transform"
    >
      <div 
        className="h-full w-full overflow-hidden rounded-[30px] border-4 border-white bg-cover bg-center shadow-2xl transition-all hover:border-yellow-400"
        style={{ backgroundColor: project.color }}
      >
        <div className="h-[70%] w-full overflow-hidden">
             <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
        </div>
        
        <div className="flex h-[30%] flex-col items-center justify-center bg-white p-4 text-center">
            <h3 className="text-2xl font-bold text-black">{project.title}</h3>
            <p className="text-sm text-gray-500">Branding • Design</p>
        </div>
      </div>
    </motion.div>
  );
};