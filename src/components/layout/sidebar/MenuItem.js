import React from "react";
import { bool, func, string } from "prop-types";
import { Row, Column } from "simple-flexbox";
import { StyleSheet, css } from "aphrodite";
import MemberMemberChild from "./ChildMenuItem";
import Collapse from "@material-ui/core/Collapse";

const MenuItemComponent = (props) => {
  const { active, icon, title, child, ...otherProps } = props;
  const Icon = icon;
  return (
    <Column style={{ marginLeft: 20 }}>
      <Row
        className={css(styles.container, active && styles.activeContainer)}
        vertical="center"
        {...otherProps}
      >
        {active && <div className={css(styles.activeBar)}></div>}
        <Icon fill={active && "#FF7F00"} fontSize="small" />
        <span className={css(styles.title, active && styles.activeTitle)}>
          {title}
        </span>
      </Row>

      {child && (
        <div>
          <div style={{ marginTop: -20 }}>
            <Collapse in={props.active}>
              <Column
                style={{
                  width: "100%",
                  backgroundColor: "#7F8489",

                  borderBottomLeftRadius: 20,
                  padding: "30px 0 10px",
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
              >
                {child.map((item, index) => {
                  const { link, title, icon } = item;
                  return (
                    <MemberMemberChild
                      key={index}
                      link={link}
                      icon={icon}
                      title={title}
                    />
                  );
                })}
              </Column>
            </Collapse>
          </div>
        </div>
      )}
    </Column>
  );
};

const styles = StyleSheet.create({
  activeBar: {
    height: 40,
    width: 3,
    position: "absolute",
    left: 0,
  },
  activeContainer: {
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    boxShadow: "-10px 3px 10px #00000029",
    ":hover": {
      background: "#FFFFFF 0% 0% no-repeat padding-box",
    },
  },
  activeTitle: {
    color: "#495057",
  },
  container: {
    height: 40,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    cursor: "pointer",
    backgroundColor: "#495057",
    // backgroundColor: "linear-gradient(rgb(44, 185, 106)",
    paddingLeft: 20,
    paddingRight: 20,
    // marginLeft: 20,
    // marginBottom: 10,
    index: 10,
    position: "relative",
    ":hover": {
      background: "#7F8489 0% 0% no-repeat padding-box",
    },
  },

  childContainer: {
    height: 40,
    borderTopLeftRadius: 20,
    cursor: "pointer",
    paddingLeft: 20,
    paddingRight: 20,
    ":hover": {
      background: "#7F8489 0% 0% no-repeat padding-box",
    },
  },
  title: {
    color: "#FFFFFF",
    marginLeft: 20,
  },
});

export default MenuItemComponent;
