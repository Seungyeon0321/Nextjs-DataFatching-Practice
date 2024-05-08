import { createPost } from "@/actions/posts";
import CreatedForm from "@/components/createForm";

export default function NewPostPage() {
  return (
    <>
      <CreatedForm action={createPost} />
    </>
  );
}
