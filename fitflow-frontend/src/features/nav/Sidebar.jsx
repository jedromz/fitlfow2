import React from 'react'
import { FaHome, FaSearch, FaBell, FaEnvelope } from 'react-icons/fa'
import { Link } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className="bg-black text-white h-screen w-16 flex flex-col items-center py-5">
      <div className="mb-10">
        <FaHome className="mb-5 text-2xl cursor-pointer" />
        <FaHome className="mb-5 text-2xl cursor-pointer" />
        <FaSearch className="mb-5 text-2xl cursor-pointer" />
        <FaBell className="mb-5 text-2xl cursor-pointer" />
        <FaEnvelope className="text-2xl cursor-pointer" />
      </div>
    </div>
  )
}

export default Sidebar
