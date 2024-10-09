import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

function Footer() {
  return (
    <footer>
      <div className="flex flex-col justify-center items-center mb-5 bg-listcolor p-2">
        <ul className="container inline-flex place-content-around">
          <li className="text-bgcolor">ABOUT US</li>
          <li className="text-bgcolor">CONTACT US</li>
          <li className="text-bgcolor">HELP</li>
          <li>
            <Link href={"https://www.facebook.com/"}>
              <FontAwesomeIcon
                icon={faSquareFacebook}
                size="xl"
                style={{ color: "#fdf3e8" }}
              />
            </Link>
          </li>
          <li>
            <Link href={"https://www.instagram.com/"}>
              <FontAwesomeIcon
                icon={faInstagram}
                size="xl"
                style={{ color: "#fdf3e8" }}
              />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
