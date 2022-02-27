import React from "react";
import { FaInfoCircle } from "react-icons/fa";

export default function Header({ handleShowInfo }) {
  return (
    <header className="header">
      <div className="title">WORDLE</div>
      <FaInfoCircle className="info-icon" onClick={handleShowInfo} />
    </header>
  );
}
