import { useState } from 'react';
import './App.css';

function App() {
  const [vat, setVat] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [grossPrice, setGrossPrice] = useState(0);

  function handlePriceChange(e) {
    let price = parseFloat(e.target.value) || 0;
    let v = (price - discount) * 0.07;
    setVat(v.toFixed(2));
    setGrossPrice((price - discount + v).toFixed(2));
  }

  function handleDiscountChange(e) {
    let discountValue = parseFloat(e.target.value) || 0;
    setDiscount(discountValue);
    let price = parseFloat(document.getElementById('priceInput').value) || 0;
    let v = (price - discountValue) * 0.07;
    setVat(v.toFixed(2));
    setGrossPrice((price - discountValue + v).toFixed(2));
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <p style={{ fontSize: '30pt' }}>
        Price:
        <input 
          id="priceInput"
          type="number"
          style={{ fontSize: '30pt', marginLeft: '10px' }}
          onChange={handlePriceChange}
        />
      </p>
      <p style={{ fontSize: '30pt' }}>
        Discount:
        <input 
          type="number"
          style={{ fontSize: '30pt', marginLeft: '10px' }}
          onChange={handleDiscountChange}
        />
      </p>
      <h1 style={{ fontSize: '35pt', color: 'green' }}>VAT = {vat}</h1>
      <h1 style={{ fontSize: '35pt', color: 'blue' }}>Gross Price = {grossPrice}</h1>
    </div>
  );
}

export default App;
