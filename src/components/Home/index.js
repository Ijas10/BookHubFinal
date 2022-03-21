import {Component} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiStatusConsonants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN PROGRESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    listOfTopRatedMovies: [],
    apiStatus: apiStatusConsonants.initial,
  }

  componentDidMount() {
    this.getListOfTopRatedMovie()
  }

  getListOfTopRatedMovie = async () => {
    this.setState({apiStatus: apiStatusConsonants.inProgress})
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.setState({
        listOfTopRatedMovies: data.books,
        apiStatus: apiStatusConsonants.success,
      })
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

  renderOnceAgain = () => {
    this.getListOfTopRatedMovie()
  }

  renderFailureView = () => {
    const {listOfTopRatedMovies} = this.state
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

  renderSuccessView = () => {
    const {listOfTopRatedMovies} = this.state
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }
    return (
      <>
        <Slider {...settings}>
          {listOfTopRatedMovies.map(eachLogo => (
            <Link to={`/books/${eachLogo.id}`} className="link1">
              <div className="slick-item" key={eachLogo.id}>
                <img
                  className="logo-image"
                  src={eachLogo.cover_pic}
                  alt={eachLogo.title}
                />
                <h1 className="headOfTitle">{eachLogo.title}</h1>
                <p className="authorsNameInSlick">{eachLogo.author_name}</p>
              </div>
            </Link>
          ))}
        </Slider>
      </>
    )
  }

  routingToShelf = () => {
    const {history} = this.props
    history.push('/shelf')
  }

  render() {
    const {listOfTopRatedMovies, apiStatus} = this.state
    console.log(listOfTopRatedMovies)

    return (
      <>
        <Header />
        <div className="mainHomePage">
          <h1 className="headofHome">Find Your Next Favorite Books?</h1>
          <p className="paraHeadHome">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
          <button
            className="btnFinding"
            type="button"
            onClick={this.routingToShelf}
          >
            Find Books
          </button>
          <div className="sliderCont">
            <div className="contOfHome">
              <h1 className="headOfSlider">Top Rated Books</h1>
              <button
                className="btnFinding1"
                type="button"
                onClick={this.routingToShelf}
              >
                Find Books
              </button>
            </div>

            {this.renderApiStatus()}
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default Home
