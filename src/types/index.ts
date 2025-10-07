// export enum page {
//   pets = "page-pets",
//   notes = "page-notes",
//   repositories = "page-repositories",
//   profile = "page-profile"
// }

import type { PaginationSParams } from "./pagination.ts";

export enum PageAccess {
  public = "public",
  private = "private"
}

export type LinkProps<T extends string = string> = {
  id: T;
  title: string;
  src: string;
};

export interface PageProps extends LinkProps {
  inSidebar: boolean;
  access: PageAccess;
}

export type PagesProps = PageProps[];

export type SideBarLinksProps = LinkProps[];

export interface UserProps {
  userId: string;
  username: string;
  avatarLink: string;
}

export type ProfileAccessProps = Pick<UserProps, "username" | "avatarLink">;

export interface UserProps {
  userId: string;
  username: string;
  avatarLink: string;
}

export interface PetProps {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  link: string | null;
  previewLink: string | null;
}

export type ShortPetProps = Pick<
  PetProps,
  "id" | "title" | "shortDescription" | "previewLink"
>;

export type PetsProps = PetProps[];

export type PetsPageParams = {
  [key in PaginationSParams]: string;
};
