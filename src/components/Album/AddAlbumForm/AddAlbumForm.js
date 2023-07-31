import React from "react";

import { Form, Image } from "semantic-ui-react";
import classNames from "classnames";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import { noImage } from "../../../assets";
import { Artist, Album, Storage } from "../../../api";
import { initialValues, validationSchema } from "./valuesForm";
import { map } from "lodash";

import "./AddAlbumForm.scss";
import { v4 as uuid } from "uuid";

const artistController = new Artist();
const albumController = new Album();
const storageController = new Storage();

export const AddAlbumForm = ({ onClose }) => {
  const [image, setImage] = React.useState(noImage);

  const [artistOptions, setArtistOptions] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        const response = await artistController.obtainAll();
        console.log(response);
        const newData = map(response, (art) => ({
          key: art.id,
          value: art.id,
          text: art.name,
        }));
        setArtistOptions(newData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const { name, image, artist } = values;
        const response = await storageController.uploadFile(
          image,
          "album",
          uuid()
        );
        const url = await storageController.getUrlFile(
          response.metadata.fullPath
        );
        await albumController.create(name, url, artist);
        onClose();
      } catch (error) {
        console.log(error);
      }
    },
  });

  const onDrop = React.useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];
    console.log(file);
    setImage(URL.createObjectURL(file));
    formik.setFieldValue("image", file);
  }, []);

  const { getInputProps, getRootProps } = useDropzone({ onDrop });

  return (
    <Form className="add-album-form" onSubmit={formik.handleSubmit}>
      <div className="add-album-form__content">
        <div
          {...getRootProps()}
          className={classNames("add-album-form__content-image", {
            error: formik.errors.image,
          })}
        >
          <input {...getInputProps()} />
          <Image src={image} />
        </div>
        <div className="add-album-form__content-inputs">
          <Form.Input
            name="name"
            placeholder="Nombre del álbum"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.errors.name}
          />
          <Form.Dropdown
            placeholder="El álbum pertenece..."
            fluid
            search
            selection
            options={artistOptions}
            error={formik.errors.artist}
            value={formik.values.artist}
            onChange={(_, data) => formik.setFieldValue("artist", data.value)}
          />
        </div>
      </div>
      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        Crear álbum
      </Form.Button>
    </Form>
  );
};
