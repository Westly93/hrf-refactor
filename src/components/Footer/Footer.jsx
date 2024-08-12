import React from 'react'

export default function Footer() {
  return (
    <>
    <footer className="bg-dark text-white text-center py-2 mt-10">
    <div className="container">
        &copy; {new Date().getFullYear()} MSU HRM Recruitment Module. All rights reserved.
    </div>
    </footer>
    </>
  )
}
