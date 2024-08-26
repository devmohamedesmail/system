import { Setting } from './Setting';
import axios from 'axios';



export const ImportExcel = async (endpoint, file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    await axios.post(`${Setting.url}${endpoint}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    alert("File uploaded successfully");
  } catch (error) {
    console.error("Error uploading file", error);
    alert("Error uploading file");
  }
};