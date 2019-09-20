import React from "react";
import { NavItem, NavLink } from "reactstrap";

export default function SidebarItem({
  path,
  tag,
  onClick = () => {},
  icon,
  name,
  key = ""
}) {
  return (
    <NavItem key={key}>
      <NavLink to={path} tag={tag} onClick={onClick} activeClassName="active">
        <i className={icon} />
        {name}
      </NavLink>
    </NavItem>
  );
}
