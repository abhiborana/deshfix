import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const Creator = ({ createdBy, className }) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Avatar className={className}>
          <AvatarImage
            src={`https://api.dicebear.com/9.x/initials/svg?seed=${createdBy}`}
            alt={createdBy}
          />
          <AvatarFallback>UN</AvatarFallback>
        </Avatar>
      </TooltipTrigger>
      <TooltipContent>{createdBy.split("@")[0]}</TooltipContent>
    </Tooltip>
  );
};

export default Creator;
