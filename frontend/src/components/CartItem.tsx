import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useProductItem } from "../hooks/products/useProductItem";
import { formatCurrency } from "../utilities/formatCurrency";

type CartItemProps = { id: string; quantity: number };

export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();

  const { product: item, loaded } = useProductItem(id);

  return (
    <Stack direction="horizontal" gap={2}>
      {loaded && (
        <>
          <img
            src={item?.imgUrl || "https://source.unsplash.com/400x200/?laptop"}
            style={{
              width: "125px",
              height: "75px",
              objectFit: "cover",
            }}
          />
          <div className="me-auto">
            <div>
              {item?.name}
              {quantity > 1 && (
                <span className="text-muted" style={{ fontSize: ".65rem" }}>
                  x{quantity}
                </span>
              )}
            </div>
            <div className="text-muted" style={{ fontSize: "0.75rem" }}>
              {formatCurrency(item.price)}
            </div>
          </div>
          <div>{formatCurrency(item.price * quantity)}</div>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => removeFromCart(item.id)}
          >
            &times;
          </Button>
        </>
      )}
    </Stack>
  );
}
