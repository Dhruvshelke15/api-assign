import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://swapi.dev/api/people';

function UserCard({ user }) {
  const { name, hair_color, skin_color, gender, vehicles } = user;
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    async function fetchRandomImage() {
      try {
        const response = await axios.get('https://picsum.photos/200/300');
        setImageUrl(response.request.responseURL);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    }
    fetchRandomImage();
  }, []);

  let backgroundColor;
  let textColor = 'black';
  if (hair_color.toLowerCase() === 'blond') {
    backgroundColor = 'yellow';
  } else {
    backgroundColor = hair_color;
  }

  if (backgroundColor.toLowerCase() === 'black') {
    textColor = 'white';
  }

  return (
    <div className="user-card" style={{ backgroundColor, color: textColor }}>
      <img src={imageUrl} alt="user" />
      <h2>{name}</h2>
      <p>Hair Color: {hair_color}</p>
      <p>Skin Color: {skin_color}</p>
      <p>Gender: {gender}</p>
      <p>Number of Vehicles: {vehicles.length}</p>
    </div>
  );
}

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(API_URL);
        setUsers(response.data.results);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <h1>List of Characters</h1>
      <input
      className='search-box'
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <div className="user-list">
        {filteredUsers.map(user => (
          <UserCard key={user.name} user={user} />
        ))}
      </div>
    </div>
  );
}

export default App;
