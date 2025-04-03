import React from "react";
import CubixComponent from "./cubixLoader.style";

export default CubixLoader => (
  <CubixComponent>
    <div className="preloader">
      <div className="loader rubix-cube">
        <div className="layer layer-1"/>
        <div className="layer layer-2"/>
        <div className="layer layer-3 color-1"/>
        <div className="layer layer-4"/>
        <div className="layer layer-5"/>
        <div className="layer layer-6"/>
        <div className="layer layer-7"/>
        <div className="layer layer-8"/>
      </div>
    </div>
  </CubixComponent>
);
