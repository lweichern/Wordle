import React from "react";

export default function Tiles(props) {
  // console.log(props.isTransitioning, props.duration);
  // props.isTransitioning &&
  //   setTimeout(() => {
  //     console.log("Hello");
  //   }, props.duration * 1);
  const styles = {
    border: props.isFilled ? "2px solid #5f5f5f" : "2px solid #3a3a3c",
    backgroundColor:
      props.status === "wrong"
        ? "hsl(0, 0%, 21%)"
        : props.status === "correct"
        ? "#538d4e"
        : props.status === "wrong location"
        ? "#b59f3b"
        : "inherit",
  };

  return (
    <div
      className={props.isFilled ? "tile fillAnimation" : "tile"}
      style={styles}
      data-id={props.isTransitioning && props.id}
      data-duration={props.isTransitioning && props.duration % 5}
    >
      {props.value}
    </div>
  );
}
