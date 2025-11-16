"use client";

import { addComment, fetchComments } from "@/actions/supabase";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import useDeshfixStore from "@/store";
import { produce } from "immer";
import { MessageCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Creation from "./creation";
import Creator from "./creator";
import DrawerDialog from "./ui/dialog-drawer";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "./ui/input-group";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "./ui/item";
import { Label } from "./ui/label";
import { Skeleton } from "./ui/skeleton";

const PostDialog = () => {
  const post = useDeshfixStore((state) => state.post);
  const dispatch = useDeshfixStore((state) => state.dispatch);
  const userEmail = useDeshfixStore((state) => state.user?.email);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const getComments = async (postId) => {
    setLoading(true);
    const { data: comments, error } = await fetchComments(postId);
    setComments(comments);
    setLoading(false);
  };

  const handleNewCommentChange = (e) => {
    setComment(e.target.value);
  };

  const postId = post?.id;

  const addNewComment = async () => {
    if (!comment.trim()) return;
    const { data, error } = await addComment({
      problem_id: postId,
      comment,
      created_by: userEmail,
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    setComment("");
    setComments(
      produce(comments, (draft) => {
        draft.push(data);
      })
    );
  };

  useEffect(() => {
    if (postId && !loading) getComments(postId);

    return () => {
      setComments([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  return (
    <DrawerDialog
      open={Boolean(post)}
      setOpen={() => dispatch({ type: "SET_STATE", payload: { post: null } })}
      title={
        <>
          {post?.verified && <span className="inline-block mr-2">✅</span>}
          {post?.title || "Post Details"}
        </>
      }
      description={post?.created_by ? post.created_by.split("@")[0] : null}
    >
      <div className="flex flex-col gap-4 overflow-y-auto h-full p-4 md:p-0">
        <p className="text-sm">{post?.description}</p>
        <Label className="text-neutral-500">Comments ({comments.length})</Label>
        {loading ? (
          <div className="flex flex-col w-full flex-1 h-full gap-2">
            <Skeleton className={"w-full aspect-8/1 shrink-0"} />
            <Skeleton className={"w-full aspect-8/1 shrink-0"} />
          </div>
        ) : (
          <div className="flex flex-col w-full flex-1 h-full gap-2">
            {comments.length ? (
              comments.map((comment) => (
                <Item
                  variant="muted"
                  key={comment.id}
                  className="flex items-start justify-start gap-2 p-2"
                >
                  <ItemMedia>
                    <Creator
                      createdBy={comment.created_by}
                      className={"size-5"}
                    />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>{comment.comment}</ItemTitle>
                    <ItemDescription>
                      <Creation createdAt={comment.created_at} />
                    </ItemDescription>
                  </ItemContent>
                </Item>
              ))
            ) : (
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <MessageCircleIcon />
                  </EmptyMedia>
                  <EmptyTitle>No comments yet</EmptyTitle>
                  <EmptyDescription>
                    Be the first to comment on this problem.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            )}
          </div>
        )}
        <InputGroup>
          <InputGroupTextarea
            className="flex field-sizing-content min-h-16 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
            placeholder="Add a comment..."
            value={comment}
            onChange={handleNewCommentChange}
          />
          <InputGroupAddon align="block-end">
            <InputGroupButton
              className="ml-auto"
              size="sm"
              variant="default"
              onClick={addNewComment}
            >
              Post publicly
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </DrawerDialog>
  );
};

export default PostDialog;
