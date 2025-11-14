"use client";
import { createPost } from "@/actions/supabase";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { produce } from "immer";
import { ArrowUpIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const MAX_TITLE_LENGTH = 120;

const CreatePost = () => {
  const { refresh } = useRouter();
  const [post, setPost] = useState({
    title: "",
  });

  const handleChange = (e) => {
    setPost(
      produce(post, (draft) => {
        draft.title = e.target.value;
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting post:", post);
    const { error } = await createPost(post);
    if (error) toast.error(error.message);
    else {
      toast.success("Problem posted successfully!");
      setPost({ title: "" });
      refresh();
    }
  };

  const charLeft = MAX_TITLE_LENGTH - post.title.length;

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-4 max-w-xl"
    >
      <InputGroup className={"bg-neutral-50 dark:bg-neutral-900"}>
        <InputGroupTextarea
          value={post.title}
          onChange={handleChange}
          rows={3}
          maxLength={MAX_TITLE_LENGTH}
          placeholder="Discuss a problem..."
        />
        <InputGroupAddon align="block-end">
          <InputGroupText className="text-muted-foreground text-xs">
            {charLeft} characters left
          </InputGroupText>
          <InputGroupButton
            variant="default"
            className="rounded-full ml-auto"
            type="submit"
            size="icon-xs"
            disabled={
              post.title.length === 0 || post.title.length > MAX_TITLE_LENGTH
            }
          >
            <ArrowUpIcon />
            <span className="sr-only">Send</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </form>
  );
};

export default CreatePost;
