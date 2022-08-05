from typing import List
from fastapi import APIRouter, Body, Depends, Path, File, UploadFile
from starlette.status import HTTP_201_CREATED
from app.api.dependencies.database import get_repository
from app.db.repositories.files_repository import FileRepository
from app.db.repositories.product_repository import ProductRepository
from app.models.product import ProductCreate, ProductUpdate, ProductPublic
from app.utils.slugify import slugify
from app.services import picture_service

allowed_file_extensions = [".jpg", ".jpeg", ".png", ".bmp", ".webp"]

router = APIRouter()


@router.get("/", response_model=List[ProductPublic], name="products:list-all-products")
async def get_all_products(products_repo: ProductRepository = Depends(get_repository(ProductRepository))):
    return await products_repo.get_all_products()


@router.get("/{product_id}", response_model=ProductPublic, name="products:get-product-by-id")
async def get_product_by_id(product_id: str = Path(...), products_repo: ProductRepository = Depends(get_repository(ProductRepository))):
    product = await products_repo.get_product_by_id(id=product_id)
    return product


@router.post("/", response_model=ProductPublic, name="products:create-product", status_code=HTTP_201_CREATED)
async def create_product(new_product: ProductCreate = Body(..., embed=False), products_repo: ProductRepository = Depends(get_repository(ProductRepository))):
    created_product = await products_repo.create_product(new_product=new_product)

    return created_product


@router.post("/{product_id}/upload_picture", response_model=ProductPublic, name="products:upload-product-image")
async def upload_picture(
    product_id: str = Path(...),
    picture: UploadFile = File(...),
    products_repo: ProductRepository = Depends(
        get_repository(ProductRepository)),
    files_repo: FileRepository = Depends(get_repository(FileRepository))):

    product = await products_repo.get_product_by_id(id=product_id)

    new_file_name = slugify(text=product.name)

    picture_in_db = await files_repo.create_file(new_file=picture_service.save_picture(picture=picture, alt_file_name=new_file_name))

    return await products_repo.update_product(product=product, product_update=ProductUpdate(name=product.name, price=product.price, picture=picture_in_db.id))

