import React from "react";
import Menu from "@material-ui/core/Menu";
import { StyleSheet, css } from "aphrodite";
import IconButton from "@material-ui/core/IconButton";

export default (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { button, horizontal } = props;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    document.body.style.paddingRight = 0;
  };

  const Button = button;
  return (
    <div className={css(styles.container)} style={props.style}>
      {button ? (
        <Button onClick={handleClick} />
      ) : (
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          {/* <IconCV /> */}
        </IconButton>
      )}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{
          vertical: "top",
          horizontal: horizontal ? horizontal : "left",
        }}
        keepMounted
        open={Boolean(anchorEl)}
        onClick={handleClose}
      >
        {props.children}
      </Menu>
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    border: "2px solid #FBFBFC",
    borderRadius: 17,
    backgroundColor: "white",
  },
});
