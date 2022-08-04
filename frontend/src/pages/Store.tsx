import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import { useProductsCollection } from "../hooks/products/useProductsCollection";

export const Store = () => {
  const { products, loaded } = useProductsCollection();

  return (
    <>
      <h1>Store</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {loaded &&
          products.map((item) => (
            <Col key={item.id}>
              <StoreItem {...item} />
            </Col>
          ))}
      </Row>
    </>
  );
};
