import { getPostBySlug, getAllPosts } from "../../utils/api";
import data from "../../data/portfolio.json";
import Contact from "../../components/Contact";
import { motion } from "framer-motion";

const BlogPost = ({ post }) => {
  const work = data.work[post.slug];

  if (!work) return <div className="bg-primary" />;

  // console.log(work);

  const imageVariants = {
    hidden: { x: 150, opacity: 0 },
    show: {
      x: 0,
      opacity: 1,
      transition: { duration: 2, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-primary">
      <img className="" src={work.banner} alt="img" />
      <div className="px-[82px]">
        {work.image.map((item, index) => (
          <motion.img
            key={"image_" + index}
            src={item}
            alt="img"
            className="my-[64px]"
            variants={imageVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
          />
        ))}
      </div>
      <Contact />
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
  console.log(posts);
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
