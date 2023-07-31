import React from "react";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { User } from "../../../api";
import { initialValues, validationSchema } from "./valuesForm";

const userController = new User();

export const EmailUpdateForm = (props) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const { onClose } = props;

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        await userController.updateUserEmail(values.email, values.password);
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
        name="email"
        placeholder="Nuevo correo electrónico"
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.errors.email}
      />
      <Form.Input
        name="password"
        type={showPassword ? "text" : "password"}
        placeholder="Contraseña"
        icon={{
          name: showPassword ? "eye slash" : "eye",
          link: true,
          onClick: onShowHiddenPassword,
        }}
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.errors.password}
      />
      <Form.Button type="submit" fluid primary loading={formik.isSubmitting}>
        Actualizar email
      </Form.Button>
    </Form>
  );
};
