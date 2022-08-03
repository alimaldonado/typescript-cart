from typing import List
from fastapi import APIRouter, Body, Depends
from starlette.status import HTTP_201_CREATED
from app.api.dependencies.database import get_repository
from app.db.repositories.product_repository import ProductRepository
from app.models.product import ProductCreate, ProductPublic


router = APIRouter()


@router.get("/", response_model=List[ProductPublic], name="products:list-all-products")
async def get_all_products(products_repo: ProductRepository = Depends(get_repository(ProductRepository))):
    return await products_repo.get_all_products()


@router.post("/", response_model=ProductPublic, name="products:create-product", status_code=HTTP_201_CREATED)
async def create_product(new_product: ProductCreate = Body(..., embed=False), products_repo: ProductRepository = Depends(get_repository(ProductRepository))):
    created_product = await products_repo.create_product(new_product=new_product)

    return created_product
