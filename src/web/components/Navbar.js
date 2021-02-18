import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => (
  <nav>
    <section>
      <Link to="/">form</Link>
      <Link to="/autocomplete">autocomplete</Link>
      <Link to="/microblogapp">microblog</Link>
      <Link to="/startstop">startstop</Link>
      <Link to="/takexapp">takex</Link>
      <Link to="/throttleap">throttle</Link>
      <Link to="/wizardapp">wizard</Link>
    </section>
  </nav>
)
