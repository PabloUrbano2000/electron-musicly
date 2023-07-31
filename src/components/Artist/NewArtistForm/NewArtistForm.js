import React from "react";
import { v4 as uuid } from "uuid";
import { Form, Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import classNames from "classnames";
import { initialValues, validationSchema } from "./valuesForm";
import { noImage } from "../../../assets";
import { Storage, Artist } from "../../../api";
import "./NewArtistForm.scss";

const storageController = new Storage();
const artistController = new Artist();

export const NewArtistForm = (props) => {
  const { onClose } = props;

  const [image, setImage] = React.useState(null);

  const onDrop = React.useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];
    setImage(URL.createObjectURL(file));
    formik.setFieldValue("file", file);
  },[]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const { file, name } = values;
        const response = await storageController.uploadFile(
          file,
          "artist",
          uuid()
        );
        const url = await storageController.getUrlFile(
          response.metadata.fullPath
        );

        await artistController.create(url, name);
        onClose();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Form className="new-artist-form" onSubmit={formik.handleSubmit}>
      <div
        {...getRootProps()}
        className={classNames("new-artist-form__banner", {
          error: formik.errors.file,
        })}
      >
        <input {...getInputProps()} />
        <Image
          src={image || noImage}
          className={classNames({
            full: image,
          })}
        />
      </div>
      <Form.Input
        name="name"
        placeholder="Nombre del artista"
        onChange={formik.handleChange}
        value={formik.values.name}
        error={formik.errors.name}
      />
      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        Crear artista
      </Form.Button>
    </Form>
  );
};
