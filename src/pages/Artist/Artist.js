import React from "react";
import { useParams } from "react-router-dom";
import { Artist as ArtistController, Album, Song } from "../../api";
import "./Artist.scss";
import { ArtistBanner } from "../../components/Artist";
import { Slider } from "../../components/Shared";
import { map } from "lodash";

const artistController = new ArtistController();
const albumController = new Album();
const songController = new Song();

export const Artist = () => {
  const [artist, setArtist] = React.useState(null);
  const [albums, setAlbums] = React.useState(null);
  const [songs, setSongs] = React.useState(null);

  const { id } = useParams();

  React.useEffect(() => {
    (async () => {
      try {
        const response = await artistController.getArtist(id);
        setArtist(response);
      } catch (error) {
        console.log(error);
      }
    })();
    (async () => {
      try {
        const response = await albumController.getAlbumsByArtist(id);
        setAlbums(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  React.useEffect(() => {
    if (albums) {
      (async () => {
        try {
          let data = [];
          for await (const item of albums) {
            const result = await songController.obtainAllByAlbum(item.id);
            const dataTemp = map(result, (dataSong) => ({
              ...dataSong,
              image: item.image,
            }));
            data.push(...dataTemp);
            setSongs(data);
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [albums]);

  if (!artist) return null;

  return (
    <div className="artist-page">
      <ArtistBanner image={artist.image} name={artist.name} />
      <div className="artist-page__slider">
        <h2>Álbumes</h2>
        <Slider data={albums} basePath={"albums"} />
      </div>
      <div className="artist-page__slider">
        <h2>Canciones</h2>
        <Slider data={songs} song />
      </div>
    </div>
  );
};
