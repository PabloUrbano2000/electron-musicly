import React from "react";
import { Grid, Loader } from "semantic-ui-react";
import { map, size } from "lodash";
import { Link } from "react-router-dom";
import "./ListArtists.scss";

export const ListArtists = ({ artists }) => {
  if (size(artists) === 0) {
    return (
      <Loader active inline="centered" size="large">
        Cargando
      </Loader>
    );
  }
  return (
    <Grid className="list-artists">
      <Grid.Row columns={5}>
        {map(artists, (art) => (
          <Grid.Column
            key={art.id}
            as={Link}
            to={`/artists/${art.id}`}
            className="list-artists__artist"
          >
            <div style={{ backgroundImage: `url(${art.image})` }} />
            <p>{art.name}</p>
          </Grid.Column>
        ))}
      </Grid.Row>
    </Grid>
  );
};
