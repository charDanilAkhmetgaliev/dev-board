import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "components/ui/dropdown-menu";
import type React from "react";
import type { ProfileAccessProps } from "types";
import { getInitials } from "../../../lib/utils/utils.ts";

const ProfileAccess: React.FC<ProfileAccessProps> = ({
  username,
  avatarLink
}) => {
  console.log("profile-access");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={"flex items-center gap-2 p-2 cursor-pointer outline-0"}
      >
        <Avatar>
          <AvatarImage src={avatarLink ?? "https://github.com/shadcn.png"} />
          <AvatarFallback>{getInitials(username) ?? "AV"}</AvatarFallback>
        </Avatar>
        <div className="text-sm hidden md:block">
          {username ?? "Фамилия Имя"}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileAccess;
