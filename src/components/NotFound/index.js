import './index.css'
import {Link} from 'react-router-dom'

const NotFound = props => {
  const {history} = props
  console.log(history)
  const goBack = () => {
    history.replace('/')
  }

  return (
    <div className="notFoundHome">
      <img
        src="https://res.cloudinary.com/dnlxvy81c/image/upload/v1647420327/Group_7484_peplla.jpg"
        className="notFoundImg"
        alt="not found"
      />
      <h1 className="headNotFound">Page Not Found</h1>
      <p className="paraNotFound">
        we are sorry, the page you requested could not be found. Please go back
        to the homepage.
      </p>
      <button className="btnNotFound" type="button">
        <Link to="/" className="link1">
          Go Back to Home
        </Link>
      </button>
    </div>
  )
}

export default NotFound
