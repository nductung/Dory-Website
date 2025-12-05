import { getPostBySlug, getAllPosts } from "../../utils/api";
import data from "../../data/portfolio.json";
import Contact from "../../components/Contact";
import { motion } from "framer-motion"; // Đã có sẵn

const BlogPost = ({ post }) => {
  const work = data.work[post.slug];

  if (!work) return <div className="bg-primary" />;

  return (
    // Thêm overflow-hidden để tránh scroll ngang khi ảnh bay từ phải vào
    <div className="bg-[#ffffff] overflow-hidden">
      <img
        className="w-full h-screen object-cover"
        src={work.banner}
        alt="img"
      />

      <div
        className="px-[82px]"
        style={{
          backgroundImage: "url('/images/folioart 1.png')",
          backgroundSize: "auto",
          // backgroundPosition: "center",
        }}
      >
        {work.image.map((item, index) => {
          return (
            <motion.img
              key={"image_" + index}
              className="my-[64px]"
              src={item}
              alt="img"
              // --- CẤU HÌNH HIỆU ỨNG ---

              // 1. Trạng thái ban đầu: Mờ (0) và lệch sang phải (100px hoặc 20%)
              initial={{ opacity: 0, x: 100 }}
              // 2. Khi cuộn vào vùng nhìn thấy: Hiện rõ (1) và về vị trí gốc (0)
              whileInView={{ opacity: 1, x: 0 }}
              // 3. Thời gian và độ mượt
              transition={{
                duration: 1,
                ease: "easeOut",
              }}
              // 4. Cấu hình Viewport: once: false để lặp lại
              viewport={{
                once: false,
                amount: 0.2, // Chỉ kích hoạt khi thấy 20% ảnh (tránh giật ở mép)
              }}
            />
          );
        })}
      </div>
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
