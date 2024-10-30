const handleDelete = (id) => {
  axios.delete(`http://18.216.157.130:5000/stocks/${id}`)
    .then(() => {
      setStocks(stocks.filter(stock => stock.id !== id));
      alert('Stock deleted!');
    })
    .catch(error => console.error('Error deleting stock:', error));
};

