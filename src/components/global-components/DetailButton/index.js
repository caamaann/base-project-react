import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

export default (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
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
    <div>
      {button ? (
        <Button onClick={handleClick} />
      ) : (
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreHorizIcon />
        </IconButton>
      )}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{
          vertical: "top",
          horizontal: horizontal ? horizontal : "center",
        }}
        // keepMounted
        open={Boolean(anchorEl)}
        onClick={handleClose}
      >
        {props.children}
      </Menu>
    </div>
  );
};
