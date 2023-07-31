import React from "react";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { User } from "../../../api";
import { initialValues, validationSchema } from "./valuesForm";

const userController = new User();

export const PasswordUpdateForm = (props) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const { onClose } = props;

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        await userController.updateUserPassword(
          values.password,
          values.newPassword
        );
        onClose();
      } catch (error) {
        console.log(error);
      }
    },
  });

  const onShowHiddenPassword = () => setShowPassword(!showPassword);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input
        name="password"
        type={showPassword ? "text" : "password"}
        placeholder="Contraseña actual"
        icon={{
          name: showPassword ? "eye slash" : "eye",
          link: true,
          onClick: onShowHiddenPassword,
        }}
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.errors.password}
      />
      <Form.Input
        name="newPassword"
        type={showPassword ? "text" : "password"}
        placeholder="Nueva contraseña"
        icon={{
          name: showPassword ? "eye slash" : "eye",
          link: true,
          onClick: onShowHiddenPassword,
        }}
        onChange={formik.handleChange}
        value={formik.values.newPassword}
        error={formik.errors.newPassword}
      />
      <Form.Input
        name="repeatNewPassword"
        type={showPassword ? "text" : "password"}
        placeholder="Repetir nueva contraseña"
        icon={{
          name: showPassword ? "eye slash" : "eye",
          link: true,
          onClick: onShowHiddenPassword,
        }}
        onChange={formik.handleChange}
        value={formik.values.repeatNewPassword}
        error={formik.errors.repeatNewPassword}
      />
      <Form.Button type="submit" fluid primary loading={formik.isSubmitting}>
        Actualizar contraseña
      </Form.Button>
    </Form>
  );
};
