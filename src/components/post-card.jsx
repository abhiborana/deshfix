"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import useLocalStorage from "@/hooks/useLocalStorage";
import { cn } from "@/lib/utils";
import useDeshfixStore from "@/store";
import { BadgeCheckIcon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { toast } from "sonner";
import Creation from "./creation";
import Creator from "./creator";

const PostCard = ({ problem }) => {
  const user = useDeshfixStore((state) => state.user);
  const dispatch = useDeshfixStore((state) => state.dispatch);

  const [upvotes, setUpvotes] = useLocalStorage("upvotes", []);
  const [downvotes, setDownvotes] = useLocalStorage("downvotes", []);

  const hasUpvoted = upvotes.includes(problem.id);
  const hasDownvoted = downvotes.includes(problem.id);

  const handleUpvote = () => {
    if (hasUpvoted) {
      setUpvotes(upvotes.filter((id) => id !== problem.id));
      toast.success("Upvote removed!");
    } else {
      setUpvotes([...upvotes, problem.id]);
      setDownvotes(downvotes.filter((id) => id !== problem.id));
      toast.success("Upvoted!");
    }
  };

  const handleDownvote = () => {
    if (hasDownvoted) {
      setDownvotes(downvotes.filter((id) => id !== problem.id));
      toast.success("Downvote removed!");
    } else {
      setDownvotes([...downvotes, problem.id]);
      setUpvotes(upvotes.filter((id) => id !== problem.id));
      toast.success("Downvoted!");
    }
  };

  const handleComment = () => {
    if (!user)
      return dispatch({ type: "SET_STATE", payload: { authModalOpen: true } });
    dispatch({ type: "SET_STATE", payload: { post: problem } });
  };
  return (
    <Item
      key={problem.id}
      variant="secondary"
      className="bg-neutral-100 dark:bg-neutral-900 cursor-pointer"
    >
      {problem.verified && (
        <ItemMedia>
          <BadgeCheckIcon className="size-5" />
        </ItemMedia>
      )}
      <ItemContent onClick={handleComment}>
        <ItemTitle>{problem.title}</ItemTitle>
        <ItemDescription>{problem.description}</ItemDescription>
      </ItemContent>
      <ItemFooter
        className={
          "font-medium flex items-center flex-wrap justify-start gap-2 text-sm text-neutral-500"
        }
      >
        <Creator createdBy={problem.created_by} className={"size-5"} />
        <Creation createdAt={problem.created_at} />
        <ItemActions className={"ml-auto"}>
          <ButtonGroup aria-label="upvote/downvote" className="">
            <Button
              variant="secondary"
              size="icon-sm"
              aria-label="Upvote"
              onClick={handleUpvote}
            >
              <ThumbsUpIcon
                className={cn(hasUpvoted ? "fill-green-500" : "")}
              />
            </Button>
            <Button
              variant="secondary"
              size="icon-sm"
              aria-label="Downvote"
              onClick={handleDownvote}
            >
              <ThumbsDownIcon
                className={cn(hasDownvoted ? "fill-red-500" : "")}
              />
            </Button>
          </ButtonGroup>
          <Button onClick={handleComment} variant="secondary">
            Comment
          </Button>
        </ItemActions>
      </ItemFooter>
    </Item>
  );
};

export default PostCard;
