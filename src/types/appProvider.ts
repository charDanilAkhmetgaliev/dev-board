export type AppStateProps = {
  userLogedIn: boolean;
};

export enum AppStateActionTypes {
  login = "login",
  logout = "logout"
}

export type AppStateActionProps =
  | { type: AppStateActionTypes.login }
  | { type: AppStateActionTypes.logout };

export type AppStateMethods = {
  userLogedIn: AppStateProps["userLogedIn"];
  login: () => void;
  logout: () => void;
};
