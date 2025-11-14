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
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { BadgeCheckIcon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const PostCard = ({ problem }) => {
  const [vote, setVote] = useState(null);

  return (
    <Item
      key={problem.id}
      variant="outline"
      className="bg-neutral-100 dark:bg-neutral-900"
    >
      <ItemMedia>
        <BadgeCheckIcon className="size-5" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{problem.title}</ItemTitle>
        <ItemDescription>{problem.description}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <ButtonGroup aria-label="upvote/downvote" className="">
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="Upvote"
            onClick={() => {
              if (vote === "upvote") return setVote(null);
              setVote("upvote");
              toast.success("Upvoted!");
            }}
          >
            <ThumbsUpIcon
              className={cn(vote === "upvote" ? "fill-green-500" : "")}
            />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="Downvote"
            onClick={() => {
              if (vote === "downvote") return setVote(null);
              setVote("downvote");
              toast.success("Downvoted!");
            }}
          >
            <ThumbsDownIcon
              className={cn(vote === "downvote" ? "fill-red-500" : "")}
            />
          </Button>
        </ButtonGroup>
      </ItemActions>
      <ItemFooter className={"font-medium text-sm text-neutral-500"}>
        {format(new Date(problem.created_at), "p, PP")}
      </ItemFooter>
    </Item>
  );
};

export default PostCard;
