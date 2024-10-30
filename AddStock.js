import React, { useState } from 'react';
import axios from 'axios';

const AddStock = () => {
  const [newStock, setNewStock] = useState({
    date: '',
    symbol: '',
    close: '',
    volume: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStock({ ...newStock, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://18.216.157.130:5000/stocks', newStock)
      .then(() => alert('Stock added!'))
      .catch(error => console.error('Error adding stock:', error));
  };

  return (
    <div style={{ color: 'white', backgroundColor: 'black', padding: '20px' }}>
      <h2>Add Stock</h2>
      <form onSubmit={handleSubmit}>
        <input name="date" placeholder="Date" onChange={handleChange} />
        <input name="symbol" placeholder="Symbol" onChange={handleChange} />
        <input name="close" placeholder="Close Price" onChange={handleChange} />
        <input name="volume" placeholder="Volume" onChange={handleChange} />
        <button type="submit">Add Stock</button>
      </form>
    </div>
  );
};

export default AddStock;

