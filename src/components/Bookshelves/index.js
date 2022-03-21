import './index.css'
import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import Bookitem from '../Bookitem'
import FiltersComp from '../FiltersComp'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConsonants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN PROGRESS',
  failure: 'FAILURE',
}

class Bookshelves extends Component {
  state = {
    searchInput: '',
    activeFilter: bookshelvesList[0].value,
    apiStatus: apiStatusConsonants.initial,
    initialListOfBooks: [],
    activeLabel: bookshelvesList[0].label,
  }

  componentDidMount() {
    this.getAllBooks()
  }

  getAllBooks = async () => {
    this.setState({apiStatus: apiStatusConsonants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {activeFilter, searchInput} = this.state
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${activeFilter}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.setState({
        apiStatus: apiStatusConsonants.success,
        initialListOfBooks: data.books,
      })
    } else {
      this.setState({apiStatus: apiStatusConsonants.failure})
    }
  }

  changeFilterValues = (value, label) => {
    this.setState({activeFilter: value, activeLabel: label}, this.getAllBooks)
  }

  renderOnceAgain = () => {
    this.getAllBooks()
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

  renderSuccessView = () => {
    const {initialListOfBooks, searchInput} = this.state
    const lengthOf = initialListOfBooks.length > 0
    return (
      <ul className="orderofInitial">
        {lengthOf ? (
          initialListOfBooks.map(each => (
            <Bookitem key={each.id} details={each} />
          ))
        ) : (
          <div className="noResults">
            <img
              src="https://res.cloudinary.com/dnlxvy81c/image/upload/v1647335744/Group_ppwwxe.jpg"
              className="noresultsImg"
              alt="no books"
            />
            <p className="noresultsDesc">
              Your search for {searchInput} did not find any matches.
            </p>
          </div>
        )}
      </ul>
    )
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

  changeContentsOfSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  submitSearch = () => {
    const {searchInput} = this.state
    this.setState({searchInput}, this.getAllBooks)
  }

  render() {
    const {activeFilter, searchInput, activeLabel} = this.state
    console.log(activeFilter)
    return (
      <>
        <Header />
        <div className="bookshelfMainCont">
          <div className="filtersComponent">
            <div className="searchCont1">
              <input
                className="searchInput"
                type="search"
                onChange={this.changeContentsOfSearch}
                value={searchInput}
              />
              <button
                className="searchButton"
                type="button"
                testid="searchButton"
                onClick={this.submitSearch}
              >
                <BsSearch className="icon" />
              </button>
            </div>
            <h1 className="headerOfFilters">Bookshelves</h1>
            <ul className="unorderFilters">
              {bookshelvesList.map(each => (
                <FiltersComp
                  details={each}
                  key={each.id}
                  changeFilterValues={this.changeFilterValues}
                  isSelected={activeFilter === each.value}
                />
              ))}
            </ul>
          </div>
          <div className="crucial">
            <div className="SearchResponsive">
              <h1 className="headerOfContList">{activeLabel} Books</h1>
              <div className="searchCont">
                <input
                  className="searchInput"
                  type="search"
                  onChange={this.changeContentsOfSearch}
                  value={searchInput}
                />
                <button
                  className="searchButton"
                  type="button"
                  testid="searchButton"
                  onClick={this.submitSearch}
                >
                  <BsSearch className="icon" />
                </button>
              </div>
            </div>

            {this.renderApiStatus()}
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default Bookshelves
