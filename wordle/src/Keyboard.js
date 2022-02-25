import React from "react";
import { faBackspace } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Keyboard(props) {
  return (
    <div className="keyboard">
      <button className="key" onClick={props.handleMouseClick} data-key="Q">
        Q
      </button>
      <button className="key" onClick={props.handleMouseClick} data-key="W">
        W
      </button>
      <button className="key" onClick={props.handleMouseClick} data-key="E">
        E
      </button>
      <button className="key" onClick={props.handleMouseClick} data-key="R">
        R
      </button>
      <button className="key" onClick={props.handleMouseClick} data-key="T">
        T
      </button>
      <button className="key" onClick={props.handleMouseClick} data-key="Y">
        Y
      </button>
      <button className="key" onClick={props.handleMouseClick} data-key="U">
        U
      </button>
      <button className="key" onClick={props.handleMouseClick} data-key="I">
        I
      </button>
      <button className="key" onClick={props.handleMouseClick} data-key="O">
        O
      </button>
      <button className="key" onClick={props.handleMouseClick} data-key="P">
        P
      </button>
      <div className="space"></div>
      <button className="key" onClick={props.handleMouseClick} data-key="A">
        A
      </button>
      <button className="key" onClick={props.handleMouseClick} data-key="S">
        S
      </button>
      <button className="key" onClick={props.handleMouseClick} data-key="D">
        D
      </button>
      <button className="key" onClick={props.handleMouseClick} data-key="F">
        F
      </button>
      <button className="key" onClick={props.handleMouseClick} data-key="G">
        G
      </button>
      <button className="key" onClick={props.handleMouseClick} data-key="H">
        H
      </button>
      <button className="key" onClick={props.handleMouseClick} data-key="J">
        J
      </button>
      <button className="key" onClick={props.handleMouseClick} data-key="K">
        K
      </button>
      <button className="key" onClick={props.handleMouseClick} data-key="L">
        L
      </button>
      <div className="space"></div>
      <button
        className="key large"
        onClick={props.handleMouseClick}
        data-enter="ENTER"
      >
        Enter
      </button>
      <button className="key" onClick={props.handleMouseClick} data-key="Z">
        Z
      </button>
      <button className="key" onClick={props.handleMouseClick} data-key="X">
        X
      </button>
      <button className="key" onClick={props.handleMouseClick} data-key="C">
        C
      </button>
      <button className="key" onClick={props.handleMouseClick} data-key="V">
        V
      </button>
      <button className="key" onClick={props.handleMouseClick} data-key="B">
        B
      </button>
      <button className="key" onClick={props.handleMouseClick} data-key="N">
        N
      </button>
      <button className="key" onClick={props.handleMouseClick} data-key="M">
        M
      </button>
      <button
        className="key large"
        onClick={props.handleMouseClick}
        data-backspace="BACKSPACE"
      >
        <FontAwesomeIcon
          icon={faBackspace}
          className="backspace-icon"
          onClick={props.handleMouseClick}
          data-backspace="BACKSPACE"
        />
      </button>
    </div>
  );
}
