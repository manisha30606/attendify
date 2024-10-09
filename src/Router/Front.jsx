import React from 'react'
import { Link } from 'react-router-dom'

const Front = () => {
  return (
   <>
    <section className="text-center my-5">
        <h1>Front page</h1>
        <h3>Design This page</h3>

        <div>
         <Link to="/login"> Start Now</Link>
        </div>
    </section>
   </>
  )
}

export default Front