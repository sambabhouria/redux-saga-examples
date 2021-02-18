import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'


import { Navbar } from './components/Navbar'
import DashboardPage from './pages/DashboardPage'
import PostsPage from './pages/PostsPage'
import SinglePostPage from './pages/SinglePostPage'
import Autocomplete from './pages/Autocomplete'
import FormComponent from './pages/FormComponent'
import MicroblogApp from './pages/MicroblogApp'
import StartStopApp from './pages/StartstopApp'
import TakexApp  from './pages/TakexApp'
import ThrottleApp  from './pages/ThrottleApp'
import Wizard  from './pages/WizardApp'


const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={FormComponent} />
        <Route exact path="/dashboadPage" component={DashboardPage} />
        <Route exact path="/autocomplete" component={Autocomplete} />
        <Route exact path="/microblogapp" component={MicroblogApp} />
        <Route exact path="/startstop" component={StartStopApp} />
        <Route exact path="/takexapp" component={TakexApp} />
        <Route exact path="/throttleap" component={ThrottleApp} />
        <Route exact path="/wizardapp" component={Wizard} />
        <Route exact path="/posts" component={PostsPage} />
        <Route exact path="/posts/:id" component={SinglePostPage} />
        <Redirect to="/" />
      </Switch>
    </Router>
  )
}

export default App;
