import { PageAccess, type PagesProps } from "types/index.ts";
import { genId } from "./utils.ts";

export const PETS_PER_SECTION = 10;

export const PAGINATION_DEFAULT_SECTION = 1;
export const PAGINATION_CONTROL_SIZE = 1;
export const PAGINATION_CONTROL_SIZE_STEP = 3;

export const ALL_PAGES: PagesProps = [
  {
    id: genId(),
    title: "Пет проекты",
    src: "/pets",
    inSidebar: true,
    access: PageAccess.private
  },
  {
    id: genId(),
    title: "Заметки",
    src: "#",
    inSidebar: true,
    access: PageAccess.private
  },
  {
    id: genId(),
    title: "Репозитории",
    src: "#",
    inSidebar: true,
    access: PageAccess.private
  },
  {
    id: genId(),
    title: "Профиль",
    src: "#",
    inSidebar: false,
    access: PageAccess.private
  }
];
