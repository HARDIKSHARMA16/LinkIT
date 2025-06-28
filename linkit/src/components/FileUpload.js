import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Modal from "./Modal";
import FormData from "form-data";

const FileUpload = ({ contract, account, provider }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentButton, setCurrentButton] = useState("upload");

  const MAX_CHUNK_SIZE = 5 * 1024 * 1024; // 5MB

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const totalChunks = Math.ceil(file.size / MAX_CHUNK_SIZE);
    const chunks = [];

    for (let i = 0; i < totalChunks; i++) {
      const chunk = file.slice(i * MAX_CHUNK_SIZE, (i + 1) * MAX_CHUNK_SIZE);
      const formData = new FormData();
      formData.append("file", chunk, `${file.name}.part${i}`);

      try {
        const res = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `525a33da2ba4426b2b4d`,
            pinata_secret_api_key: `c843f656b33df72f5a7770511d42c6973994e1c044a75eea0db79ed9d9bb5b99`,
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (event) => {
            const progress = Math.round(((i + event.loaded / event.total) / totalChunks) * 100);
            setUploadProgress(progress);
          },
        });

        chunks.push(`ipfs://${res.data.IpfsHash}`);
      } catch (err) {
        alert("Error uploading part of the file");
        return;
      }
    }

    const fileMeta = JSON.stringify({
      name: file.name,
      type: file.type,
      chunks,
    });

    const signer = contract.connect(provider.getSigner());
    await signer.add(account, fileMeta);

    alert("Upload complete!");
    setFile(null);
    setFileName("No image selected");
    setUploadProgress(0);
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    if (data) {
      setFile(data);
      setFileName(data.name);
    }
  };

  return (
    <div className="upload-share-container">
      <div className="toggleWrapper">
        <input type="checkbox" className="dn" id="dn" />
        <label htmlFor="dn" className="toggle" onClick={() => setCurrentButton(currentButton === "share" ? "upload" : "share")}>
          <span className="toggle__handler"></span>
        </label>
      </div>
      {currentButton === "upload" ? (
        <div className="wrapper">
          <h3>Upload Your Files</h3>
          <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="my-file" id="fileLabel" className="custom-file-upload">
              <i className="fa-solid fa-cloud-arrow-up fa-bounce"></i>
            </label>
            <input type="file" id="my-file" disabled={!account} onChange={retrieveFile} style={{ display: "none" }} />
            {uploadProgress > 0 && <progress value={uploadProgress} max={100} />}<br/>
            <p>{fileName}</p>
            <button type="submit" className="upload" disabled={!file}>Upload</button>
          </form>
        </div>
      ) : (
        <div className="share-wrapper">
          <h3>Share Your Files</h3>
          <Modal contract={contract} />
        </div>
      )}
    </div>
  );
};

FileUpload.propTypes = {
  contract: PropTypes.shape({ connect: PropTypes.func }),
  account: PropTypes.string,
  provider: PropTypes.shape({ getSigner: PropTypes.func }),
};

export default FileUpload;
