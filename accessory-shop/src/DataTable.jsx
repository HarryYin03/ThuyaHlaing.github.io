import React, {useRef} from 'react';
import { Container, Table, Button } from 'react-bootstrap';

const DataTable = ({ data, onDelete, onSearch, sortAscending, sortDescending }) => {
    const sRef = useRef();
    const handleSearch = () => {
        const keyword = sRef.current.value;
        onSearch(keyword);
    };
    return (
        <Container>
            <input type="text" placeholder="Search..." ref={sRef} />
            {' '}
            <Button onClick={handleSearch} ><i className="bi bi-search"></i> Search</Button> 
            {''}
            <Button variant="outline-primary" onClick={sortAscending}><i className="bi bi-sort-alpha-up"></i></Button>
            {' '}
            <Button variant="outline-primary" onClick={sortDescending}><i className="bi bi-sort-alpha-down-alt"></i></Button>
        <Table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.quantity}</td>
                        <td>
                            <i className="bi bi-trash" onClick={() => onDelete(index)}></i>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </Container>
    );
};

export default DataTable;