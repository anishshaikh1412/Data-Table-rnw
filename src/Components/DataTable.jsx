import { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import products from "../data/data";
import Pagination from "react-bootstrap/Pagination";

const DataTable = () => {
  const [data, setData] = useState(products);

  const [searchName, setSearchName] = useState("");
  const [priceSort, setPriceSort] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handlePayment = (prd, idx) => {
    if (prd.paid) {
      const confirmChange = confirm("Are You Sure for changed to unpaid?");
      if (confirmChange) {
        const newData = [...data];
        newData[idx].paid = false;
        setData(newData);
      }
    } else {
      const confirmChange = confirm("Are You Sure for changed to paid?");
      if (confirmChange) {
        const newData = [...data];
        newData[idx].paid = true;
        setData(newData);
      }
    }
  };

  const categoryOrder = [
    "Electronics",
    "Fashion",
    "Home",
    "Kitchen",
    "Accessories",
    "Furniture",
    "Stationery",
    "Beauty",
    "Education",
  ];

  let filteredData = [...data];

  // search by name
  filteredData = filteredData.filter((item) =>
    item.name.toLowerCase().includes(searchName.toLowerCase()),
  );

  // search by category
  if (categorySearch !== "") {
    filteredData = filteredData.filter(
      (item) => item.category === categorySearch,
    );
  }

  // sort by price
  if (priceSort === "highToLow") {
    filteredData.sort((a, b) => b.price - a.price);
  }

  if (priceSort === "lowToHigh") {
    filteredData.sort((a, b) => a.price - b.price);
  }

  // pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="px-5">
      <h1 className="text-center my-4">Inventory Dashboard</h1>

      <Row className="mb-4">
        {/* Search by Name */}
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search item"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </Col>

        {/* Sort Cost */}
        <Col md={4}>
          <Form.Select
            value={priceSort}
            onChange={(e) => setPriceSort(e.target.value)}
          >
            <option value="">Sort Cost</option>
            <option value="highToLow">High to Low</option>
            <option value="lowToHigh">Low to High</option>
          </Form.Select>
        </Col>

        {/* Filter Department */}
        <Col md={4}>
          <Form.Select
            value={categorySearch}
            onChange={(e) => setCategorySearch(e.target.value)}
          >
            <option value="">Filter Department</option>

            {categoryOrder.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      <Table striped bordered hover className="custom-table fs-5">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((prd, idx) => {
            return (
              <tr key={prd.id}>
                <td>{prd.name}</td>
                <td>{prd.category}</td>
                <td>{prd.price}</td>
                <td>
                  <Button
                    variant="secondary"
                    onClick={() => handlePayment(prd, idx)}
                  >
                    {prd.paid ? "Active" : "Not Active"}
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          <Pagination.Prev
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          />

          {[...Array(totalPages)].map((item, index) => (
            <Pagination.Item
              key={index}
              active={currentPage === index + 1}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}

          <Pagination.Next
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          />
        </Pagination>
      </div>
    </div>
  );
};

export default DataTable;
