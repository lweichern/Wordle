import React from "react";
import Tiles from "./Tiles";

export default function Boxes(props) {
  const tileElements =
    props.allTiles.length !== 0 &&
    props.allTiles.map((tile) => (
      <Tiles
        key={tile.id}
        isFilled={tile.isFilled}
        status={tile.status}
        value={tile.value}
        isTransitioning={tile.isTransitioning}
        duration={tile.duration}
        id={tile.id}
      />
    ));

  return <div className="tile-container">{tileElements}</div>;
}
