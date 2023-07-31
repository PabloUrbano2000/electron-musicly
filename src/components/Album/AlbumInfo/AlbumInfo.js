import React from "react";
import { Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Artist } from "../../../api";
import "./AlbumInfo.scss";

const artistController = new Artist();

export const AlbumInfo = ({ album }) => {
  const { name, image, artist } = album;

  const [artistData, setArtistData] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      try {
        const response = await artistController.getArtist(artist);
        setArtistData(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [album]);

  return (
    <div className="album-info">
      <Image src={image} alt={name} />
      <div>
        <h1>{name}</h1>
        {artistData && (
          <p>
            De <Link to={`/artists/${artist}`}>{artistData.name}</Link>
          </p>
        )}
      </div>
    </div>
  );
};
