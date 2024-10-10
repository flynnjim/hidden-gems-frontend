import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { useState, Fragment } from "react";
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

  const linkStyling = "text-textcolor hover:text-hovercolor transition-all";

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        {isOpen ? (
          <FontAwesomeIcon
            icon={faXmark}
            style={{ color: "#fdf3e8" }}
            onClick={handleClick}
            className={`flex flex-col justify-center items-center text-2xl`}
          />
        ) : (
          <FontAwesomeIcon
            icon={faBars}
            style={{ color: "#fdf3e8" }}
            onClick={handleClick}
            className={`flex flex-col justify-center items-center text-2xl mt-1`}
          />
        )}
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className={`flex flex-col justify-center items-center`}
      >
        <div className="fixed inset-0 flex w-screen items-center justify-start z-index-[2000] bg-[#00000040]">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-500 sm:duration-700"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-500 sm:duration-700"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <DialogPanel className="max-w-lg space-y-4 bg-cardcolor text-black p-12 w-[225px] h-[100vh]">
              <DialogTitle className="font-bold text-textcolor">
                MENU
              </DialogTitle>

              <ul>
                <li className={linkStyling}>
                  <a href="/">HOME</a>
                </li>

                <li className={linkStyling}>
                  <a href="/gems">ALL GEMS</a>
                </li>

                <li className={linkStyling}>
                  <a href="/add-gem">ADD A GEM</a>
                </li>

                {user ? <>
                  <li className={linkStyling}>
                  <a href="/users/:user_id">MY ACCOUNT</a>
                </li>

                <li onClick={handleSignOut} className={linkStyling}>
                  <a href="/login">SIGN OUT</a>
                </li> 
                  </> : <>
                  <li className={linkStyling}>
                  <a href="/login">LOGIN</a>
                </li></>}

              </ul>
              <div className="flex gap-4">
                <button
                  className={linkStyling}
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </Transition.Child>
        </div>
      </Dialog>
    </>
  );
}

export default NavBar;
