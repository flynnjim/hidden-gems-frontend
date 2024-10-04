"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
// transition:border-color 0.3s
  return (
    <button>
      <FontAwesomeIcon
        icon={faBars}
        onClick={handleClick}
        className={`flex flex-col justify-center items-center hover:bg-sky-700  ${
                isOpen ?  "text-slate-400 rotate-90 translate-y-1" : ""
            }`}
      />
    </button>
    // <button
    //<FontAwesomeIcon icon={faXmark}/>
    //   onClick={handleClick}
    //   className="flex flex-col justify-center items-center bg-white hover:bg-sky-700"
    // >
    //   <FontAwesomeIcon icon="fa-solid fa-bars bg-violet-300" />
    //   {/* <span
    //     className={`bg-violet-300 block transition-all duration-300 ease-out
    //                 h-0.5 w-6 rounded-sm ${
    //                   isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
    //                 }`}
    //   ></span>
    //   <span
    //     className={`bg-amber-300 block transition-all duration-300 ease-out
    //                 h-0.5 w-6 rounded-sm ${
    //                   isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
    //                 }`}
    //   ></span>
    //   <span
    //     className={`bg-emerald-300 block transition-all duration-300 ease-out
    //                 h-0.5 w-6 rounded-sm ${
    //                   isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
    //                 }`}
    //   ></span> */}
    // </button>
  );
}

export default Nav;
