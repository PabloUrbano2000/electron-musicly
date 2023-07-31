import * as Yup from "yup";

export const initialValues = () => {
  return {
    name: "",
    album: "",
    file: null,
  };
};

export const validationSchema = () => {
  return Yup.object({
    name: Yup.string().required(true),
    album: Yup.string().required(true),
    file: Yup.string().required(true),
  });
};
