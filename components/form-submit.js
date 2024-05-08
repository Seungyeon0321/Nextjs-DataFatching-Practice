"use client";

import { useFormStatus } from "react-dom";

export default function FormSubmit() {
  const status = useFormStatus();

  // pending은 boolean을 리턴한다
  if (status.pending) {
    return <p>Creating post...</p>;
  }
  //딱히 다른 설정은 필요없고 이렇게 useFormStatus을 다른 component으로 만든 후에
  //Form tag 안에 넣어두면 동작하게 된다
  return (
    <>
      <button type="reset">Reset</button>
      <button>Create Post</button>
    </>
  );
}
