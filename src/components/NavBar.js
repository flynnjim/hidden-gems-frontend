import {
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        {isOpen ? (
          <FontAwesomeIcon
            icon={faXmark}
            onClick={handleClick}
            className={`flex flex-col justify-center items-center`}
          />
        ) : (
          <FontAwesomeIcon
            icon={faBars}
            onClick={handleClick}
            className={`flex flex-col justify-center items-center`}
          />
        )}
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className={`flex flex-col justify-center items-center`}
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">MENU</DialogTitle>
            <ul>
              <li>TRENDING</li>
              <li>MY FAVOURITES</li>
              <li>MY ACCOUNT</li>
              <li>SETTINGS</li>
              <li>SIGN OUT</li>
            </ul>
            <div className="flex gap-4">
              <button onClick={() => setIsOpen(false)}>Close</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
  //className="relative z-50"
}

export default NavBar;
