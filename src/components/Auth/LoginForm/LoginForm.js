import React from "react";
import { Icon, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { Auth } from "../../../api";
import { initialValues, validationSchema } from "./valuesForm";
import "./LoginForm.scss";

const auth = new Auth();

export const LoginForm = (props) => {
  const { openRegister, goBack } = props;

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        await auth.login(values.email, values.password);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const onShowHiddenPassword = () => setShowPassword(!showPassword);

  return (
    <div>
      <h1>Música para todos</h1>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Input
          name="email"
          type="text"
          placeholder="Correo electrónico"
          icon="mail outline"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
        />
        <Form.Input
          name="password"
          type={showPassword ? "type" : "password"}
          placeholder="Contraseña"
          icon={
            <Icon
              name={showPassword ? "eye slash" : "eye"}
              link
              onClick={onShowHiddenPassword}
            ></Icon>
          }
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.errors.password}
        />
        <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
          Iniciar Sesión
        </Form.Button>
      </Form>
      <div className="login-form__options">
        <p onClick={goBack}>Volver</p>
        <p>
          ¿No tienes cuenta? <span onClick={openRegister}>Registrarse</span>
        </p>
      </div>
    </div>
  );
};
