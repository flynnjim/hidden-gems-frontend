import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

function Footer() {

  return (
    <footer>
      <div className="flex flex-col justify-center items-center">
      <ul className="container inline-flex place-content-around">
              <li>ABOUT US</li>
              <li>CONTACT US</li>
              <li>HELP</li>
              <li><Link href={"https://www.facebook.com/"}><FontAwesomeIcon icon={faSquareFacebook} size="xl" style={{color: "#B197FC",}}/></Link>
              </li>
              <li><Link href={"https://www.instagram.com/"}><FontAwesomeIcon icon={faInstagram} size="xl" style={{color: "#B197FC",}} /></Link></li>
            </ul>
      </div>
    </footer>
  );
}

export default Footer;
