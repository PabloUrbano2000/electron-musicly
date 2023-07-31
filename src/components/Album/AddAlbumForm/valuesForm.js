import * as Yup from "yup";

export const initialValues = () => {
  return {
    image: null,
    name: "",
    artist: "",
  };
};

export const validationSchema = () => {
  return Yup.object({
    image: Yup.string().required(true),
    name: Yup.string().required(true),
    artist: Yup.string().required(true),
  });
};
