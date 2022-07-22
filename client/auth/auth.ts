import Cookies from "js-cookie";

export function setAuthCookie(authToken: string) {
  Cookies.set("auth_token", authToken, {
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
}

export function getAuthCookie(): string | undefined {
  return Cookies.get("auth_token");
}

export function logout() {
  Cookies.remove("auth_token");
}
