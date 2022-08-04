from app.db.repositories.base_repository import BaseRepository
from app.models.product import ProductCreate, ProductInDB
from uuid import uuid4

GET_ALL_PRODUCTS_QUERY = """
    SELECT * FROM products;
"""

CREATE_PRODUCT_QUERY = """
    INSERT INTO products (id, name, price)
    VALUES (:id, :name, :price)
    RETURNING id, name, price, created_at, updated_at
"""

GET_PRODUCT_BY_ID_QUERY = """
    SELECT * FROM PRODUCTS WHERE id = :id LIMIT 1;
"""


class ProductRepository(BaseRepository):
    async def get_all_products(self):
        products_records = await self.db.fetch_all(
            query=GET_ALL_PRODUCTS_QUERY,

        )

        return [ProductInDB(**r) for r in products_records]

    async def create_product(self, *, new_product: ProductCreate) -> ProductInDB:
        product = await self.db.fetch_one(
            query=CREATE_PRODUCT_QUERY,
            values={
                **new_product.dict(),
                "id": str(uuid4())
            }
        )

        return ProductInDB(**product)

    async def get_product_by_id(self, *, id: str) -> ProductInDB:
        product = await self.db.fetch_one(
            query=GET_PRODUCT_BY_ID_QUERY,
            values={
                "id": id
            }
        )

        return ProductInDB(**product)
