import React from "react";
import { useParams } from "react-router-dom";
import { Loader } from "semantic-ui-react";
import { Album as AlbumController, Song } from "../../api";
import { AlbumInfo } from "../../components/Album";
import { ListSongs } from "../../components/Song";
import "./Album.scss";

const albumController = new AlbumController();
const songController = new Song();

export const Album = () => {
  const { id } = useParams();
  const [album, setAlbum] = React.useState(null);
  const [songs, setSongs] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      try {
        const response = await albumController.getAlbum(id);
        setAlbum(response);
      } catch (error) {
        throw error;
      }
    })();
  }, [id]);

  React.useEffect(() => {
    (async () => {
      try {
        const response = await songController.obtainAllByAlbum(id);
        console.log(response);
        setSongs(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  if (!album) {
    return (
      <Loader active inline="centered" size="large">
        Cargando
      </Loader>
    );
  }

  return (
    <div className="album-page">
      <AlbumInfo album={album} />
      <ListSongs songs={songs} miniature={album.image} />
    </div>
  );
};
