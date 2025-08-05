import React from 'react'

import { Link } from 'react-router-dom'
// import Footer from '../Components/Footer'


function Home () {
  return (
  <section className="h-screen bg-center bg-no-repeat bg-[url('/images/img1.webp')] bg-gray-700 bg-blend-multiply">
  <div className="px-2 mx-auto max-w-screen-xl text-center py-54 lg:py-45">
    <h1 className="mb-8 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
      كتـنسا دواك؟ منصتنا كتذكرك في الوقت الصحيح، صحتك أولويتنا
    </h1>
    <div className="sm:justify-center pt-10 sm:space-y-0">
      <Link
        type="button"
        to="/api/auth/register"
        className="text-white bg-blue-600 hover:bg-gradient-to-br focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-6"
      >
        خلينا نبداو
      </Link>
    </div>
  </div>
</section>

  )
}

export default Home;