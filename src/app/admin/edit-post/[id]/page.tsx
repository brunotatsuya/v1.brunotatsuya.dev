import { notFound } from "next/navigation";

import { getPostByIdAction } from "@/actions/posts/fetch";
import PageLeaveConfirm from "@/components/ui/page-leave-confirm";

import Preview from "./components/preview";
import Editor from "./components/editor";

type EditPostPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const { post } = await getPostByIdAction(id);

  if (!post) {
    notFound();
  }

  return (
    <>
      <PageLeaveConfirm />
      <div className="bg-light2 min-vh-100">
        <Editor post={post} />
        <Preview post={post} />
      </div>
    </>
  );
}
