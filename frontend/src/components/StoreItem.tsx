import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Product } from "../hooks/products/types";
import { formatCurrency } from "../utilities/formatCurrency";

export const StoreItem = ({ id, name, price, imgUrl }: Product) => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  const quantity = getItemQuantity(id);
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imgUrl || "https://source.unsplash.com/400x200/?laptop"}
        height="200px"
        style={{
          objectFit: "cover",
        }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between aling-items-baseline mb4">
          <Link
            className="text-dark"
            to={`/store/products/${id}`}
            style={{ textDecoration: "none" }}
          >
            <span className="fs-2">{name}</span>
            <span className="ms-2">{formatCurrency(price)}</span>
          </Link>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100" onClick={() => increaseCartQuantity(id)}>
              + Add To Cart
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{
                gap: ".5rem",
              }}
            >
              <div
                className="d-flex align-items-center justify-content-between"
                style={{
                  gap: ".5rem",
                }}
              >
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                <div>
                  <span className="fs-3">{quantity}</span>
                  in cart{" "}
                </div>
                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeFromCart(id)}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};
