import request from "./request";

interface AdminLoginData {
  password: string;
  username: string;
}
interface ManageResult<T = {}> {
  code: number;
  data: T;
  message: string;
}
type PromiseRes<T> = Promise<ManageResult<T>>;
interface AdminLoginRes {
  token: string;
  tokenHead: string;
}
//当前用户信息
interface AdminInfoRes {
  menus: [];
}

//登录返回token
export const adminLoginApi = (
  data: AdminLoginData
): PromiseRes<AdminLoginRes> => request.post("/admin/login", data);
//获取当前用户信息
export const getAdminInfoApi = (): PromiseRes<AdminInfoRes> =>
  request.get("/admin/info");
