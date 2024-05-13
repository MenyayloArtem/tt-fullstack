import axiosInstance from "../shared/confing/axiosInstance";

export default abstract class Api {
  static async get(url: string) {
    let res = await axiosInstance.get(url);
    return res;
  }

  static async post(url: string, body : any) {
    let res = await axiosInstance.post(url, body);
    return res;
  }

  static async patch(url: string, body : any) {
    let res = await axiosInstance.patch(url, body);
    return res;
  }

  static async delete(url: string, body : any) {
    let res = await axiosInstance.delete(url, {
      data : body
    });
    return res;
  }
}
