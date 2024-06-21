import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";
import "./style.css";

export default function IemiUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (!selectedFile) {
      console.log("No file to upload");
      alert("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error === "Duplicate imei_no") {
          alert(
            `Duplicate IMEI numbers found: ${errorData.duplicates.join(", ")}`
          );
        } else {
          console.error("Error response:", response.status, errorData);
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
      } else {
        const result = await response.text();
        alert(result);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file: " + error.message);
    } finally {
      setFile(null);
      e.target.value = null;
    }
  };

  return (
    <div className="upload-container">
      <h1>Upload IMEI Excel File</h1>
      <label htmlFor="file-upload" className="file-upload-label">
        <FiUpload size={50} className="upload-icon" />
      </label>
      <input
        id="file-upload"
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        style={{ display: "none" }}
        required
      />
    </div>
  );
}
