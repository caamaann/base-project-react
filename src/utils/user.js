export function getUser() {
  let user = JSON.parse(localStorage.getItem("user_spk_beasiswa"));
  if (user) {
    return user;
  } else {
    return null;
  }
}
