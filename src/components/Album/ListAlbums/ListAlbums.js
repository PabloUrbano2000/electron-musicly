import React from "react";
import { Loader, Grid, Image } from "semantic-ui-react";
import { map, size } from "lodash";
import { Link } from "react-router-dom";
import "./ListAlbums.scss";

export const ListAlbums = ({ albums }) => {
  if (size(albums) === 0) {
    return (
      <Loader active inline="centered" size="large">
        Cargando
      </Loader>
    );
  }
  return (
    <Grid className="list-albums">
      <Grid.Row columns={5}>
        {map(albums, (alb) => (
          <Grid.Column
            key={alb.id}
            as={Link}
            to={`/albums/${alb.id}`}
            className="list-albums__album"
          >
            <Image src={alb.image} alt={alb.name} />
            <p>{alb.name}</p>
          </Grid.Column>
        ))}
      </Grid.Row>
    </Grid>
  );
};
