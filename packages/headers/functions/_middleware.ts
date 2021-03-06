import type { HeadersPagesPluginFunction } from "../types";

export const onRequest: HeadersPagesPluginFunction = async ({
  next,
  pluginArgs,
}) => {
  const headers = new Headers(pluginArgs);

  let response = await next();
  response = new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  );

  for (const [name, value] of headers.entries()) {
    response.headers.set(name, value);
  }

  return response;
};
