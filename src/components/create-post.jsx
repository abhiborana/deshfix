"use client";
import { createPost } from "@/actions/supabase";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import useDeshfixStore from "@/store";
import { produce } from "immer";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const MAX_DESC_LENGTH = 120;

const CreatePost = () => {
  const user = useDeshfixStore((state) => state.user);
  const dispatch = useDeshfixStore((state) => state.dispatch);

  const { refresh } = useRouter();
  const [post, setPost] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setPost(
      produce(post, (draft) => {
        draft[e.target.name] = e.target.value;
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      dispatch({ type: "SET_STATE", payload: { authModalOpen: true } });
      return;
    }
    setPost(
      produce(post, (draft) => {
        draft.created_by = user.id;
      })
    );
    const { error } = await createPost({ ...post, created_by: user.email });
    if (error) toast.error(error.message);
    else {
      toast.success("Problem posted successfully!");
      setPost(
        produce(post, (draft) => {
          draft.title = "";
          draft.description = "";
        })
      );
      refresh();
    }
  };

  const charLeft = MAX_DESC_LENGTH - post.description.length;

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-2 max-w-xl"
    >
      <Label className="text-xl font-bold text-center w-full" htmlFor="title">
        {`Post new problem`}
      </Label>
      <div className="flex flex-col gap-1">
        <InputGroup className={"bg-neutral-50 dark:bg-neutral-900"}>
          <InputGroupInput
            placeholder="Lets fix a problem"
            autoFocus
            name="title"
            value={post.title}
            onChange={(e) =>
              setPost(
                produce(post, (draft) => {
                  draft.title = e.target.value;
                })
              )
            }
          />
        </InputGroup>
        <InputGroup className={"bg-neutral-50 dark:bg-neutral-900"}>
          <InputGroupTextarea
            value={post.description}
            onChange={handleChange}
            rows={3}
            name="description"
            maxLength={MAX_DESC_LENGTH}
            placeholder="Add more details about your problem..."
          />
          <InputGroupAddon align="block-end">
            <InputGroupText className="text-muted-foreground text-xs">
              {charLeft} characters left
            </InputGroupText>
            <InputGroupButton
              variant="default"
              className="rounded-full ml-auto"
              type="submit"
              size="sm"
              disabled={
                post.title.length === 0 || post.title.length > MAX_DESC_LENGTH
              }
            >
              Post
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </form>
  );
};

export default CreatePost;
