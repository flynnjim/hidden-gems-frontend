"use client";
import NavBar from "./NavBar";

function Header() {
  return (
    <header className="bg-listcolor p-2">
      <div className="container flex gap-4 items-center">
        <NavBar />
        <h1 className="text-bgcolor text-2xl">HIDDEN GEMS</h1>
      </div>
    </header>
  );
}

export default Header;
