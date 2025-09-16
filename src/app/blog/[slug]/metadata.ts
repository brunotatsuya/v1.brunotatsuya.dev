import { getPublishedPostBySlugAction } from "@/actions/posts/fetch";

type BlogSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogSlugPageProps) {
  const { slug } = await params;

  const { post } = await getPublishedPostBySlugAction(slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | Bruno Tatsuya`,
    description: post.description,
    openGraph: {
      type: "article",
      url: `https://brunotatsuya.dev/blog/${post.slug}`,
      title: `${post.title} | Bruno Tatsuya`,
      description: post.description,
      images: [post.coverImgurl],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Bruno Tatsuya`,
      description: post.description,
      images: [post.coverImgurl],
    },
  };
}
