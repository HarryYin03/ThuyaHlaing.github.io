import { useState, useRef } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import productList from "./product-list.json";
import DataTable from "./DataTable";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useLocalStorage } from "react-use";
import { TotalPriceContext } from "./context";

function App() {
  const productRef = useRef();
  const quantityRef = useRef();

  const [price, setPrice] = useState(productList[0].price);
  const [selectedItems, setSelectedItems] = useLocalStorage("selected-items", []);
  const [filteredSelectedItems, setFilteredSelectedItems] = useState(selectedItems);

  const [totalPrice, setTotalPrice] = useState(0);

  const handleSelect = (e) => {
    const pid = parseInt(productRef.current.value);
    const product = productList.find(p => p.id === pid);
    setPrice(product.price);
  };

  const handleAdd = (e) => {
    const pid = parseInt(productRef.current.value);
    const product = productList.find(p => p.id === pid);
    const q = quantityRef.current.value;

    const newItem = {
      ...product,
      quantity: q
    };

    const updatedItems = [...selectedItems, newItem];
    setSelectedItems(updatedItems);
    setFilteredSelectedItems(updatedItems);
  };

  const deleteItemByIndex = (index) => {
    const updatedItems = selectedItems.filter((_, i) => i !== index);
    setSelectedItems(updatedItems);
    setFilteredSelectedItems(updatedItems);
  };

  const search = (keyword) => {
    setFilteredSelectedItems([
      ...selectedItems.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()))
    ]);
  };

  const sortAscending = () => {
    const sortedItems = [...filteredSelectedItems].sort((a, b) => a.name.localeCompare(b.name));
    setFilteredSelectedItems(sortedItems);
  };

  const sortDescending = () => {
    const sortedItems = [...filteredSelectedItems].sort((a, b) => b.name.localeCompare(a.name));
    setFilteredSelectedItems(sortedItems);
  };

  return (
    <TotalPriceContext.Provider value={{ totalPrice, setTotalPrice }}>
      <Container>
        <Row>
          <Col xs={6}>
            <Form.Label htmlFor="inputProductName">Product Name</Form.Label>
            <Form.Select
              id="inputProductName"
              ref={productRef}
              onChange={handleSelect}>
              {
                productList.map(product => (
                  <option key={product.id} value={product.id}>{product.name}</option>
                ))
              }
            </Form.Select>

            <Form.Label htmlFor="inputPrice">Price</Form.Label>
            <Form.Control type="number"
              id="inputPrice"
              readOnly
              value={price}
            />

            <Form.Label htmlFor="inputQuantity">Quantity</Form.Label>
            <Form.Control
              type="number"
              id="inputQuantity"
              aria-describedby="Quantity"
              defaultValue={1}
              ref={quantityRef}
            />

            <Button variant="success" onClick={handleAdd}>Add</Button>
          </Col>
          <Col>
            <DataTable
              data={filteredSelectedItems}
              onDelete={deleteItemByIndex}
              onSearch={search}
              sortAscending={sortAscending}
              sortDescending={sortDescending}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Total Price: ${totalPrice}</h3>
          </Col>
        </Row>
      </Container>
    </TotalPriceContext.Provider>
  );
}

export default App;
