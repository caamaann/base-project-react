export function getUser() {
  let user = JSON.parse(localStorage.getItem("user_gakeslab"));
  if (user) {
    return user;
  } else {
    return null;
  }
}
