const TOKEN = "token";
const USER = "user";

export const isLogin = () => {
  if (localStorage.getItem(TOKEN)) {
    return true;
  }

  return false;
};

export const getItem = () => {
  if (localStorage.getItem(USER)) {
    return JSON.parse(localStorage.getItem(USER));
  }
};
