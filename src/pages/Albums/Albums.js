import React from "react";
import { Album } from "../../api";
import "./Albums.scss";
import { ListAlbums } from "../../components/Album";

const albumController = new Album();

export const Albums = () => {
  const [albums, setAlbums] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const response = await albumController.obtainAll();
      setAlbums(response);
    })();
  }, []);

  return (
    <div className="albums-page">
      <h1>Álbumes</h1>
      <ListAlbums albums={albums} />
    </div>
  );
};
