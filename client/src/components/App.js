import React from 'react'
import { Route, Switch } from 'react-router-dom'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import NavBar from './Navbar/NavBar'
import Auth from "../hoc/auth"
import LandingPage from './LandingPage/LandingPage'
import MovieDetail from './MovieDetail/MovieDetail'
import Footer from './Footer'
import FavoritePage from './FavoritePage/FavoritePage'

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path='/' component={Auth(LandingPage, null)} />
          <Route path='/login' component={Auth(LoginPage, false)} />
          <Route path='/register' component={Auth(RegisterPage, false)} />
          <Route path='/movie/:movieId' component={Auth(MovieDetail, null)} />
          <Route exact path="/favorite" component={Auth(FavoritePage, null)} />
        </Switch>
      </div>
      <Footer/>
    </React.Fragment>
  )
}

export default App
