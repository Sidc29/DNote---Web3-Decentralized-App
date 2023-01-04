import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>Made by Siddharth. {year}</p>
      <p>Decentralized App. Made using Motoku</p>
    </footer>
  );
}

export default Footer;
