import { SidebarTrigger } from "components/ui/sidebar.tsx";
import type React from "react";
import type { ProfileAccessProps } from "types";
import ProfileAccess from "../ProfileAccess/ProfileAccess.tsx";
import { ThemeButton } from "../ThemeButton/ThemeButton.tsx";

const Header: React.FC<ProfileAccessProps> = ({
  username,
  avatarLink
}: ProfileAccessProps) => {
  console.log("header");
  return (
    <header
      className={
        "m-auto w-full h-[var(--header-height)] lg:h-[var(--header-height-lg)] dark:bg-slate-800 bg-[#f8fafc] border-b-1 sticky top-0 left-0 pl-1 pr-2 py-1 flex justify-between items-center"
      }
    >
      <SidebarTrigger className="hover:bg-transparent hover:opacity-80 cursor-pointer" />
      <div className={"flex gap-2 items-center"}>
        <ProfileAccess username={username} avatarLink={avatarLink} />
        <ThemeButton />
      </div>
    </header>
  );
};

export default Header;
