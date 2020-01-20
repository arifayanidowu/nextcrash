import Cookie from "js-cookie";
import Router from "next/router";

export function redirectUser(ctx, location) {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
}

export function handleLogin(token) {
  Cookie.set("token", token);
  Router.push("/");
}

export function handleLogout() {
  Cookie.remove("token");
  Router.push("/login");
}
