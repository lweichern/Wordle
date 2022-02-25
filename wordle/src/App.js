import React, { useEffect, useState } from "react";
import Header from "./Header";
import Boxes from "./Boxes";
import Keyboard from "./Keyboard";
import Alert from "./Alert";
import { dictionary } from "./dictionary";
import { targetWords } from "./targetWords";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { act } from "react-dom/cjs/react-dom-test-utils.production.min";

export default function App() {
  const [wordle, setWordle] = useState(false);
  const [targetWord, setTargetWord] = useState("");
  const [stopGame, setStopGame] = useState(false);
  const [tiles, setTiles] = useState(generateTiles());
  const [activeTiles, setActiveTiles] = useState([]);
  const [nextTile, setNextTile] = useState(getFirstTile());
  const [guessTries, setGuessTries] = useState(0);
  const [lastFiveTiles, setLastFiveTiles] = useState([]);

  console.log(targetWord);
  // console.log(tiles);
  // console.log(tiles);

  useEffect(() => {
    const word = targetWords[Math.floor(Math.random() * targetWords.length)];
    setTargetWord(word);

    // const tileElem = document.getElementsByClassName("tile");
    // for (let i = 0; i < tileElem.length; i++) {
    //   tileElem[0].addEventListener("animationend", () => {
    //     tileElem[0].classList.remove("shakeAnimation");
    //   });
    // }
  }, []);

  useEffect(() => {
    setNextTile(getFirstTile());
    updateActiveTiles();
  }, [tiles]);

  useEffect(() => {
    if (guessTries === 6) {
      winLoseMessage(targetWord);
    }
  }, [guessTries]);

  // Function to generate tiles
  function generateTiles() {
    const newArray = [];
    for (let i = 0; i < 30; i++) {
      newArray.push({
        id: nanoid(),
        value: "",
        isFilled: false,
        status: "",
        isLocked: false,
        isTransitioning: false,
        duration: 0,
      });
    }

    return newArray;
  }

  function getFirstTile() {
    // Find the first element that value equals empty string
    const firstTile = tiles.find((tile) => !tile.isFilled);
    return firstTile;
  }

  function updateActiveTiles() {
    const activeArray = tiles.filter((tile) => tile.isFilled);

    setActiveTiles(activeArray);
  }

  // Function to detect typed keyboard letter onKeyDown
  function handleKeyDown(e) {
    if (e.key.toUpperCase() === "ENTER") {
      submitGuess();
    }

    if (
      e.key.toUpperCase() === "BACKSPACE" ||
      e.key.toUpperCase() === "DELETE"
    ) {
      deleteKey();
    }

    if (e.key.match(/^[a-z]$/)) {
      pressKey(e.key.toUpperCase());
    }
  }

  // Function to detect key clicked on UI keyboard
  function handleMouseClick(e) {
    // If there is a property called data-key then run
    if (e.target.matches("[data-key]")) {
      pressKey(e.target.dataset.key);
      return;
    }

    if (e.target.matches("[data-enter]")) {
      submitGuess();
      return;
    }

    if (e.target.matches("[data-backspace]")) {
      deleteKey();
      return;
    }
  }

  // Function to fill in tiles
  function pressKey(key) {
    setTiles((prevTiles) =>
      prevTiles.map((tile) =>
        tile.id === nextTile.id ? { ...tile, value: key, isFilled: true } : tile
      )
    );
  }

  // Function to delete tiles
  function deleteKey() {
    const duplicateTile = [...tiles];
    const reversedTiles = duplicateTile.reverse();
    const deleteTargetTile = reversedTiles.find((tile) => tile.isFilled);
    console.log(deleteTargetTile);
    activeTiles.length > 0 &&
      !deleteTargetTile.isLocked &&
      setTiles((prevTiles) =>
        prevTiles.map((tile) =>
          tile.id === deleteTargetTile.id
            ? { ...tile, value: "", isFilled: false, status: "" }
            : tile
        )
      );
  }

  // Function to submit guess
  function submitGuess() {
    if (activeTiles.length % 5 !== 0) {
      showAlert("Not Enough Letter!");
    } else {
      const guessedWord = activeTiles.slice(-5);
      const guessedIDArray = [];
      const guessedLetterArray = [];
      const splitTargetWord = targetWord.split("");

      guessedWord.map((word) =>
        guessedLetterArray.push(word.value.toLowerCase())
      );

      guessedWord.map((word) => guessedIDArray.push(word.id));

      // Compare array
      let winGame = splitTargetWord.every(
        (value, index) => value === guessedLetterArray[index]
      );

      if (!dictionary.includes(guessedLetterArray.join(""))) {
        showAlert("Please enter a valid word!");
        return;
      }

      if (winGame) {
        winWordle(guessedWord, splitTargetWord);
        winLoseMessage(targetWord);
        return;
      } else {
        const guessedWord = activeTiles.slice(-5);

        addFlipProperties(guessedWord);
        checkWordLocation(guessedWord, splitTargetWord);
        setGuessTries((prevGuessTries) => prevGuessTries + 1);
      }
    }
  }

  function showAlert(message, duration = 1000) {
    const alertContainer =
      document.getElementsByClassName("alert-container")[0];

    const alert = document.createElement("div");

    alert.textContent = message;
    alert.classList.add("alert-message");
    alertContainer.prepend(alert);

    if (message == null) return;

    setTimeout(() => {
      alert.classList.add("hide");
      alert.addEventListener("transitionend", () => {
        alert.remove();
      });
    }, duration);
  }

  function winLoseMessage(message) {
    const alertContainer =
      document.getElementsByClassName("alert-container")[0];

    const alert = document.createElement("div");

    alert.textContent = message;
    alert.classList.add("alert-message");
    alertContainer.prepend(alert);
  }

  function winWordle(guessedWord, targetWord) {
    setWordle(true);

    guessedWord.map((word) => {
      setTiles((prevTile) =>
        prevTile.map((tile, index) => {
          return {
            ...tile,
            status:
              word.id === tile.id &&
              targetWord[index % 5] === tile.value.toLowerCase()
                ? "correct"
                : tile.status,
          };
        })
      );
    });
  }

  function checkWordLocation(guessedWord, targetWord) {
    guessedWord.map((word) => {
      setTiles((prevTile) =>
        prevTile.map((tile, index) => {
          return {
            ...tile,
            isLocked: word.id === tile.id ? true : tile.isLocked,
            status:
              word.id === tile.id &&
              targetWord[index % 5] === tile.value.toLowerCase()
                ? "correct"
                : word.id === tile.id &&
                  targetWord[index % 5] !== tile.value.toLowerCase() &&
                  targetWord.includes(tile.value.toLowerCase())
                ? "wrong location"
                : word.id === tile.id &&
                  targetWord[index % 5] !== tile.value.toLowerCase()
                ? "wrong"
                : tile.status,
          };
        })
      );
    });
  }

  function addFlipProperties(guessedWord) {
    setTiles((prevTiles) =>
      prevTiles.map((tile, index) => {
        return {
          ...tile,
          isTransitioning: guessedWord.includes(tile) ? true : false,
          duration: index,
        };
      })
    );
  }

  return (
    <main tabIndex="0" onKeyDown={!wordle ? handleKeyDown : null}>
      {wordle && <Confetti />}
      <div className="content">
        <Alert />
        <Header />
        <Boxes allTiles={tiles} />
        <Keyboard handleMouseClick={!wordle ? handleMouseClick : null} />
      </div>
    </main>
  );
}
