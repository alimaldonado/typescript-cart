from fastapi import HTTPException
from starlette.status import HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from app.db.repositories.base_repository import BaseRepository
from app.models.product import ProductCreate, ProductInDB, ProductUpdate
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

UPDATE_PRODUCT_BY_ID_QUERY = """
    UPDATE products
    SET name    = :name,
        price   = :price,
        picture = :picture
    WHERE id = :id
    RETURNING id, name, price, picture, created_at, updated_at
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

        if not product:
            raise HTTPException(status_code=HTTP_404_NOT_FOUND,
                                detail="No product found with that id.")

        return ProductInDB(**product)

    async def update_product(
        self, *, product: ProductInDB, product_update: ProductUpdate
    ) -> ProductInDB:
        product_update_params = product.copy(
            update=product_update.dict(exclude_unset=True))

        updated_product = await self.db.fetch_one(
            query=UPDATE_PRODUCT_BY_ID_QUERY,
            values=product_update_params.dict(
                exclude={"created_at", "updated_at"})
        )

        return ProductInDB(**updated_product)
