import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Secondfile.css";

const Display = ({ contract, account }) => {
  const [data, setData] = useState([]);
  const [showData, setShowData] = useState(false);

  const getdata = async () => {
    let dataArray = [];
    const Otheraddress = document.querySelector(".address")?.value;

    try {
      dataArray = await contract.display(Otheraddress || account);
    } catch (e) {
      alert("You don't have access");
      return;
    }

    if (dataArray.length === 0) {
      alert("No file to display");
      return;
    }

    const results = await Promise.all(
      dataArray.map(async (item, i) => {
        let fileURL = "";
        let mime = "application/octet-stream";

        try {
          const fileObj = JSON.parse(item);
          if (fileObj.chunks && Array.isArray(fileObj.chunks)) {
            const parts = await Promise.all(
              fileObj.chunks.map(async (hash) => {
                const res = await fetch(`https://gateway.pinata.cloud/ipfs/${hash.substring(7)}`);
                return await res.arrayBuffer();
              })
            );
            const finalBlob = new Blob(parts, { type: fileObj.type });
            fileURL = URL.createObjectURL(finalBlob);
            mime = fileObj.type;
          }
        } catch (e) {
          // Not a JSON (old single IPFS hash case)
          const cid = item.substring(7);
          fileURL = `https://gateway.pinata.cloud/ipfs/${cid}`;
        }

        return (
          <div key={i} className="image-container">
            <button className="delete-button" onClick={() => deleteFile(i)}>
              <i className="fa-solid fa-trash fa-beat" style={{ color: "#007bff" }}></i>
            </button>
            <a href={fileURL} target="_blank" rel="noreferrer">
              {mime.startsWith("image") ? (
                <img src={fileURL} alt="File" className="image-list" width={300} height={300} />
              ) : mime.startsWith("video") ? (
                <video src={fileURL} className="image-list" width={300} height={200} controls />
              ) : mime.startsWith("audio") ? (
                <audio src={fileURL} className="image-list" controls />
              ) : (
                <p>Download: {fileURL}</p>
              )}
            </a>
          </div>
        );
      })
    );

    setData(results);
    setShowData(true);
  };

  const deleteFile = async (index) => {
    try {
      await contract.deleteUrl(index);
      alert("File deleted successfully");
      getdata();
    } catch (e) {
      alert("Error deleting file");
    }
  };

  return (
    <>
      <div className="search-bar">
        <input type="text" className="address" placeholder="Enter the Account address" />
        <button className="search-button" onClick={getdata}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      {showData && (
        <div className="blank-container">
          <div className="image-grid">
            {data}
            <button className="close-container" onClick={() => setShowData(false)}>
              <i className="fa-sharp fa-solid fa-circle-xmark fa-2xl"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

Display.propTypes = {
  contract: PropTypes.shape({
    display: PropTypes.func,
    deleteUrl: PropTypes.func,
  }),
  account: PropTypes.string,
};

export default Display;
