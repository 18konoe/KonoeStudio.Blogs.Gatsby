import React from "react";
import { Link } from "gatsby";
import ThemeChanger from "../components/themeChanger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons";

export default (props) => (
  <nav className="navigation">
    {/* <Link to="/contact">Contact</Link> */}
    <Link to="//twitter.com/18konoe" className="nav-item">
      <FontAwesomeIcon icon={faTwitter} size="lg" />
    </Link>
    <Link to="//github.com/18konoe" className="nav-item">
      <FontAwesomeIcon icon={faGithub} size="lg" />
    </Link>
    <ThemeChanger />
  </nav>
);
