import React from "react";
import { StyleSheet, css } from "aphrodite";
import avatarImage from "../../../../assets/img/avatar.png";
import { getUser } from "../../../../utils/user";

const AvatarComponent = ({ image }) => {
  // const imageUrl =
  // `${process.env.REACT_APP_GAKESLAB_URL}/${image}`;
  return (
    <>
      <img
        // src={image ? imageUrl : avatarImage}
        src={avatarImage}
        alt="profil"
        width="100%"
        height="100%"
        className={css(styles.image)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: "50%",
    objectFit: "contain",
  },
});

AvatarComponent.propsTypes = {
  // image: node,
};
AvatarComponent.defaultProps = {
  // image: avatarImage,
};

export default AvatarComponent;
