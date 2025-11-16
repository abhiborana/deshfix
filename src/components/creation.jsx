"use client";

import { format, formatDistanceToNow } from "date-fns";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const Creation = ({ createdAt, formatter = "PP, p", addSuffix = true }) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        {formatDistanceToNow(createdAt, {
          addSuffix,
        })}
      </TooltipTrigger>
      <TooltipContent>{format(createdAt, formatter)}</TooltipContent>
    </Tooltip>
  );
};

export default Creation;
