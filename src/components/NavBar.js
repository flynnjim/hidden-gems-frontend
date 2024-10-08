import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "@/context/UserContext";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logOut, user } = useUser();

  const handleClick = () => {
    setIsOpen(false);
  };

  const handleSignOut = () => {
    logOut();
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
        <div className="fixed inset-0 flex w-screen items-center justify-start z-index-[2000] bg-[#00000040]">
          <DialogPanel className="max-w-lg space-y-4 border bg-white text-black p-12 w-[300px] h-[100vh]">
            <DialogTitle className="font-bold">MENU</DialogTitle>
            <ul>
              <li>
                <a href="/">HOME</a>
              </li>
              <li>
                <a href="/login">LOGIN</a>
              </li>
              <li>
                <a href="/signup">SIGN UP</a>
              </li>
              <li>
                <a href="/gems">ALL GEMS</a>
              </li>
              <li>
                <a href="/users/:user_id">MY ACCOUNT</a>
              </li>
              <li>
                <a href="/add-gem">ADD A GEM</a>
              </li>
              <li onClick={handleSignOut}>
                <a href="/login">SIGN OUT</a>
              </li>
            </ul>
            <div className="flex gap-4">
              <button onClick={() => setIsOpen(false)}>Close</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

export default NavBar;
