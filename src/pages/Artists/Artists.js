import React from "react";
import { Artist } from "../../api";
import { ListArtists } from "../../components/Artist";
import "./Artists.scss";

const artistController = new Artist();

export const Artists = () => {
  const [artists, setArtists] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        const response = await artistController.obtainAll();
        setArtists(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="artists-page">
      <h1>Artistas</h1>
      <ListArtists artists={artists} />
    </div>
  );
};
