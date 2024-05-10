import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    dateOfBirth: ''
  });
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [updatePersonId, setUpdatePersonId] = useState(null);

  const handleChange = (e) => {
    setNewPerson({ ...newPerson, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:5000/api/entities/person')
      .then(response => {
        setPersons(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleCreatePerson = () => {
    axios.post('http://localhost:5000/api/entities/person', newPerson)
      .then(response => {
        console.log(response.data);
        fetchData();
        
        setNewPerson({
          name: '',
          email: '',
          mobileNumber: '',
          dateOfBirth: ''
        });
      })
      .catch(error => {
        console.error('Error creating person:', error);
      });
  };

  const handleUpdatePerson = () => {
    const updatedPersonData = { ...newPerson };
    axios.put(`http://localhost:5000/api/entities/person/${updatePersonId}`, updatedPersonData)
      .then(response => {
        console.log(response.data);
        fetchData();
        
        setNewPerson({
          name: '',
          email: '',
          mobileNumber: '',
          dateOfBirth: ''
        });
        setIsUpdateMode(false);
      })
      .catch(error => {
        console.error('Error updating person:', error);
      });
  };

  const handleEditPerson = (person) => {
    setNewPerson(person);
    setIsUpdateMode(true);
    setUpdatePersonId(person.id);
  };

  const handleDeletePerson = (id) => {
    axios.delete(`http://localhost:5000/api/entities/person/${id}`)
      .then(response => {
        console.log(response.data);
        fetchData();
      })
      .catch(error => {
        console.error('Error deleting person:', error);
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="App">
      <h1>Headless CMS</h1>
      <div className="form-container">
        <h2>{isUpdateMode ? 'Update Person' : 'Create Person Entry'}</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newPerson.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newPerson.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="mobileNumber"
          placeholder="Mobile Number"
          value={newPerson.mobileNumber}
          onChange={handleChange}
        />
        <input
          type="date"
          name="dateOfBirth"
          value={newPerson.dateOfBirth}
          onChange={handleChange}
        />
        {isUpdateMode ? (
          <button onClick={handleUpdatePerson}>Update</button>
        ) : (
          <button onClick={handleCreatePerson}>Create</button>
        )}
      </div>
      <div className="person-list">
        <h2>Person Entries</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Date of Birth</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {persons.map(person => (
              <tr key={person.id}>
                <td>{person.name}</td>
                <td>{person.email}</td>
                <td>{person.mobileNumber}</td>
                <td>{formatDate(person.dateOfBirth)}</td>
                <td>
                  <button onClick={() => handleEditPerson(person)}>Update</button>
                  <button onClick={() => handleDeletePerson(person.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
