import React from "react";
import { Icon, Image } from "semantic-ui-react";
import Slick from "react-slick";
import { Link } from "react-router-dom";
import { usePlayer } from "../../../hooks";

import "./Slider.scss";

export const Slider = React.memo(({ data, basePath, song }) => {
  const { playSong } = usePlayer();
  const [settings, setSettings] = React.useState({
    dots: false,
    infinite: true,
    swipeToSlide: true,
    slidesToShow: 5,
    centerMode: true,
    adaptiveHeight: true,
  });

  const [size, setSize] = React.useState(0);
  const [loadCompleted, setLoadCompleted] = React.useState(false);
  const itemRef = React.useRef();

  const adjustSlider = () => {
    let slidesToShow = 5;
    if (window !== "undefined" && window.innerWidth) {
      if (window.innerWidth < 700) {
        slidesToShow = 1;
      } else if (window.innerWidth < 900) {
        slidesToShow = 2;
      } else if (window.innerWidth < 1000) {
        slidesToShow = 3;
      } else if (window.innerWidth < 1200) {
        slidesToShow = 4;
      }
      setSettings({
        ...settings,
        slidesToShow,
      });
    }
  };

  React.useEffect(() => {
    if (loadCompleted && itemRef.current) {
      setSize(itemRef.current.clientWidth);
    }
  }, [loadCompleted]);

  // en un primer render
  React.useEffect(() => {
    if (loadCompleted && window) {
      adjustSlider();
    }
  }, [loadCompleted]);

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      adjustSlider();
    });
  }, []);

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
});
