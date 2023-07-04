import { api } from "./base";

const login = (email: string, password: string) =>
  api.post("/auth/login", { email, password });

const signup = (data: { email: string; password: string; username: string }) =>
  api.post("/auth/signup", data);

export { login, signup };
