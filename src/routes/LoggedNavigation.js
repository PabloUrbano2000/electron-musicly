import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { LoggedLayout } from "../layouts";
import { Home, Artists, Artist, Albums, Album, Profile } from "../pages";

export const LoggedNavigation = () => {
  return (
    <HashRouter>
      <LoggedLayout>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/artists" element={<Artists />}></Route>
          <Route path="/artists/:id" element={<Artist />}></Route>
          <Route path="/albums" element={<Albums />}></Route>
          <Route path="/albums/:id" element={<Album />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </LoggedLayout>
    </HashRouter>
  );
};
