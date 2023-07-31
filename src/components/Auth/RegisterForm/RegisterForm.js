import React from "react";
import { Form, Icon } from "semantic-ui-react";
import { useFormik } from "formik";

import "./RegisterForm.scss";
import { initialValues, validationSchema } from "./valuesForm";

import { Auth } from "../../../api";

const auth = new Auth();

export const RegisterForm = (props) => {
  const { openLogin, goBack } = props;
  const [showPassword, setShowPassword] = React.useState(false);

  const onShowHiddenPassword = () => setShowPassword(!showPassword);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        await auth.register(values.email, values.password);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="register-form">
      <h1>Empieza a escuchar con una cuenta de Musicfy gratis</h1>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Input
          type="text"
          name="email"
          placeholder="Correo electrónico"
          icon={"mail outline"}
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
        />
        <Form.Input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Contraseña"
          icon={
            <Icon
              name={showPassword ? "eye slash" : "eye"}
              link
              onClick={onShowHiddenPassword}
            />
          }
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.errors.username}
        />
        <Form.Input
          type="text"
          name="username"
          placeholder="¿Como deberíamos llamarte?"
          icon="user circle outline"
          onChange={formik.handleChange}
          value={formik.values.username}
          error={formik.errors.username}
        />
        <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
          Continuar
        </Form.Button>
      </Form>
      <div className="register-form__options">
        <p onClick={goBack}>Volver</p>
        <p>
          ¿Ya tienes Musicfy? <span onClick={openLogin}>Iniciar sesión</span>
        </p>
      </div>
    </div>
  );
};
