import React from "react";
import { Layout } from "antd";

const Footer = () => {
  return (
    <Layout.Footer
      style={{
        textAlign: "center",
        backgroundColor: "#2d576f",
        position: "absolute",
        width: "100%",
        height: "60px",
        color: "white",
        marginTop: "1rem",
      }}
    >
      All Rights Reserved ©{new Date().getFullYear()} Created by M@K-FS-DEV
    </Layout.Footer>
  );
};

export default Footer;
