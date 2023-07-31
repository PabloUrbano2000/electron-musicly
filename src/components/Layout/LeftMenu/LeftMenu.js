import React from "react";
import { Menu } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";
import { BasicModal } from "../../Shared";
import { NewArtistForm } from "../../Artist";
import { AddAlbumForm } from "../../Album";
import { AddSongForm } from "../../Song";
import "./LeftMenu.scss";

export const LeftMenu = () => {
  const { pathname } = useLocation();

  const [showModal, setShowModal] = React.useState(false);
  const [titleModal, setTitleModal] = React.useState("");
  const [contentModal, setContentModal] = React.useState(null);

  const closeModal = () => {
    setShowModal(false);
    setTitleModal("");
  };

  const openModal = (type) => {
    if (type === "artist") {
      setTitleModal("Nuevo artista");
      setContentModal(<NewArtistForm onClose={closeModal} />);
    }

    if (type === "album") {
      setTitleModal("Nuevo album");
      setContentModal(<AddAlbumForm onClose={closeModal} />);
    }

    if (type === "song") {
      setTitleModal("Nueva canción");
      setContentModal(<AddSongForm onClose={closeModal} />);
    }

    setShowModal(true);
  };

  const isCurrentPage = (route) => {
    return route === pathname;
  };

  return (
    <>
      <div className="left-menu">
        <Menu secondary vertical fluid>
          <Menu.Item
            as={Link}
            to="/"
            name="Inicio"
            icon="home"
            active={isCurrentPage("/")}
          />
          <Menu.Item
            as={Link}
            to="/artists"
            name="Artistas"
            icon="users"
            active={isCurrentPage("/artists")}
          />
          <Menu.Item
            as={Link}
            to="/albums"
            name="Albumes"
            icon="window maximize outline"
            active={isCurrentPage("/albums")}
          />
        </Menu>
        <Menu secondary vertical fluid>
          <Menu.Item
            name="Nueva canción"
            icon="plus"
            link
            onClick={() => openModal("song")}
          />
          <Menu.Item
            name="Nuevo album"
            icon="plus"
            link
            onClick={() => openModal("album")}
          />
          <Menu.Item
            name="Nuevo artista"
            icon="plus"
            link
            onClick={() => openModal("artist")}
          />
        </Menu>
      </div>
      <BasicModal
        show={showModal}
        onClose={closeModal}
        title={titleModal}
        children={contentModal}
      ></BasicModal>
    </>
  );
};
