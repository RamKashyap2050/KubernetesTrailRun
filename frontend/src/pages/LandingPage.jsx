import React from 'react'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
    const navigate = useNavigate()
  return (
    <div>

      <h1>I am Landing Page</h1>
       <a href='/login'>Login</a> 
       <a href='/register'>SignUp</a> 
    </div>
  )
}

export default LandingPage
