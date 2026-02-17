import React from 'react'

const Footer = () => {
  return (
    <footer className="px-6 pt-8 md:px-16 lg:px-36 w-full text-gray-300">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500 pb-10">
        <div className="md:max-w-96">
          <img alt="" className="h-11" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/prebuiltuiLogoSquareShape.svg" />
          <p className="mt-6 text-sm font light text-gray-900">
            © 2026 CarRental. All rights reserved. CarRental is a trusted platform that connects car owners with verified travelers through secure, seamless, and transparent rental experiences. We prioritize safety, reliability, and convenience, making every journey stress-free while helping owners earn effortlessly from their vehicles.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/googlePlayBtnBlack.svg" alt="google play" className="h-10 w-auto border border-white rounded" />
            <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/appleStoreBtnBlack.svg" alt="app store" className="h-10 w-auto border border-white rounded" />
          </div>
        </div>
        <div className="flex-1 flex items-start md:justify-end gap-20 md:gap-40">
          <div>
            <h2 className="text-black mb-5">Company</h2>
            <ul className="text-black  space-y-2">
              <li><a href="#">Home</a></li>
              <li><a href="#">About us</a></li>
              <li><a href="#">Contact us</a></li>
              <li><a href="#">Privacy policy</a></li>
            </ul>
          </div>
          <div>
            <h2 className="text-black mb-10 ">Get in touch</h2>
            <div className="text-black space-y-2">
              <p>+1-234-567-890</p>
              <p>contact@example.com</p>
            </div>
          </div>
        </div>
      </div>
      
    </footer>
  )
}

export default Footer