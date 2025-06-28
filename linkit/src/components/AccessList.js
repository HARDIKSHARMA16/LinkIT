import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Navbar from "./Navbar";
import "./AccessList.css";
import Discordsvg from "./Discordsvg";
import Twittersvg from "./Twittersvg";
import Instagramsvg from "./Instagramsvg";
import firstpageBackground from "./images/firstpage1.mp4";

const AccessListPage = ({ contract }) => {
  const [accessList, setAccessList] = useState([]);

  useEffect(() => {
    const fetchAccessList = async () => {
      const list = await contract.shareAccess();
      setAccessList(list);
    };
    contract && fetchAccessList();
  }, [contract]);

  const handleAllow = async (address) => {
    await contract.allow(address);
    const addressObj = { user: address, access: true };
    if (accessList.some(item => item.user === address)) {
      setAccessList(
        accessList.map((item) => {
          if (item.user === address) {
            return { ...item, access: true };
          }
          return item;
        })
      );
    } else {
      setAccessList([...accessList, addressObj]);
    }
  };

  const handleDisallow = async (address) => {
    await contract.disallow(address);
    setAccessList(
      accessList.map((item) => {
        if (item.user === address) {
          return { ...item, access: false };
        }
        return item;
      })
    );
    // setAccessList(updatedList);
  };


  return (
    <div>
      {/* Navbar section */}
      <div className="navbar-section">
        <Navbar />
      </div>
      <div className="accesslist-section">
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

        <h1 className="accesslist-h1">Shared List</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const address = e.target.address.value;
            handleAllow(address);
            e.target.reset();
          }}
          className="accesslist-form"
        >
          <input
  className="accesslist-input"
  type="text"
  name="address"
  placeholder="Enter Address"
/>

          <button type="submit" className="accesslist-button">
            Allow
          </button>
        </form>

        {accessList.length > 0 ? (
          <ul>
            {accessList.map((item) => (
              <li key={item.user} className="accesslist-container">
                <div className="address">{item.user}</div>
                <div className="status">
                  {item.access ? "Allowed" : "Disallowed"}
                </div>
                {item.access ? (
                  <button
                    className="accesslist-button"
                    onClick={() => handleDisallow(item.user)}
                  >
                    Disallow
                  </button>
                ) : (
                  <button
                    className="accesslist-button"
                    onClick={() => handleAllow(item.user)}
                  >
                    Allow
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="error-text">Currently No addresses with access !!!</p>
        )}
      </div>

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
};

AccessListPage.propTypes = {
  contract: PropTypes.shape({
    shareAccess: PropTypes.any,
    allow: PropTypes.any,
    disallow: PropTypes.any,
  }),
};

export default AccessListPage;

