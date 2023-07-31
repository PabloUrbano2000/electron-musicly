import React from "react";
import { Button } from "semantic-ui-react";

import "./AuthOptions.scss";

export const AuthOptions = (props) => {
  const { openRegister, openLogin } = props;
  return (
    <div className="auth-options">
      <h1>Millones de canciones, gratis en Musicfy</h1>
      <Button className="register" onClick={openRegister}>
        Regístrate gratis
      </Button>
      <Button className="login" onClick={openLogin}>
        Inicia sesión
      </Button>
    </div>
  );
};
