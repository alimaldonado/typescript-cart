import { Col, Row } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { Product } from "../components/Product";
import { StoreItem } from "../components/StoreItem";
import { useProductsCollection } from "../hooks/products/useProductsCollection";

export const Store = () => {
  const { products, loaded } = useProductsCollection();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            {" "}
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
        }
      />
      <Route path="/products/:product_id" element={<Product />} />
    </Routes>
  );
};
