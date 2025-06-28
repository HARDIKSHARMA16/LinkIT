import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Firstpage.css";
import "./Secondpage";
import Discordsvg from "./Discordsvg";
import Twittersvg from "./Twittersvg";
import Instagramsvg from "./Instagramsvg";
import img2 from "./images/first-image-min.png";
import img3 from "./images/second-image-min.png";
import img1 from "./images/third-image-min.png";
import Navbar from "./Navbar";
import firstpageBackground from "./images/firstpage1.mp4";


function Firstpage() {
  const [imageSrc, setImageSrc] = useState(img3);

  const handleHeadingClick = (newImageSrc) => {
    setImageSrc(newImageSrc);
  };

  return (
    <div>
      <div className="navbar-section">
        <Navbar />
      </div>

      {/* HERO Section with black background image */}
      <div className="hero">
        <div className="hero-background">
         <video
  autoPlay
  muted
  loop
  playsInline
  style={{
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: 0.3,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1
  }}
>
  <source src={firstpageBackground} type="video/mp4" />
  Your browser does not support the video tag.
</video>


        </div>

        <div className="hero-content">
          <div className="hero-heading-box">
              <h1 className="hero-subheading">          Secure  .  Private  .   Decentralized 
</h1>
<br></br><br></br>
            <h1 className="hero-heading">
      Reimagine File Storage with Blockchain Technology
            </h1>
          </div>
          
          <p className="hero__description">
              LinkIT empowers you to share and store files with full control, privacy, and reliability.
      No middlemen. No surveillance. Just your data—your way.
          </p>
          
          <button
            className="hero-button"
            onClick={() => {
              window.location.href = "/secondpage";
            }}
          >
            <Link className="hero-button-text" to="/secondpage">
              Upload File
            </Link>
          </button>
        </div>
      </div>

      {/* Animate Section */}
      <div className="animate-section" >
        
        <h2 className="animate-heading">What is LinkIT ?</h2>
        <p className="animate-para">
          LinkIT is a next-generation decentralized storage platform powered by blockchain technology. It gives users complete ownership of their files—no third-party interference, no hidden risks. With end-to-end encryption and smart access control, LinkIT ensures your data is secure, private, and always within your control. It’s the future of file sharing—transparent, reliable, and censorship-free.
        </p>
      </div>

      {/* Product Section */}
      <div className="product-section">
        <h2 className="product-head">
          Why Choose LinkIT ?
        </h2>
        <div className="product-right">
            <img src={imageSrc} alt="logo" />
          </div>
        <div className="product-content">
          <div className="product-left">
            <div className="Para-1">
              <h3
                id="para1-heading"
                className="para1-heading"
                onClick={() => handleHeadingClick(img2)}
              >
                1. Immutability
              </h3>
              <br></br>
              <p className="para1-detail">
               🔒 Once data is written to the blockchain, it’s locked forever. No edits. No deletions. LinkIT ensures your files remain exactly as you stored them—secure and tamper-proof.
              </p>

            </div>
            <hr className="my-hr" />
            <div className="Para-2">
              <h3
                id="para2-heading"
                className="para2-heading"
                onClick={() => handleHeadingClick(img3)}
              >
                2. Decentralization
              </h3>
              <br></br>
              <p className="para2-detail">
               🌐 Your data isn’t held by a single server—it’s distributed across a global network. That means no single point of failure, no downtime, and complete freedom from centralized control.
              </p>
            </div>
            <hr className="my-hr" />
            <div className="Para-3">
              <h3
                id="para3-heading"
                className="para3-heading"
                onClick={() => handleHeadingClick(img1)}
              >
                3. Transparency
              </h3>
              <br></br>
              <p className="para3-detail">
                🔍 Every file action is logged on the blockchain and visible to anyone. This builds trust through verifiable, auditable data history—no secrets, just accountability.
              </p>
            </div>
          </div>
         
        </div>
      </div>

      {/* About Section */}
      <div className="about">
        <h2 className="about-heading">About Us</h2>
        <p className="about-text">
          At LinkIT, we believe that data ownership and privacy are
          fundamental rights that should be protected in the digital age.
          That&apos;s why we&apos;ve created a decentralized file storage system
          that puts you in control of your data. Our team of experienced
          developers and blockchain experts have designed a secure,
          decentralized network that allows you to store and access your files
          from anywhere, without relying on a central authority. By using
          blockchain technology, we ensure that your data is encrypted,
          tamper-proof, and always available, even in the face of network
          outages or attacks.
        </p>
      </div>

      {/* Footer Section */}
      <div className="footer-section">
        <div className="column1">
          <h2 className="column1-heading">Contact Us</h2>
          <p className="column1-para">LinkIT@gmail.com</p>
        </div>

        <div className="column2">
          <h2 className="column2-text">Get involved</h2>
          <div className="social-icons">
            <Discordsvg />
            <Twittersvg />
            <Instagramsvg />
          </div>
        </div>

        <div className="column3">
          <p className="Column3-text">
            © 2025 LinkIT. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Firstpage;
