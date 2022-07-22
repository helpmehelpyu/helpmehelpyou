import Cookies from "js-cookie";

export function setAuthCookie(authToken: string) {
  Cookies.set("auth_token", authToken, {
    secure: process.env.NODE_ENV === "production",
  });
}

export function getAuthCookie(): string | undefined {
  return Cookies.get("auth_token");
}
