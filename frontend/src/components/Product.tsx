import { Badge, Button, Col, Container, Dropdown, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useProductItem } from "../hooks/products/useProductItem";
import { formatCurrency } from "../utilities/formatCurrency";

export const Product = () => {
  const { product_id } = useParams();

  const { product, loaded } = useProductItem(product_id!);
  const { increaseCartQuantity, openCart, getItemQuantity } = useShoppingCart();

  return (
    <>
      <Container>
        {loaded && (
          <>
            <Row>
              <Col md={2}>
                <h4>Store</h4>
              </Col>
              <Col md={{ span: 4, offset: 6 }}>
                <div className="pull-right">
                  <span className="text-muted">Order Status </span>
                  <Button variant="light" onClick={openCart}>
                    <i className="fa fa-shopping-cart" />{" "}
                    {getItemQuantity(product.id)} Items
                  </Button>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={7} sm={6}></Col>
              <Col md={5} sm={6}>
                <h2>{product.name}</h2>
                <h4>
                  <strong>{formatCurrency(product.price)}</strong>
                </h4>
                <hr />
                <p>
                  "Neque porro quisquam est qui dolorem ipsum quia dolor sit
                  amet, consectetur, adipisci velit..."{" "}
                </p>
                <Badge pill bg="primary">
                  Free shipping to Europe{" "}
                </Badge>
                <Row>
                  <Col md={6} sm={6}>
                    Select Color
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Dropdown Button
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Black</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">White</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Blue </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                  <Col md={6} sm={6}>
                    Select Size
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Dropdown Button
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Small</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Medium</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Large</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col md={{ span: 7, offset: 5 }} sm={8}>
                    <Button
                      variant="warning"
                      size="lg"
                      onClick={(_) => {
                        increaseCartQuantity(product.id);
                      }}
                    >
                      Agregar
                      <i className="fa fa-chevron-right" />
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};
