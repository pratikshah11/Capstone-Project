import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StockList = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    axios.get('http://18.216.157.130:5000/stocks')
      .then(response => setStocks(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div style={{ color: 'white', backgroundColor: 'black', padding: '20px' }}>
      <h2>Stock List</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Symbol</th>
            <th>Close</th>
            <th>Volume</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map(stock => (
            <tr key={stock.id}>
              <td>{stock.date}</td>
              <td>{stock.symbol}</td>
              <td>{stock.close}</td>
              <td>{stock.volume}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockList;

