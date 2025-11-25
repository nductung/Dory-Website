import { useRef, useState } from "react";
import { getPostBySlug, getAllPosts } from "../../utils/api";
import { useRouter } from "next/router";
import data from "../../data/portfolio.json";
import Contact from "../../components/Contact";

const BlogPost = ({ post }) => {
  const [showEditor, setShowEditor] = useState(false);
  const textOne = useRef();
  const textTwo = useRef();
  const router = useRouter();

  // useIsomorphicLayoutEffect(() => {
  //   stagger([textOne.current, textTwo.current], { y: 30 }, { y: 0 });
  // }, []);

  console.log(post.slug);
  console.log();
  const work = data.work[post.slug];

  if (!work) return <div className="bg-primary" />;

  console.log(work);

  return (
    <div className="bg-primary">
      <img className="" src={work.banner} alt="img" />
      <div className="px-[82px]">
        {work.image.map((item, index) => {
          return (
            <img
              key={"image_" + index}
              className="my-[64px]"
              src={item}
              alt="img"
            />
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
