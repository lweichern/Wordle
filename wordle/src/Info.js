import React from "react";
import Tiles from "./Tiles";
import { FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Info({ handleShowInfo }) {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 800, opacity: 0 }}
      className="info-container"
    >
      <div className="info-content">
        <p style={{ display: "flex", justifyContent: "space-between" }}>
          Guess the WORDLE in six tries!{" "}
          <FaTimes className="exit-icon" onClick={handleShowInfo} />
        </p>
        <p>
          Each guess must be a valid five-letter word. Hit the enter button to
          submit.
        </p>
        <p>
          After each guess, the color of the tiles will change to show how close
          your guess was to the word.
        </p>
        <hr></hr>
        <h5>How to play?</h5>
        <div
          className="tile-container"
          style={{
            justifyContent: "flex-start",
            marginTop: "1rem",
            gridTemplateRows: "repeat(1, 3.5em)",
          }}
        >
          <Tiles value={"F"} status="correct" />
          <Tiles value={"L"} />
          <Tiles value={"A"} />
          <Tiles value={"M"} />
          <Tiles value={"E"} />
        </div>
        <p>
          The letter <b>F</b> is in the word and in the correct position.
        </p>
        <div
          className="tile-container"
          style={{
            justifyContent: "flex-start",
            marginTop: "1rem",
            gridTemplateRows: "repeat(1, 3.5em)",
          }}
        >
          <Tiles value={"B"} />
          <Tiles value={"A"} />
          <Tiles value={"L"} status="wrong location" />
          <Tiles value={"O"} />
          <Tiles value={"T"} />
        </div>
        <p>
          The letter <b>L</b> is in the word but in the wrong position.
        </p>

        <div
          className="tile-container"
          style={{
            justifyContent: "flex-start",
            marginTop: "1rem",
            gridTemplateRows: "repeat(1, 3.5em)",
          }}
        >
          <Tiles value={"C"} />
          <Tiles value={"A"} />
          <Tiles value={"R"} />
          <Tiles value={"R"} />
          <Tiles value={"Y"} status="wrong" />
        </div>
        <p>
          The letter <b>Y</b> is not in the word in any spot.
        </p>

        <hr />

        <p>
          Refresh the page to get a new word! <br /> Happy Guessing!
        </p>
      </div>
    </motion.div>
  );
}
