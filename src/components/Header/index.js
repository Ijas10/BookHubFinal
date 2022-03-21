import './index.css'
import {useState} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const {history} = props

  const logoutUser = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const [isTrue, setName] = useState(false)

  const onChangeName = () => setName(prevState => !prevState)
  console.log(isTrue)

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="link1">
          <img
            src="https://res.cloudinary.com/dnlxvy81c/image/upload/v1646652501/Group_7731_xycocp.svg"
            alt="website logo"
            className="websiteLogo1"
          />
        </Link>

        <button className="hamburgerBtn" type="button" onClick={onChangeName}>
          <img
            src="https://res.cloudinary.com/dnlxvy81c/image/upload/v1646835528/icon2xx_tbl7jh.jpg"
            className="hamburger"
            alt="hamburger"
          />
        </button>

        <ul className="headerUnorder">
          <li className="listInHeaders" key="home">
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          <li className="listInHeaders" key="bookshelves">
            <Link className="link" to="/shelf">
              Bookshelves
            </Link>
          </li>
          <li className="listInHeaders" key="logout">
            <button type="button" className="btnSubmit1" onClick={logoutUser}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
      <div className="hamburgermenuDiv">
        {isTrue && (
          <ul className="headerUnorder1">
            <li className="listInHeaders" key="home">
              <Link className="link" to="/">
                Home
              </Link>
            </li>
            <li className="listInHeaders" key="bookshelves">
              <Link className="link" to="/shelf">
                Bookshelves
              </Link>
            </li>
            <li className="listInHeaders" key="logout">
              <button type="button" className="btnSubmit1" onClick={logoutUser}>
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>
    </>
  )
}

export default withRouter(Header)
