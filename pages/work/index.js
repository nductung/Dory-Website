import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Contact from "../../components/Contact";
import Header from "../../components/Header";
import Head from "next/head";
import Image from "next/image";

// Card data configuration
const cards = [
  {
    id: 1,
    color: "bg-red-400",
    label: "Pair 1",
    img: "/images/work/heniken/[Copy] Mo work.png",
    bg: "/images/work/heniken/henback 1.png",
    href: "/work/heineken",
  },
  {
    id: 2,
    color: "bg-red-300",
    label: "Pair 1",
    img: "/images/work/heniken/[Copy] Mo work 2.png",
    bg: "/images/work/heniken/henback 1.png",
    href: "/work/heineken",
  },
  {
    id: 3,
    color: "bg-purple-400",
    label: "Pair 5",
    img: "/images/work/meoi/bibong2 2.png",
    bg: "/images/work/meoi/henback 1.png",
    href: "/work/meoi",
  },
  {
    id: 4,
    color: "bg-purple-300",
    label: "Pair 5",
    img: "/images/work/meoi/[Copy] Mo work.png",
    bg: "/images/work/meoi/henback 1.png",
    href: "/work/meoi",
  },
  {
    id: 5,
    color: "bg-green-500",
    label: "WINNER",
    img: "/images/work/mo/bibong2 2.png",
    bg: "/images/work/mo/henback 1.png",
    href: "/work/mo",
  },
  {
    id: 6,
    color: "bg-green-400",
    label: "WINNER",
    img: "/images/work/mo/[Copy] Mo work.png",
    bg: "/images/work/mo/henback 1.png",
    href: "/work/mo",
  },

  {
    id: 7,
    color: "bg-orange-400",
    label: "Pair 2",
    img: "/images/work/bibong/bibong2 1.png",
    bg: "/images/work/bibong/henback 1.png",
    href: "/work/bibong",
  },
  {
    id: 8,
    color: "bg-orange-300",
    label: "Pair 2",
    img: "/images/work/bibong/[Copy] Mo work.png",
    bg: "/images/work/bibong/henback 1.png",
    href: "/work/bibong",
  },

  {
    id: 9,
    color: "bg-blue-400",
    label: "Pair 4",
    img: "/images/work/folio/bibong2 2.png",
    bg: "/images/work/folio/henback 1.png",
    href: "/work/folio",
  },
  {
    id: 10,
    color: "bg-blue-300",
    label: "Pair 4",
    img: "/images/work/folio/[Copy] Mo work.png",
    bg: "/images/work/folio/henback 1.png",
    href: "/work/folio",
  },
];

const TOTAL_PAIRS = 5;
const RADIUS = 400;
const ANIMATION_DURATION = 800;
const SCROLL_THRESHOLD = 150;

export default function LessSensitiveWheel() {
  const [animationStep, setAnimationStep] = useState("intro-start");
  const [activeIndex, setActiveIndex] = useState(2);
  const isLocked = useRef(false);
  const scrollAccumulator = useRef(0);
  const resetTimeout = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  // State to control Footer visibility
  const [showFooter, setShowFooter] = useState(false);

  // Initial animation sequence
  useEffect(() => {
    const t0 = setTimeout(() => setAnimationStep("intro-center"), 100);
    const t1 = setTimeout(() => setAnimationStep("intro-top"), 2500);
    const t2 = setTimeout(() => setAnimationStep("scatter"), 3500);
    const t3 = setTimeout(() => setAnimationStep("filter"), 6000);
    const t4 = setTimeout(() => setAnimationStep("wheel"), 6000);
    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  // Wheel event handler for custom scrolling logic
  useEffect(() => {
    const handleWheel = (e) => {
      // Block if not in 'wheel' phase or if locked
      if (animationStep !== "wheel" || isLocked.current) return;

      scrollAccumulator.current += e.deltaY;
      clearTimeout(resetTimeout.current);
      resetTimeout.current = setTimeout(() => {
        scrollAccumulator.current = 0;
      }, 200);

      if (Math.abs(scrollAccumulator.current) > SCROLL_THRESHOLD) {
        // Direction: 1 is down (Next), -1 is up (Prev)
        const direction = scrollAccumulator.current > 0 ? 1 : -1;

        // Logic: Footer Handling
        if (showFooter) {
          // If Footer is open and scrolling up -> Close Footer, return to Wheel
          if (direction === -1) {
            isLocked.current = true;
            setShowFooter(false);
            scrollAccumulator.current = 0;
            setTimeout(() => {
              isLocked.current = false;
            }, ANIMATION_DURATION);
          }
          // If scrolling down in Footer -> Do nothing (default scroll)
          return;
        }

        // If Footer is closed (currently in Wheel view)
        if (!showFooter) {
          // If at the last pair (Pair 5 - Index 4) AND scrolling down -> Open Footer
          if (activeIndex === TOTAL_PAIRS - 1 && direction === 1) {
            isLocked.current = true;
            setShowFooter(true);
            scrollAccumulator.current = 0;
            setTimeout(() => {
              isLocked.current = false;
            }, ANIMATION_DURATION);
            return;
          }

          // Normal slide transition logic
          isLocked.current = true;
          setActiveIndex((prev) => {
            let next = prev + direction;

            // Loop logic:
            if (next >= TOTAL_PAIRS) next = 0;
            if (next < 0) next = TOTAL_PAIRS - 1;
            return next;
          });

          scrollAccumulator.current = 0;
          setTimeout(() => {
            isLocked.current = false;
          }, ANIMATION_DURATION);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [animationStep, activeIndex, showFooter]);

  /**
   * Card Variants for Animation Stages
   * - hidden: Initial off-screen state.
   * - scatter: Random scattering effect.
   * - filter: Filters cards to prepare for wheel.
   * - wheel: The main circular carousel layout.
   */
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
        return { x: "-120vw", opacity: 0, transition: { duration: 1000 } };
      if (index > 5)
        return { x: "120vw", opacity: 0, transition: { duration: 1000 } };
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
        scale: isActive ? (index % 2 == 0 ? 1.7 : 1.4) : 0.6,
        rotate: 0,
        zIndex: isActive ? 100 : 0,
        transition: { duration: ANIMATION_DURATION / 1000, ease: "easeInOut" },
      };
    },
  };

  /**
   * Text Intro Variants
   * Controls the animation of the introduction text.
   */
  const textVariants = {
    "intro-start": {
      top: "100%", // Start at bottom
      left: "50%",
      x: "-50%",
      y: "100%",
      scale: 1,
      opacity: 0,
    },
    "intro-center": {
      top: "50%", // Fly to center
      left: "50%",
      x: "-50%",
      y: "-50%",
      scale: 1,
      opacity: 1,
      transition: { duration: 1.5, ease: "easeOut" },
    },
    "intro-top": {
      top: "0%", // Fly to header position
      left: "50%",
      x: "-50%",
      y: "0%",
      scale: 1,
      opacity: 1,
      transition: { duration: 1.5, ease: "easeInOut" },
    },
    // Subsequent states (scatter, wheel...) keep text at top but scaled down
    scatter: {
      top: "0%",
      left: "50%",
      x: "-50%",
      y: "0%",
      scale: 0.5,
      opacity: 0.8,
    },
    filter: {
      top: "-50%",
      left: "50%",
      x: "-50%",
      y: "0%",
      scale: 0.5,
      opacity: 0.8,
    },
    wheel: {
      top: "-50%",
      left: "50%",
      x: "-50%",
      y: "0%",
      scale: 0.5,
      opacity: 0.8,
    },
  };

  return (
    <div className="bg-primary relative w-full h-screen overflow-hidden">
      <Head>
        <title>Dory Portfolio - Work</title>
        <meta
          name="description"
          content="Explore Dory's design projects and creative works."
        />
      </Head>
      <motion.div
        className={`fixed z-40 w-max pointer-events-none ${showFooter ? "hidden" : ""
          }`}
        variants={textVariants}
        initial="intro-start"
        animate={animationStep}
      >
        <div className="flex flex-col gap-[20px] text-left items-start">
          <h1 className="font-[700] text-[100px] leading-[86px] text-[#F1E306] whitespace-nowrap uppercase">
            Designs shaped by
          </h1>
          <span className="font-[700] text-[100px] leading-[86px] text-[#F1E306] whitespace-nowrap uppercase">
            Curiosity and Intention
          </span>
        </div>
      </motion.div>

      {/* Main Container */}
      <motion.div
        className="w-full h-full"
        animate={{ y: showFooter ? "-100vh" : "0vh" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* VIEW 1: WHEEL */}
        <div className="relative w-full h-screen overflow-hidden">
          {animationStep === "wheel" && (
            <div className="absolute inset-0 w-full h-full z-0">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={cards[activeIndex * 2].bg}
                    alt="background"
                    layout="fill"
                    objectFit="cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-black/40" />
              </AnimatePresence>
            </div>
          )}

          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <div
              className={`relative w-10 h-10 flex items-center justify-center ${animationStep === "wheel" ? "mt-[120px]" : ""
                }`}
            >
              {cards.map((card, index) => (
                <motion.div
                  key={card.id}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate={
                    ["intro-start", "intro-center", "intro-top"].includes(
                      animationStep
                    )
                      ? "hidden"
                      : animationStep
                  }
                  className={`absolute w-60 h-60 flex flex-col items-center justify-center cursor-pointer`}
                  style={{
                    transformOrigin:
                      animationStep === "wheel"
                        ? index % 2 === 0
                          ? "80% 100%"
                          : "-40% 120%"
                        : "50% 50%",
                  }}
                  onClick={() => window.open(card.href, "_blank")}
                >
                  <div className="relative w-full h-full drop-shadow-2xl">
                    <Image
                      src={card.img}
                      alt="img"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* VIEW 2: FOOTER */}
        <div className="relative w-full h-screen bg-black z-20 flex flex-col justify-center">
          <Contact />
        </div>
      </motion.div>

      {/* Header Animation */}
      <motion.div
        className="absolute z-50 top-0 left-0 right-0"
        // Logic: If showFooter = true -> Translate up -100% (Hide)
        // If showFooter = false -> Translate to 0 (Show)
        animate={{ y: showFooter ? "-100%" : "0%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <Header isOpen={isOpen} setIsOpen={setIsOpen} indexHeader={2} />
      </motion.div>
    </div>
  );
}
