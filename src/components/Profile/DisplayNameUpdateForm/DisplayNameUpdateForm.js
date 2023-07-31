import React from "react";

import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { User } from "../../../api";
import { initialValues, validationSchema } from "./valuesForm";

const userController = new User();
export const DisplayNameUpdateForm = (props) => {
  const { onClose } = props;
  const { displayName } = userController.getMe();

  const formik = useFormik({
    initialValues: initialValues(displayName),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
      try {
        await userController.updateDisplayName(values.displayName);
        onClose();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input
        name="displayName"
        placeholder="Nombre y apellidos"
        value={formik.values.displayName}
        onChange={formik.handleChange}
        error={formik.errors.displayName}
      />
      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        Actualizar nombre
      </Form.Button>
    </Form>
  );
};
