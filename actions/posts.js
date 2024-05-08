"use server";

import { uploadImage } from "@/lib/cloudinary";
import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(prevState, formData) {
  //보통 서버에서 동작하는 녀석은 이렇게 명시할 필요가 없지만 해당 action은 client에서도 동작할 수 있기에
  //이렇게 명시해줘야 한다

  const title = formData.get("title");
  const image = formData.get("image");
  const content = formData.get("content");

  console.log(title, image, content);
  //Submit을 누르면 해당 데이터가 server side에 표시되는 것을 확인할 수 있다.

  //Error handling

  let errors = [];

  if (!title || title.trim().length === 0) {
    errors.push("Title is required");
  }

  if (!content || content.trim().length === 0) {
    errors.push("Content is required");
  }

  if (!image || image.size === 0) {
    errors.push("Image is required");
  }

  console.log(errors.length);

  if (errors.length > 0) {
    return { errors };
  }

  let imageUrl;

  try {
    imageUrl = await uploadImage(image);
  } catch {
    throw new Error(
      "Image upload failed, post was not created. Please try again later"
    );
  }
  await storePost({
    imageUrl: imageUrl,
    title,
    content,
    userId: 1,
  });
  revalidatePath("/", "layout");
  redirect("/feed");
}

export async function togglePostLikeStatus(postId) {
  updatePostLikeStatus(postId, 2);
  revalidatePath("/", "layout");
}
