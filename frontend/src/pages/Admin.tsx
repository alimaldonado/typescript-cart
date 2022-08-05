import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { FileUploader } from "../components/FileUploader";

export const AdminPage = () => {
  const handleFile = (fileUploaded: File) => {
    var reader = new FileReader();
    console.log(fileUploaded);
    console.log(reader.readAsDataURL(fileUploaded));
  };

  return (
    <div className="section">
      <Container>
        <h3>Add Product</h3>
        <Form>
          <Row>
            <Col md={5} sm={5}>
              <h6>Product Image</h6>
              <FileUploader handleFile={handleFile} />
            </Col>
            <Col md={7} sm={7}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="enter product name here"
                />
              </Form.Group>
              <Row>
                <Col md={6}>
                  {" "}
                  <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="text" placeholder="enter price" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {" "}
                  <Form.Group>
                    <Form.Label>Discount</Form.Label>
                    <Form.Control type="text" placeholder="enter discount" />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={10}
                  placeholder="enter the product description"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row
            style={{
              marginTop: "20px",
            }}
          >
            <Col md={4} sm={4}>
              <Button variant="danger">Cancel</Button>
            </Col>
            <Col md={4} sm={4}>
              <Button variant="outline-primary">Save</Button>
            </Col>
            <Col md={4} sm={4}>
              <Button variant="primary">Save & Publish</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};


