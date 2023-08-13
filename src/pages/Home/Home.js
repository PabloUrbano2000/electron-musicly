import React from "react";
import { Artist, Album, Song } from "../../api";
import { Slider } from "../../components/Shared";
import { bannerHome } from "../../assets";
import "./Home.scss";

const artistController = new Artist();
const albumController = new Album();
const songController = new Song();

export const Home = () => {
  const [artists, setArtists] = React.useState([]);
  const [albums, setAlbums] = React.useState([]);
  const [songs, setSongs] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        const response = await artistController.getLastArtists(6);
        setArtists(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      try {
        const response = await albumController.getLastAlbums(6);
        setAlbums(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      try {
        const response = await songController.getLastSongs(6);
        let data = [];
        for await (const item of response) {
          const song = item;
          const resultAlbum = await albumController.getAlbum(item.album);
          song.image = resultAlbum.image;
          data.push(song);
        }
        setSongs(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="home-page">
      <div
        className="home-page__banner"
        style={{
          background: `url(${bannerHome})`,
        }}
      />
      <div className="home-page__slider">
        <h2>Últimos artistas</h2>
        {artists && <Slider data={artists} basePath={"artists"} />}
      </div>
      <div className="home-page__slider">
        <h2>Últimos álbumes</h2>
        {albums && <Slider data={albums} basePath={"albums"} />}
      </div>
      <div className="home-page__slider">
        <h2>Últimas canciones</h2>
        {songs && <Slider data={songs} song />}
      </div>
    </div>
  );
};
