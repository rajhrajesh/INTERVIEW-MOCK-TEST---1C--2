import {Component} from 'react'
import TailSpin from 'react-loader-spinner'
import Header from '../Header'

import './index.css'

class CourseItemDetails extends Component {
  state = {
    itemDetails: {},
    isLoading: true,
    isFailed: false,
    isSuccess: false,
  }

  componentDidMount() {
    this.fetchCourseDetails()
  }

  fetchCourseDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)

    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
    const data = await response.json()

    if (response.ok) {
      const updatedData = {
        id: data.course_details.id,
        description: data.course_details.description,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
      }
      console.log(data)
      console.log(updatedData)
      this.setState({
        itemDetails: updatedData,
        isLoading: false,
        isFailed: false, //
        isSuccess: true, //
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
    const {isLoading, isFailed, isSuccess, itemDetails} = this.state
    const {description, name, imageUrl} = itemDetails
    return (
      <div>
        <Header />
        <div>
          {isLoading && (
            <div data-testid="loader" className="spinner">
              <TailSpin
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          )}
          {isSuccess && (
            <div className="itemDetails">
              <div className="content">
                <img src={imageUrl} alt={name} className="image" />

                <div>
                  <h1 className="name">{name}</h1>
                  <p className="des">{description}</p>
                </div>
              </div>
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
                We cannot seem to find the page you are looking for
              </p>
              <div>
                <button
                  type="button"
                  className="button"
                  onClick={this.fetchCourseDetails}
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

export default CourseItemDetails
