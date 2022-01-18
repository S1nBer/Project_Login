const lsTokenKey = "my_app_token";

function setToken(request) {
  const isAuthUrl = request.url.includes("auth");

  if (!isAuthUrl) {
    const token = localStorage.getItem(lsTokenKey);
    request.headers["x-access-token"] = token;
  }

  return request;
}

function setTokenOnLogin(response) {
  const isLoginUrl = response.config.url.includes("login");

  if (isLoginUrl) {
    const token = response.data.token;
    localStorage.setItem(lsTokenKey, token);
  }

  return response;
}

function getClearResponse(response) {
  return response.data;
}

function onError(err) {
  console.dir(err);
  return Promise.reject(err);
}

export default function (axios) {
  axios.interceptors.request.use(setToken);
  axios.interceptors.response.use(setTokenOnLogin);
  axios.interceptors.response.use(getClearResponse, onError);
}
