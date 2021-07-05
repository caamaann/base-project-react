import React from "react";
import { StyleSheet, css } from "aphrodite";
import avatarImage from "../../../assets/img/avatar.png";
import IconAvatar from "../../../assets/icon/icon-avatar";

const AvatarComponent = ({ image }) => {
  // const imageUrl =
  // `${process.env.REACT_APP_GAKESLAB_URL}/${image}`;
  return (
    <>
      {/* {image ? ( */}
      <img
        src={image ? image : avatarImage}
        alt="profil"
        width="100%"
        height="100%"
        className={css(styles.image)}
      />
      {/* ) : (
        <IconAvatar />
      )} */}
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: "50%",
    objectFit: "contain",
  },
});

export default AvatarComponent;
