import {Component} from 'react'
import {Link} from 'react-router-dom'

import './index.css'

class Course extends Component {
  render() {
    const {details} = this.props
    const {id, logoUrl, name} = details

    return (
      <Link to={`courses/${id}`}>
        <li className="list-item">
          <div>
            <img src={logoUrl} alt={name} className="logo-image" />
          </div>

          <p className="link-items">{name}</p>
        </li>
      </Link>
    )
  }
}

export default Course
