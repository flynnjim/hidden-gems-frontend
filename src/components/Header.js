"use client";
import NavBar from "./NavBar";
import Link from "next/link";

function Header() {
  const linkStyling = "text-accentcolor hover:text-hovercolor";
  return (
    <header className="bg-listcolor p-2">
      <div className="container flex gap-4 items-center place-content-between">
          <NavBar/>
          <Link href="/">
            <h1 className="text-bgcolor text-2xl">HIDDEN GEMS</h1>
          </Link>
          <p className="text-accentcolor">
            <Link href="/login" className={linkStyling}>Login</Link> | <Link href="/signup" className={linkStyling}>Sign Up</Link></p>
          </div>
    </header>
  );
}

export default Header;
