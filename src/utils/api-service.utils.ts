import axios from "axios";

import { DictionaryType } from "@/types/common.type";
import { AuthStorageUtils } from "./storage.utils";

export const getAccessToken = (type = "Bearer") => {
  const token = AuthStorageUtils.getAccessToken();
  return `${type} ${token}`;
};

export const getAuthorizationHeader = () => {
  return { Authorization: getAccessToken() };
};

export const getClientHostName = () => {
  const localhost = `http://localhost:8000`;
  if (typeof window === "undefined") return localhost;
  if (process.env.NODE_ENV === "development") return localhost;
  return window?.location.hostname;
};

const apiRoute = `${getClientHostName()}/v1/api`;

const PRODUCTION_URL = apiRoute;
const DEVELOPMENT_URL = apiRoute;
export const api_request_methods = ["get", "post", "put", "patch", "delete"];
export const serverBaseUrl =
  process.env.NODE_ENV !== "production" ? DEVELOPMENT_URL : PRODUCTION_URL;
export interface APIResponse<T> {
  errorMessage?: string;
  responseCode?: string;
  data?: T;
}

export class ApiService<TData> {
  public endPoint: string;
  public headers: any = {
    "Content-Type": "application/json",
  };

  constructor(entitySlug: string, config?: { isLoggedIn?: boolean }) {
    this.endPoint = `${serverBaseUrl}/${entitySlug}`;

    this.headers.Authorization =
      config?.isLoggedIn !== false ? getAccessToken() : undefined;
  }

  async getOne(): Promise<APIResponse<TData>> {
    return await axios({
      method: "get",
      url: `${this.endPoint}`,
      headers: this.headers,
    });
  }
  async getAll(): Promise<APIResponse<TData[]>> {
    return await axios({
      method: "get",
      url: `${this.endPoint}`,
      headers: this.headers,
    });
  }
  async post(
    data: Omit<TData, "id" | "created_at" | "updated_at">
  ): Promise<APIResponse<TData>> {
    return await axios({
      method: "post",
      url: this.endPoint,
      data,
      headers: this.headers,
    });
  }

  async search(data: DictionaryType): Promise<APIResponse<TData>> {
    return await axios({
      method: "post",
      url: this.endPoint,
      data,
      headers: this.headers,
    });
  }
  async put(
    data: Omit<TData, "id" | "created_at" | "updated_at">
  ): Promise<APIResponse<TData>> {
    return await axios({
      method: "put",
      url: `${this.endPoint}`,
      data,
      headers: this.headers,
    });
  }
  async delete(id: string): Promise<void> {
    return await axios({
      method: "delete",
      url: `${this.endPoint}/${id}`,
      headers: this.headers,
    });
  }
}
