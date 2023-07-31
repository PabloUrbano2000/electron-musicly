import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "semantic-ui-css/semantic.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./scss/global.scss";
import "./utils/firebase";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
