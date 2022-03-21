import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'
import Header from '../Header'
import Footer from '../Footer'

const apiStatusConsonants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN PROGRESS',
  failure: 'FAILURE',
}

class BookDetails extends Component {
  state = {
    dataObj: {},
    apiStatus: apiStatusConsonants.initial,
  }

  componentDidMount() {
    this.getSpecificDetails()
  }

  getSpecificDetails = async () => {
    this.setState({apiStatus: apiStatusConsonants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      this.setState({
        apiStatus: apiStatusConsonants.success,
        dataObj: data.book_details,
      })
      console.log(data)
    } else {
      this.setState({apiStatus: apiStatusConsonants.failure})
    }
  }

  renderApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConsonants.success:
        return this.renderSuccessView()
      case apiStatusConsonants.failure:
        return this.renderFailureView()
      case apiStatusConsonants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderSuccessView = () => {
    const {dataObj} = this.state
    return (
      <div className="mainOfDetailsPage">
        <div className="firstComp">
          <img
            src={dataObj.cover_pic}
            alt={dataObj.title}
            className="imgOfDetails"
          />
          <div className="flexBox">
            <h1 className="headOfDetails">{dataObj.title}</h1>
            <p className="paraOfDetails1">{dataObj.author_name}</p>
            <div className="compOfRating">
              <p className="avgRating1">Avg Rating</p>
              <BsFillStarFill className="starIcon1" />
              <p className="avgRating1">{dataObj.rating}</p>
            </div>
            <p className="statusOFBookItem1">
              Status:{' '}
              <span className="spanOfBookItem1">{dataObj.read_status}</span>
            </p>
          </div>
        </div>
        <hr className="hori" />
        <div className="secondComp">
          <h1 className="headOfAuthor">About Author</h1>
          <p className="authorsInfo">{dataObj.about_author}</p>
          <h1 className="headOfAuthor">About Book</h1>
          <p className="authorsInfo">{dataObj.about_book}</p>
        </div>
      </div>
    )
  }

  renderOnceAgain = () => {
    this.getSpecificDetails()
  }

  renderFailureView = () => {
    const {apiStatus} = this.state
    return (
      <div className="failureCont">
        <img
          src="https://res.cloudinary.com/dnlxvy81c/image/upload/v1646852830/Group_7522_rpkprf.jpg"
          className="failureImg"
          alt="failure view"
        />
        <p className="failureHeading">Something went wrong. Please try again</p>
        <button
          className="failueviewButton"
          type="button"
          onClick={this.renderOnceAgain}
        >
          Try Again
        </button>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  render() {
    return (
      <>
        <Header />
        <div className="mainPageOfDetails">{this.renderApiStatus()}</div>
        <Footer />
      </>
    )
  }
}

export default BookDetails
