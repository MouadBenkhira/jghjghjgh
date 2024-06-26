import React, { useState } from 'react';
import axios from 'axios';
import '../css/add.css';

// ... (existing imports)

export default function Write() {
  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [Image, setImage] = useState(null);
  const [ImageUrl, setImageUrl] = useState(null);
  const [Category, setCategory] = useState('');

  const handleFileChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    setImageUrl(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('Title', Title);
      formData.append('Description', Description);
      formData.append('Image', Image);
      formData.append('Category', Category);

      const imageResponse = await axios.post('http://localhost:5113/api/Upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const imagePath = imageResponse.data.dbPath;

      const blogData = {
        Title,
        Description,
        Image: imagePath,
        Category,
      };

      const blogResponse = await axios.post('http://localhost:5113/api/Blog/Add', blogData);

      setTitle('');
      setDescription('');
      setImage(null);
      setImageUrl(null);
      setCategory('');
    } catch (error) {
      console.error('Error adding blog:', error);
    }
  };

  return (
    <div className="write">
      {ImageUrl && (
        <img className="writeImg" src={ImageUrl} alt="Selected" />
      )}
      
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {/* Move the category dropdown here */}
        <div className="writeFormGroup">
          <select
            className="writeInput"
            value={Category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled>Select a category</option>
            <option value="Music">Music</option>
            <option value="Life">Life</option>
            <option value="Style">Style</option>
            <option value="Sport">Sport</option>
            <option value="Tech">Tech</option>
            <option value="Studies">Studies</option>
          </select>
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
