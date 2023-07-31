import * as Yup from "yup";

export const initialValues = () => {
  return {
    file: null,
    name: "",
  };
};

export const validationSchema = () => {
  return Yup.object({
    file: Yup.string().required(true),
    name: Yup.string().required(true),
  });
};
