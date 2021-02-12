import React, { useState } from "react";
import { Menu } from "antd";
import {
  MailOutlined,
  UserOutlined,
  CarFilled,
  CarOutlined,
  DownCircleOutlined,
  LogoutOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import fire from "../../firebase";
import { LOGOUT } from "../../JS/constants/actionTypes";
import { useHistory } from "react-router-dom";
import car from "../../image marque voiture/cars-pic/design/car-icon.png";

const { SubMenu } = Menu;
const Header = () => {
  const [current, setCurrent] = useState("");
  const { user } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();
  let history = useHistory();

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logOut = () => {
    fire.auth().signOut();
    dispatch({
      type: LOGOUT,
      payload: null,
    });
    history.push("/login");
  };

  return (
    <Menu
      style={{ backgroundColor: "#2d576f", color: "white" }}
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      theme="dark"
    >
      <Menu.Item key="logo" style={{ backgroundColor: "#2d576f" }}>
        <Link to="/">
          <img
            src={car}
            alt="icon"
            style={{
              width: "150px",
              height: "50px",
              objectFit: "cover",
              transform: "scale(1.9)",
            }}
          />{" "}
          <span className="logo1">AUTO</span> <span className="tick">~</span>{" "}
          <span className="logo2">4</span>
          <span className="tick">
            ~
          </span> <span className="logo3">SELL</span>{" "}
        </Link>
      </Menu.Item>
      <Menu.Item key="Vendre" icon={<CarFilled style={{ color: "#e87524" }} />}>
        <Link style={{ color: "white" }} to="/formauto">
          Vendre
        </Link>
      </Menu.Item>
      <Menu.Item
        key="Acheter"
        icon={<CarOutlined style={{ color: "#e87524" }} />}
      >
        <Link style={{ color: "white" }} to="/shop">
          Acheter{" "}
        </Link>
      </Menu.Item>
      <Menu.Item
        key="mail"
        icon={<MailOutlined style={{ color: "#e87524" }} />}
      >
        <Link style={{ color: "white" }} to="/contact">
          Contact
        </Link>
      </Menu.Item>
      {!user && (
        <Menu.Item
          className="float-right"
          key="Connecter"
          icon={<UserOutlined style={{ color: "#e87524" }} />}
        >
          <Link style={{ color: "white" }} to="/register">
            Connecter
          </Link>
        </Menu.Item>
      )}
      {user && user.role === "seller" && (
        <SubMenu
          className="float-right"
          key="connected"
          icon={<DownCircleOutlined style={{ color: "#e87524" }} />}
          title={user.email && user.email.split("@")[0]}
        >
          <Menu.Item
            icon={<LogoutOutlined style={{ color: "#e87524" }} />}
            onClick={logOut}
            key="logout"
          >
            Se déconnecter
          </Menu.Item>
        </SubMenu>
      )}
      {user && user.role === "admin" && (
        <SubMenu
          className="float-right"
          key="connected"
          icon={<DownCircleOutlined style={{ color: "#e87524" }} />}
          title={user.email && user.email.split("@")[0]}
        >
          <Menu.Item
            icon={<DashboardOutlined style={{ color: "#e87524" }} />}
            onClick={() => history.push("/admin/dashboard")}
            key="dashboard"
          >
            Dashboard
          </Menu.Item>
          <Menu.Item
            icon={<LogoutOutlined style={{ color: "#e87524" }} />}
            onClick={logOut}
            key="logout"
          >
            Se déconnecter
          </Menu.Item>
        </SubMenu>
      )}
    </Menu>
  );
};

export default Header;
