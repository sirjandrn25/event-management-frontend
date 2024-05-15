import { DictionaryType } from "@/types/common.type";

export default class LocalStorageUtils {
  static setLocalState(key: string, data: DictionaryType) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static getLocalState(key: string) {
    try {
      const data: any = localStorage.getItem(key);
      return JSON.parse(data);
    } catch (er) {
      return;
    }
  }

  static removeLocalState(key: string) {
    localStorage.removeItem(key);
  }

  static clearAllLocalStorage() {
    localStorage.clear();
  }
}

export type UserType = {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  email_verified: boolean;
};
export const authSession = "auth_session";
export type UserSessionType = {
  accessToken: string;
  refreshToken: string;
};
export class AuthStorageUtils {
  static getAccessToken() {
    const data = LocalStorageUtils.getLocalState(authSession);
    return data?.accessToken;
  }
  static getRefreshToken() {
    const data = LocalStorageUtils.getLocalState(authSession);
    return data?.refreshToken;
  }
  static getUser() {
    const data = LocalStorageUtils.getLocalState(authSession);
    return data?.user;
  }

  static logout() {
    localStorage.removeItem(authSession);
  }

  static setInfo(data: DictionaryType) {
    LocalStorageUtils.setLocalState(authSession, data);
  }
}
