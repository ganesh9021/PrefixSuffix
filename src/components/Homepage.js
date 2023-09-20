import React from 'react'
import { useNavigate } from 'react-router-dom'

const Homepage = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/game')
    }
  return (
    <div>
      <div>Homepage</div>
      <button onClick={handleClick}>Go to Game</button>
    </div>
  )
}

export default Homepage
