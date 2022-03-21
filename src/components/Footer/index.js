import './index.css'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

const Footer = () => (
  <div className="footerCont">
    <div className="secondaryFooter">
      <FaGoogle className="iconsSocial" />
      <FaTwitter className="iconsSocial" />
      <FaInstagram className="iconsSocial" />
      <FaYoutube className="iconsSocial" />
    </div>
    <p className="contactUs">Contact Us</p>
  </div>
)

export default Footer
