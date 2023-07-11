import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from './Button';
import './UserProfile.css'

const UserProfile = ({ currentUser }) => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    profilePicture: '',
  });

  useEffect(() => {
    // Fetch user details from the server using the user's ID
    fetch(`http://localhost:3001/users/${id}`)
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, [id]);

  useEffect(() => {
    // Set form data with user details
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
      });
    }
  }, [user]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Send updated user details to the server using the appropriate endpoint, e.g., /users/:id with a PUT request
    fetch(`http://localhost:3001/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle response, e.g., display success message or handle errors
        console.log(data);
      });
  };

  return (
    <div className="container">
      <div className="profile-picture"></div>
      <div className="profile-details">
        <h2>User Profile</h2>
        {user ? (
          <form onSubmit={handleFormSubmit}>
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Profile Picture:
              <input
                type="text"
                name="profilePicture"
                value={formData.profilePicture}
                onChange={handleInputChange}
              />
            </label>
            <Button type="submit">Save Changes</Button>
          </form>
        ) : (
          <p>Loading user profile...</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;

