import './index.css'
import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'

const Bookitem = props => {
  const {details} = props
  return (
    <Link to={`/books/${details.id}`} className="link1">
      <li className="listOfbookItem">
        <img src={details.cover_pic} alt={details.title} className="coverpic" />
        <div className="compOfBookitem">
          <h1 className="headOfBookiTEM">{details.title}</h1>
          <p className="authorsNameinBookItem">{details.author_name}</p>
          <div className="compOfRating">
            <p className="avgRating">Avg Rating</p>
            <BsFillStarFill className="starIcon" />
            <p className="avgRating">{details.rating}</p>
          </div>
          <p className="statusOFBookItem">
            Status:{' '}
            <span className="spanOfBookItem">{details.read_status}</span>
          </p>
        </div>
      </li>
    </Link>
  )
}

export default Bookitem
