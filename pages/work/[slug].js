import { getPostBySlug, getAllPosts } from "../../utils/api";
import data from "../../data/portfolio.json";
import Contact from "../../components/Contact";
import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";

const BlogPost = ({ post }) => {
  const work = data.work[post.slug];

  if (!work) return <div className="bg-primary" />;

  return (
    <div className="bg-primary overflow-hidden">
      <Head>
        <title>{`Dory Portfolio - ${work.title || "Project"}`}</title>
        <meta
          name="description"
          content={`Details about the ${work.title || "project"} by Dory.`}
        />
      </Head>
      <div className="relative w-full h-auto">
        <img className="w-full h-auto" src={work.banner} alt="banner" />
      </div>

      <div className="px-[82px]">
        {work.image.map((item, index) => {
          return (
            <motion.div
              key={"image_" + index}
              className="my-[64px] relative w-full h-auto"
              /*
               * Image Reveal Effect
               * - Initial: Invisible (opacity 0) and shifted right by 100px.
               * - WhileInView: Fades in (opacity 1) and moves to original position (x: 0).
               * - Transition: Smooth easeOut over 1 second.
               * - Viewport: Triggers every time the image enters the viewport (once: false),
               *   starting when 20% of the image is visible.
               */
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                ease: "easeOut",
              }}
              viewport={{
                once: false,
                amount: 0.2,
              }}
            >
              <img src={item} alt="img" className="w-full h-auto" />
            </motion.div>
          );
        })}
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