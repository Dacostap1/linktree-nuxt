export const useCustomFetch = (request, opts) => {
  console.log(`test-server: ${process.server}`);
  const config = useRuntimeConfig();

  const xsrfToken = useCookie("XSRF-TOKEN");

  let headers = {
    accept: "application/json",
    ...opts?.headers,
  };

  if (xsrfToken && xsrfToken.value !== null) {
    headers["X-XSRF-TOKEN"] = xsrfToken;
  }

  if (process.server) {
    headers = {
      ...headers,
      ...useRequestHeaders(["cookie"]),
      referer: config.public.baseURL,
    };
  }

  //Abreviatura de usar AsyncData y $fetch
  //AsyncData es un composable para hacer ssr los request y $fetch es la peticion pero puede usarse hasta axios si se desea
  //Emite refs
  //pick elije los datos que llegan al front luego de hacer el request en ssr
  //El lazy se usa si al hacer ssr demora mucho ejecutando el request, entonces renderiza el html y luego hidrata la pagina con la respuesta del request (bueno para el SEO), la data al inicio es nula asi que debemeos usar watch

  return useFetch(request, {
    baseURL: config.public.apiBase,
    headers: headers,
    credentials: "include",
    ...opts,
  });
};
