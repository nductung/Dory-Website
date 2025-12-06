import { useState } from "react"; // Import useState
import { getPostBySlug, getAllPosts } from "../../utils/api";
import data from "../../data/portfolio.json";
import Contact from "../../components/Contact";
import Header from "../../components/Header"; // Import Header
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Router, { useRouter } from "next/router";

const BlogPost = ({ post }) => {
  const work = data.work[post.slug];

  // --- 1. State quản lý hiển thị Header ---
  const [isOpen, setIsOpen] = useState(false); // State cho menu mobile (nếu có)
  const [isHidden, setIsHidden] = useState(false); // State ẩn/hiện header
  const { scrollY } = useScroll();

  // --- 2. Logic bắt sự kiện cuộn ---
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();

    // Nếu cuộn xuống quá 100px và vị trí mới lớn hơn vị trí cũ -> Ẩn Header
    if (latest > previous && latest > 100) {
      setIsHidden(true);
    }
    // Nếu cuộn lên -> Hiện Header
    else {
      setIsHidden(false);
    }
  });

  if (!work) return <div className="bg-primary" />;

  // console.log(Object.keys(data.work), Object.keys(data.work).length);
  // console.log(work.order, work.href);
  const isPrev = work.order > 0;
  // const linkPrev =
  const isNext = work.order < 4;

  return (
    <div className="bg-[#ffffff] overflow-hidden relative">
      {/* --- 3. HEADER ANIMATION --- */}
      <motion.div
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 left-0 w-full z-50" // Dùng fixed để header luôn bám theo màn hình khi scroll lên
      >
        {/* Truyền props isOpen/setIsOpen nếu Header của bạn cần dùng */}
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      </motion.div>

      {/* Banner */}
      <img
        className="w-full h-screen object-cover"
        src={work.banner}
        alt="img"
      />

      {/* Content Images */}
      <div
        className="px-[82px] relative"
        style={{
          backgroundImage: "url('/images/folioart 1.png')",
          backgroundSize: "auto",
        }}
      >
        {work.image.map((item, index) => {
          return (
            <motion.img
              key={"image_" + index}
              className="pt-[64px] pb-[128px]"
              src={item}
              alt="img"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                ease: "easeOut",
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
            />
          );
        })}
        {isPrev && (
          <div
            className="absolute bottom-0 left-[60px] cursor-pointer"
            onClick={() =>
              Router.push(
                `/${
                  data.work[Object.keys(data.work)[work.order - 1]].href
                }`
              )
            }
          >
            <img className="" src={"/images/Group 10.png"} alt="img" />
          </div>
        )}
        {isNext && (
          <div
            className="absolute bottom-0 right-[60px] cursor-pointer"
            onClick={() => {
              Router.push(
                `/${
                  data.work[Object.keys(data.work)[work.order + 1]].href
                }`
              );
            }}
          >
            <img className="" src={"/images/Group 10 2.png"} alt="img" />
          </div>
        )}
      </div>

      {/* Footer / Contact */}
      <div className="bg-primary">
        <Contact />
      </div>
    </div>
  );
};

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    "date",
    "slug",
    "preview",
    "title",
    "tagline",
    "preview",
    "image",
    "content",
  ]);

  return {
    props: {
      post: {
        ...post,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);
  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
export default BlogPost;
