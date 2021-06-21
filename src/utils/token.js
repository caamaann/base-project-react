const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user_gakeslab"));
  if (user) {
    const { token } = user;
    return {
      headers: {
        "x-auth-token": token,
      },
    };
  }
};

export default getToken;
