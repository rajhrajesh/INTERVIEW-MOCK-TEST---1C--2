import {Component} from 'react'
import TailSpin from 'react-loader-spinner'
import Header from '../Header'
import Course from '../Course'

import './index.css'

class Home extends Component {
  state = {
    isLoading: true,
    isFailed: false,
    isSuccess: false,
    coursesList: [],
  }

  componentDidMount() {
    this.fetchApiDetails()
  }

  fetchApiDetails = async () => {
    const response = await fetch('https://apis.ccbp.in/te/courses')
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const updatedData = data.courses.map(each => ({
        id: each.id,
        logoUrl: each.logo_url,
        name: each.name,
      }))
      console.log(updatedData)
      this.setState({
        isLoading: false,
        isFailed: false,
        isSuccess: true,
        coursesList: updatedData,
      })
    } else {
      this.setState({
        isLoading: false,
        isFailed: true,
        isSuccess: false,
      })
    }
  }

  render() {
    const {isLoading, isFailed, isSuccess, coursesList} = this.state
    return (
      <div>
        <Header />
        <div>
          {isLoading && (
            <div data-testid="loader" className="spinner">
              <TailSpin
                height="80"
                width="80"
                color="#4fa940"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          )}
          {isSuccess && (
            <div>
              <h1 className="course-heading">Courses</h1>
              <ul>
                {coursesList.map(each => (
                  <Course key={each.id} details={each} />
                ))}
              </ul>
            </div>
          )}
          {isFailed && (
            <div className="failure-content">
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
                  alt="failure view"
                  className="failure-image"
                />
              </div>
              <h1 className="error">Oops! Something Went Wrong</h1>
              <p className="err-des">
                We cannot seem to find the page you are looking for.
              </p>
              <div>
                <button
                  type="button"
                  className="button"
                  onClick={this.fetchApiDetails}
                >
                  Retry
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Home