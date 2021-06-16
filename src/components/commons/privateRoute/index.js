import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { default_url } from "../defaultUrl";
import { getUser } from "../../../utils/user";
import { useDispatch } from "react-redux";
import { setSelectedHeader, setGoBack } from "../../../store/actions/header";

const Index = ({
  component: Component,
  head,
  path,
  roles,
  goBack,
  ...rest
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    let param = head ? head : [];
    let url_link = path ? path : [];
    let back = goBack ? true : false;
    dispatch(setSelectedHeader(param));
    dispatch(setGoBack(back));
  }, [head, dispatch]);

  return (
    <Route
      {...rest}
      render={(props) => {
        const currentUser = getUser();

        // if (!currentUser) {
        //   // not logged in so redirect to login page with the return url
        //   return (
        //     <Redirect
        //       to={{ pathname: "/login", state: { from: props.location } }}
        //     />
        //   );
        // }

        // // check if route is restricted by role
        // if (roles && !roles.includes(currentUser.role_code.toLowerCase())) {
        //   // role not authorised so redirect to home page
        //   return (
        //     <Redirect
        //       to={{
        //         pathname: `/${
        //           default_url[currentUser.role_code.toLowerCase()]
        //         }`,
        //       }}
        //     />
        //   );
        // }

        // authorised so return component
        return <Component {...props} />;
      }}
    />
  );
};

export default Index;
