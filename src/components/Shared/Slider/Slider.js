import React from "react";
import { Icon, Image } from "semantic-ui-react";
import Slick from "react-slick";
import { Link } from "react-router-dom";
import { usePlayer } from "../../../hooks";

import "./Slider.scss";

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 5,
  swipeToSlide: true,
  centerMode: true,
  adaptiveHeight: true,
};

export const Slider = ({ data, basePath, song }) => {
  const { playSong } = usePlayer();

  const [size, setSize] = React.useState(0);
  const [loadCompleted, setLoadCompleted] = React.useState(false);
  const itemRef = React.useRef();

  React.useEffect(() => {
    if (loadCompleted && itemRef.current) {
      setSize(itemRef.current.clientWidth);
    }
  }, [loadCompleted]);

  return (
    <Slick {...settings} className="slider">
      {data?.map((item) => {
        if (song) {
          return (
            <div
              key={item.id}
              className="slider__item"
              ref={itemRef}
              onClick={() => playSong(item, item.image)}
              onLoad={() => setLoadCompleted(true)}
            >
              <div className="slider__item-block-play">
                <Image
                  src={item.image}
                  alt={item.name}
                  style={{ height: size }}
                />
                <Icon name="play circle outline" />
              </div>
              <h3>{item.name}</h3>
            </div>
          );
        }
        return (
          <Link
            to={`/${basePath}/${item.id}`}
            key={item.id}
            className="slider__item"
            ref={itemRef}
            onLoad={() => setLoadCompleted(true)}
          >
            <Image src={item.image} alt={item.name} style={{ height: size }} />
            <h3>{item.name}</h3>
          </Link>
        );
      })}
    </Slick>
  );
};
