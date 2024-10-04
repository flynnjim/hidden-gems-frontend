import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

function Footer() {

  return (
    <footer>
      <div className="flex flex-col justify-center items-center">
      <ul className="container inline-flex place-content-around">
              <li>ABOUT US</li>
              <li>CONTACT US</li>
              <li>HELP</li>
              <li><FontAwesomeIcon icon={faSquareFacebook} size="xl" style={{color: "#B197FC",}}/>
              </li>
              <li><FontAwesomeIcon icon={faInstagram} size="xl" style={{color: "#B197FC",}} /></li>
            </ul>
      </div>
    </footer>
  );
}

export default Footer;
