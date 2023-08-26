import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as StellarLogo } from "../../resources/logo-stellar.svg";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <StellarLogo
        className="logo"
        onClick={() => {
          navigate("/");
        }}
      />
      <div className="brandedHeading">Account Explorer</div>
    </div>
  );
};

export default Header;
