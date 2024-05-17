import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div>
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
              alt="website logo"
              className="headerLogo"
            />
          </Link>
        </div>
      </div>
    )
  }
}

export default Header
