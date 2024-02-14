import React, { useState, useEffect } from 'react';
import './App.css';
import fetchUsers from './services/todoapi';

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const usersData = await fetchUsers();
      setUsers(usersData);
      setFilteredUsers(usersData);
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const filtered = users.filter(
      (user) =>
        user.name.first.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.name.last.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className="app-container">
      <h1>User  List</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th>Gender</th>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Photo</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.login.uuid}>
              <td>{user.gender}</td>
              <td>{`${user.name.first} ${user.name.last}`}</td>
              <td>{`${user.location.city}, ${user.location.country}`}</td>
              <td>{user.email}</td>
              <td>{new Date(user.dob.date).toLocaleDateString()}</td>
              <td>
                <img src={user.picture.thumbnail} alt="user" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
