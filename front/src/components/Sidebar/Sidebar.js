import { Button } from "@material-ui/core";
import { push } from "connected-react-router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  return (
    <ul className="Sidebar">
      {user?.token && (
        <li>
          <Button
            fullWidth
            color="secondary"
            variant="outlined"
            onClick={() => dispatch(push("/cocktails/add"))}
          >
            add Cocktail
          </Button>
        </li>
      )}
      <li>
        <NavLink to="/cocktails/all" exact>
          All
        </NavLink>
      </li>
      {user?.token && (
        <li>
          <NavLink to="/cocktails/my" exact>
            My publications
          </NavLink>
        </li>
      )}
    </ul>
  );
};
export default Sidebar;
